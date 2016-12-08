'use strict';
global.Promise = require('bluebird');
var GitHubApi = require('github');
var jsonfile = require('jsonfile');
var fs = require('fs');
var execAsync = Promise.promisify(require('child_process').exec);
var _ = require('lodash');
/**
 * Gets the git user name
 * @returns {Promise.<String>} The username
 */
var getUsername = function() {
    return execAsync('git config user.email')
        .then((username) => {
            if (username && username.length > 0) {
                username = username.trim();
            }
            return username;
        })
        .catch(err => {
            return null;
        });
};
/**
 * Gets a connected github client
 * can fallback to process.env.GITHUB_TOKEN or ./files/testAuth.json
 * @param   {String} [username]   The github username
 * @param   {String} [password]   The github password
 * @returns {Object}              The github client
 */
var buildClient = function(username, password) {
    var github = new GitHubApi({
        // required
        version: '3.0.0',
        // optional
        debug: false,
        protocol: 'https',
        Promise: global.Promise,
        host: 'api.github.com', // should be api.github.com for GitHub
        pathPrefix: '', // for some GHEs; none for GitHub
        timeout: 5000
            //headers: {
            //    'user-agent': 'Some cool app' // GitHub is happy with a unique user agent
            //}
    });
    if (username && password) {
        github.authenticate({
            type: 'basic',
            username: username,
            password: password
        });
        return github;
    }
    if (process.env.GITHUB_TOKEN) {

        github.authenticate({
            type: 'oauth',
            token: process.env.GITHUB_TOKEN
        });
        return github;
    }

    if (fs.existsSync('./files/testAuth.json')) {
        var oauth = jsonfile.readFileSync('./files/testAuth.json');

        github.authenticate({
            type: 'oauth',
            token: oauth.token
        });
        return github;
    }

    return github;
};

/**
 * Checks the validity of the credentials
 * @param   {Object} github      The github client
 * @returns {Promise.<Object>}  The github client
 */
var checkClient = function(github) {
    return github.misc.getRateLimit({})
        .then(() => github);
};

/**
 * Gets a valid github client by checking the credentials
 * @param   {String} [username]   The github username
 * @param   {String} [password]   The github password
 * @returns {Promise.<Object>}    The github client
 */
var getClient = function(username, password) {
    var github = buildClient(username, password);
    return checkClient(github);
};

/**
 * Gets a specific repo
 * @param   {Object} github     The github client
 * @param   {Object} param      An object with the following properties: user, repo
 * @returns {Promise.<Object>}  The resulting repository
 */
var getRepo = function(github, param) {

    var user = param.user;
    var repo = param.repo;

    if (repo.includes('/')) {
        var params = param.repo.split('/');
        user = params[0];
        repo = params[1];
    }

    return github.repos.get({
        owner: user,
        repo: repo
    });

};

var extractRepoAndOwner = function(repoName) {
    let repoParts = repoName.split('/');
    let owner = _.first(repoParts);
    // remove first element of the array
    repoParts.shift();
    let repo = repoParts.join('');
    return {
        repo,
        owner
    };
};

/**
 * Gets all the repo
 * @param   {Object} github         The github client
 * @param   {Object} param          An object with the following properties: per_page, page
 * @returns {Promise.<Array>}       An array of the repos found
 */
var getAllRepos = function(github, param) {
    return github.repos.getAll({
        per_page: param.per_page,
        page: param.page
    });
};

/**
 * Gets all the branches of a repo
 * @param   {Object} github         The github client
 * @param   {String} repoName       The repo name formed as owner/repo
 * @param   {Object} previous       Only exist when the function is called internally for paging
 * @param   {Number} page           Only exist when the function is called internally for paging
 * @returns {Promise.<Array>}       An array of the branches found
 */
var getBranches = function(github, repoName, previous, page) {
    var info = extractRepoAndOwner(repoName);

    page = page || 1;
    var retval = previous || [];
    return github.repos.getBranches({
            repo: info.repo,
            owner: info.owner,
            per_page: 100,
            page: page
        })
        .then(res => {
            retval = retval.concat(res);
            if (res.meta && res.meta.link && res.length > 0) {
                return getBranches(github, repoName, retval, page + 1);

            } else {
                return retval;
            }
        });
};

var getTree = function(github, repoName, sha) {
    var info = extractRepoAndOwner(repoName);

    return github.gitdata.getTree({
            repo: info.repo,
            owner: info.owner,
            sha
        })
        .then(res => res.tree);
};
/**
 * Gets the content of the file in an object
 * @param   {Object} github     The github client
 * @param   {Object} param      An object with the following properties: user, repo, filepath
 * @returns {Promise.<Buffer>}  A stream of the file
 */
var getFileAsBuffer = function(github, param) {
    var user = param.user;
    var repo = param.repo;
    var filepath = param.filepath;
    var filename = _.last(filepath.split('/'));
    var folderpath = _.take(filepath.split('/'), filepath.split('/').length - 1).join('/');
    if (repo.includes('/')) {
        var params = param.repo.split('/');
        user = params[0];
        repo = params[1];
    }

    return github.repos.getContent({
            owner: user,
            repo: repo,
            path: folderpath
        })
        .then(response => {
            var file = _.find(response, file => {
                return file.name === filename;
            });
            var sha = file.sha;
            return github.gitdata.getBlob({
                owner: user,
                repo: repo,
                sha: sha
            });
        })
        .then((response) => {
            var b64string = response.content;
            return new Buffer(b64string, 'base64');
        })
        .catch(err => null);
};

/**
 * Gets the content of package.json
 * @param   {Object} github     The github client
 * @param   {Object} param      An object with the following properties: user, repo
 * @returns {Promise.<Object>}  package.json as an object
 */
var getPackageJson = function(github, param) {
    param.filepath = 'package.json';
    return getFileAsBuffer(github, param)
        .then(buffer => {
            var packageJson = JSON.parse(buffer.toString());
            return packageJson;
        })
        .catch(err => null);
};

/**
 * Creates a token file
 * @param  {String} username   The github username
 * @param  {String} password   The github password
 * @param  {String} tokenName  The name of the token (visible in Person access tokens on https://github.com/settings/tokens)
 * @param  {String} filename   The filename to store the resulting token
 * @returns {Promise.<Object>} The result of the api call to create the token
 */
var createTokenFile = function(username, password, tokenName, filename) {
    var github = this.buildClient(username, password);
    return Promise.fromCallback(function(callback) {
            return github.authorization.create({
                scopes: ['user', 'public_repo', 'repo', 'repo:status', 'gist'],
                note: tokenName
            }, callback);

        })
        .then(res => {
            var jsonObject = {
                token: res.token
            };
            jsonfile.writeFileSync(filename, jsonObject, {
                spaces: 2
            });
            return res;
        });
};

/**
 * Creates a release on github
 * @param   {Object} param  An object with the following properties: github, owner, repo, nextVersion, changelogContent
 * @returns {Promise}       The result of the release on github
 */
var createRelease = function(param) {
    return Promise.fromCallback(cb => {
        param.github.repos.createRelease({
            owner: param.owner,
            repo: param.repo,
            tag_name: param.nextVersion,
            name: 'v' + param.nextVersion,
            body: param.changelogContent
        }, cb);
    });
};

module.exports = {
    getUsername,
    buildClient,
    getClient,
    getRepo,
    getAllRepos,
    getBranches,
    getTree,
    getFileAsBuffer,
    getPackageJson,
    createTokenFile,
    createRelease
};