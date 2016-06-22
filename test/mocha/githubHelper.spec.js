'use strict';

var githubHelper = require('../../lib/githubHelper');
var expect = require('chai').expect;

describe('githubHelper', () => {

    describe('getUsername()', () => {
        // disable this test when running on travis
        if (process.env.CI !== 'true') {
            it('should succeed', (done) => {
                githubHelper.getUsername()
                    .then(username => {
                        expect(username).not.to.be.null;
                        done();
                    })
                    .catch(done);
            });
        }

    });

    describe('buildClient()', () => {
        it('with json token file should succeed', () => {
            var github = githubHelper.buildClient();
            expect(github.auth.token).to.exist;
        });

        it('with invalid token should throw an error', (done) => {
            var github = githubHelper.buildClient('totoxxx', 'totoyyyy');
            githubHelper.getAllRepos(github, {})
                .catch(err => {
                    expect(err).to.exist;
                    done();
                });
        });
    });

    describe('getClient()', () => {
        it('with invalid credentials should fail', (done) => {
            githubHelper.getClient('xxxxx', 'yyyyyy')
                .then(() => {
                    done(new Error('Did not throw an error'));
                })
                .catch(err => {
                    expect(err).to.exist;
                    done();
                });
        });
        it('with valid credential returns the client', (done) => {
            githubHelper.getClient()
                .then((github) => {
                    expect(github.auth.token).to.exist;
                    done();
                })
                .catch(done);
        });
    });

    describe('getAllRepos()', () => {
        it('should succeed', (done) => {
            var github = githubHelper.buildClient();
            githubHelper.getAllRepos(github, {})
                .then(repos => {
                    // check that we get a full page of 30 results (default paging for the gitub api)
                    expect(repos.length).to.be.equal(30);
                    done();
                })
                .catch(done);
        });

    });

    describe('getRepo()', () => {
        it('should succeed', (done) => {
            var github = githubHelper.buildClient();
            var repoName = 'mcfly-io/ngux-loader';
            githubHelper.getRepo(github, {
                    repo: repoName
                })
                .then(repo => {
                    expect(repo.full_name).to.equal(repoName);
                    done();
                })
                .catch(done);
        });
    });

    describe('getFileAsBuffer()', () => {
        it('when file exists it should succeed', (done) => {
            var github = githubHelper.buildClient();
            var repoName = 'Yoobic/loopback-node-red';
            var filePath = 'templates/workbook_4.0.0.xlsx';
            githubHelper.getFileAsBuffer(github, {
                    repo: repoName,
                    filepath: filePath
                })
                .then(buffer => {
                    expect(buffer).to.exist;
                    done();
                })
                .catch(done);
        });

        it('when file does not exist it should return null', (done) => {
            var github = githubHelper.buildClient();
            var repoName = 'Yoobic/loopback-node-red';
            var filePath = 'indeeeeeex.js';
            githubHelper.getFileAsBuffer(github, {
                    repo: repoName,
                    filepath: filePath
                })
                .then(result => {
                    expect(result).to.be.null;
                    done();
                })
                .catch(done);
        });
    });

    describe('getPackageJson()', () => {
        it('when package.json exist it should succeed', (done) => {
            var github = githubHelper.buildClient();
            var repoName = 'mcfly-io/ngux-loader';
            githubHelper.getPackageJson(github, {
                    repo: repoName
                })
                .then(packageJson => {
                    expect(packageJson).to.be.an('object');
                    expect(packageJson.name).to.equal('ngux-loader');
                    done();
                })
                .catch(done);
        });

        it('when package.json does not exist it should return null', (done) => {
            var github = githubHelper.buildClient();
            var repoName = 'mcfly-io/wiki';
            githubHelper.getPackageJson(github, {
                    repo: repoName
                })
                .then(packageJson => {
                    expect(packageJson).to.be.null;
                    done();
                })
                .catch(done);
        });
    });

});
