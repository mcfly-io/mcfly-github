'use strict';
var githubHelper = require('./lib/githubHelper');

module.exports = {
    getUsername: githubHelper.getUsername,
    buildClient: githubHelper.buildClient,
    getClient: githubHelper.getClient,
    getRepo: githubHelper.getRepo,
    getAllRepos: githubHelper.getAllRepos,
    getFileAsBuffer: githubHelper.getFileAsBuffer,
    getPackageJson: githubHelper.getPackageJson,
    createTokenFile: githubHelper.createTokenFile,
    createRelease: githubHelper.createRelease
};