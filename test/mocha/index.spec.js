'use strict';

var indexHelper = require('../../index');
var expect = require('chai').expect;

describe('index', () => {

    it('should expose getUsername()', () => {
        expect(indexHelper.getUsername).to.be.a('function');
    });

    it('should expose buildClient()', () => {
        expect(indexHelper.buildClient).to.be.a('function');
    });

    it('should expose getClient()', () => {
        expect(indexHelper.getClient).to.be.a('function');
    });

    it('should expose getRepo()', () => {
        expect(indexHelper.getRepo).to.be.a('function');
    });

    it('should expose getAllRepos()', () => {
        expect(indexHelper.getAllRepos).to.be.a('function');
    });

    it('should expose getFileAsBuffer()', () => {
        expect(indexHelper.getFileAsBuffer).to.be.a('function');
    });

    it('should expose getPackageJson()', () => {
        expect(indexHelper.getPackageJson).to.be.a('function');
    });

    it('should expose createTokenFile()', () => {
        expect(indexHelper.createTokenFile).to.be.a('function');
    });

    it('should expose createRelease()', () => {
        expect(indexHelper.createRelease).to.be.a('function');
    });

    it('should expose getBranches()', () => {
        expect(indexHelper.getBranches).to.be.a('function');
    });

    it('should expose getTree()', () => {
        expect(indexHelper.getTree).to.be.a('function');
    });
});