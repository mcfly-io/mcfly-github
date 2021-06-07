'use strict';

var githubHelper = require('../../lib/githubHelper');
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chaiFs = require('chai-fs');
var chaiJsonSchema = require('chai-json-schema');

chai.use(sinonChai);
chai.use(chaiFs);
chai.use(chaiJsonSchema);

var githubMock = {
    repos: {
        createRelease: sinon.spy(function(param, cb) {
            cb(null, param);
        })
    },
    authorization: {
        create: sinon.spy(function(param, cb) {
            cb(null, {
                token: 'xqsfqf'
            });
        })
    }
};

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
        } else {
            it('should returns null on travis', (done) => {
                githubHelper.getUsername()
                    .then(username => {
                        expect(username).to.be.null;
                        done();
                    })
                    .catch(done);
            });
        }

    });

    describe('buildClient()', () => {
        it('with json token file should succeed', async () => {
            var github = githubHelper.buildClient();
            const auth = await github.auth();
            expect(auth.token).to.exist;
        });

        // it('with invalid token should throw an error', (done) => {
            // var github = githubHelper.buildClient('totoxxx', 'totoyyyy');
            // githubHelper.getAllRepos(github, {})
            //     .catch(err => {
            //         expect(err).to.exist;
            //         done();
            //     });
        // });
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
        it('with valid credential returns the client', async () => {
            const github = await githubHelper.getClient();
            const auth = await github.auth();
            expect(auth).to.exist;
        });
    });

    // describe('getAllRepos()', () => {
    //     it('should succeed', (done) => {
    //         var github = githubHelper.buildClient();
    //         githubHelper.getAllRepos(github, {})
    //             .then(repos => {
    //                 // check that we get a full page of 30 results (default paging for the gitub api)
    //                 expect(repos.length).to.be.equal(30);
    //                 done();
    //             })
    //             .catch(done);
    //     });

    // });

    describe('getBranches()', () => {
        it('should succeed', (done) => {
            var github = githubHelper.buildClient();
            var repoName = 'mcfly-io/ngux-loader';
            githubHelper.getBranches(github, repoName)
                .then(branches => {
                    expect(branches.length).to.be.above(0);
                    done();
                })
                .catch(done);
        });

    });

    describe('getTree()', () => {
        it('should succeed', (done) => {
            var github = githubHelper.buildClient();
            var repoName = 'mcfly-io/ngux-loader';
            githubHelper.getBranches(github, repoName)
                .then(branches => {
                    let sha = branches[0].data[0].commit.sha;
                    return githubHelper.getTree(github, repoName, sha);
                })
                .then(tree => {
                    expect(tree.length).to.be.above(0);
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
                    expect(buffer).not.to.be.null;
                    done();
                })
                .catch(done);
        });

        it('should return file by sha', () => {
            var github = githubHelper.buildClient();
            var repoName = 'mcfly-io/mcfly-github';
            //var filePath = 'templates/workbook_4.0.0.xlsx';
            return githubHelper.getFileAsBuffer(github, {
                    repo: repoName,
                    //filepath: filePath,
                    sha: '768f3634d91ee243b1860f47fbb2eed8f9b4de35'
                })
                .then(buffer => {
                    expect(JSON.parse(buffer.toString()).version).to.equal('1.0.1');
                });
        });

        it('should return file by sha if both filenames and sha are specified', () => {
            var github = githubHelper.buildClient();
            var repoName = 'mcfly-io/mcfly-github';
            var filePath = 'templates/workbook_4.0.0.xlsx';
            return githubHelper.getFileAsBuffer(github, {
                    repo: repoName,
                    filepath: filePath,
                    sha: '768f3634d91ee243b1860f47fbb2eed8f9b4de35'
                })
                .then(buffer => {
                    expect(buffer).not.to.be.null;
                    expect(JSON.parse(buffer.toString()).version).to.equal('1.0.1');
                });
        });

        it('when file exists and is root it should succeed', (done) => {
            var github = githubHelper.buildClient();
            var repoName = 'Yoobic/loopback-node-red';
            var filePath = '.gitignore';
            githubHelper.getFileAsBuffer(github, {
                    repo: repoName,
                    filepath: filePath
                })
                .then(buffer => {
                    expect(buffer).not.to.be.null;
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

    describe('createRelease()', () => {
        it('should succeed', done => {
            var param = {
                github: githubMock,
                owner: 'toto',
                repo: 'myrepo',
                nextVersion: '1.3.2',
                changelogContent: 'This is changelog'
            };
            var expectedParam = {
                owner: param.owner,
                repo: param.repo,
                tag_name: param.nextVersion,
                name: 'v' + param.nextVersion,
                body: param.changelogContent
            };
            githubHelper.createRelease(param)
                .then(res => {
                    expect(githubMock.repos.createRelease).to.have.been.calledWith(expectedParam);
                    done();
                })
                .catch(done);

        });
    });

    describe('createTokenFile()', () => {
        it('should succeed', done => {
            sinon.stub(githubHelper, 'buildClient', function() {
                return githubMock;
            });

            githubHelper.createTokenFile('toto', 'pwd', 'mytoken', './test/results/testAuth.json')
                .then(res => {
                    expect(githubMock.authorization.create).to.have.been.calledWith({
                        scopes: ['user', 'public_repo', 'repo', 'repo:status', 'gist'],
                        note: 'mytoken'
                    });
                    expect('./test/results/testAuth.json').to.be.a.file().with.json.using.schema({
                        type: 'object',
                        required: ['token'],
                        properties: {
                            token: {
                                type: 'string'
                            }
                        }
                    });
                    done();
                })
                .catch(done);

        });
    });

});