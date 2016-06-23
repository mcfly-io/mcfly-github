# mcfly-github

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][downloads-url]   
[![Build Status][travis-image]][travis-url] [![Coverage percentage][coveralls-image]][coveralls-url]    
[![Dependency Status][daviddm-image]][daviddm-url] [![Dependency Dev Status][daviddm-dev-image]][daviddm-dev-url]    

[![NPM][npm-nodei-image]][npm-nodei-url]

## Installation
```bash
npm i --save mcfly-github
```

## Functions

<dl>
<dt><a href="#getUsername">getUsername()</a> ⇒ <code>Promise</code></dt>
<dd><p>Gets the git user name</p>
</dd>
<dt><a href="#buildClient">buildClient(username, password)</a> ⇒ <code>Object</code></dt>
<dd><p>Gets a connected github client</p>
</dd>
<dt><a href="#checkClient">checkClient(github)</a> ⇒ <code>Promise</code></dt>
<dd><p>Checks the validity of the credentials</p>
</dd>
<dt><a href="#getRepo">getRepo(github, param)</a> ⇒ <code>Promise</code></dt>
<dd><p>Gets a specific repo</p>
</dd>
<dt><a href="#getAllRepos">getAllRepos(github, param)</a> ⇒ <code>Promise</code></dt>
<dd><p>Gets all the repo</p>
</dd>
<dt><a href="#getFileAsBuffer">getFileAsBuffer(github, param)</a> ⇒ <code>Promise</code></dt>
<dd><p>Gets the content of the file in an object</p>
</dd>
<dt><a href="#getPackageJson">getPackageJson(github, param)</a> ⇒ <code>Promise</code></dt>
<dd><p>Gets the content of package.json</p>
</dd>
<dt><a href="#createTokenFile">createTokenFile(username, password, tokenName, filename)</a> ⇒ <code>Promise</code></dt>
<dd><p>Creates a token file</p>
</dd>
<dt><a href="#createRelease">createRelease(param)</a> ⇒ <code>Promise</code></dt>
<dd><p>Creates a release on github</p>
</dd>
</dl>

<a name="getUsername"></a>

## getUsername() ⇒ <code>Promise</code>
Gets the git user name

**Kind**: global function
**Returns**: <code>Promise</code> - The username
<a name="buildClient"></a>

## buildClient(username, password) ⇒ <code>Object</code>
Gets a connected github client

**Kind**: global function
**Returns**: <code>Object</code> - The github client

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | The github username |
| password | <code>String</code> | The github password |

<a name="checkClient"></a>

## checkClient(github) ⇒ <code>Promise</code>
Checks the validity of the credentials

**Kind**: global function
**Returns**: <code>Promise</code> - The github client

| Param | Type | Description |
| --- | --- | --- |
| github | <code>Object</code> | The github client |

<a name="getRepo"></a>

## getRepo(github, param) ⇒ <code>Promise</code>
Gets a specific repo

**Kind**: global function
**Returns**: <code>Promise</code> - The resulting repository

| Param | Type | Description |
| --- | --- | --- |
| github | <code>Object</code> | The github client |
| param | <code>Object</code> | An object with the following properties: user, repo |

<a name="getAllRepos"></a>

## getAllRepos(github, param) ⇒ <code>Promise</code>
Gets all the repo

**Kind**: global function
**Returns**: <code>Promise</code> - An array of the repos found

| Param | Type | Description |
| --- | --- | --- |
| github | <code>Object</code> | The github client |
| param | <code>Object</code> | An object with the following properties: per_page, page |

<a name="getFileAsBuffer"></a>

## getFileAsBuffer(github, param) ⇒ <code>Promise</code>
Gets the content of the file in an object

**Kind**: global function
**Returns**: <code>Promise</code> - A stream of the file

| Param | Type | Description |
| --- | --- | --- |
| github | <code>Object</code> | The github client |
| param | <code>Object</code> | An object with the following properties: user, repo, filepath |

<a name="getPackageJson"></a>

## getPackageJson(github, param) ⇒ <code>Promise</code>
Gets the content of package.json

**Kind**: global function
**Returns**: <code>Promise</code> - package.json as an object

| Param | Type | Description |
| --- | --- | --- |
| github | <code>Object</code> | The github client |
| param | <code>Object</code> | An object with the following properties: user, repo |

<a name="createTokenFile"></a>

## createTokenFile(username, password, tokenName, filename) ⇒ <code>Promise</code>
Creates a token file

**Kind**: global function
**Returns**: <code>Promise</code> - The result of the api call to create the token

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | The github username |
| password | <code>String</code> | The github password |
| tokenName | <code>Strong</code> | The name of the token (visible in Person access tokens on https://github.com/settings/tokens) |
| filename | <code>String</code> | The filename to store the resulting token |

<a name="createRelease"></a>

## createRelease(param) ⇒ <code>Promise</code>
Creates a release on github

**Kind**: global function
**Returns**: <code>Promise</code> - The result of the release on github

| Param | Type | Description |
| --- | --- | --- |
| param | <code>Object</code> | An object with the following properties: github, owner, repo, nextVersion, changelogContent |

[npm-image]: https://badge.fury.io/js/mcfly-github.svg
[npm-url]: https://npmjs.org/package/mcfly-github
[npm-nodei-image]: https://nodei.co/npm/mcfly-github.png?downloads=false&downloadRank=false&stars=false
[npm-nodei-url]: https://nodei.co/npm/mcfly-github
[downloads-image]: http://img.shields.io/npm/dm/mcfly-github.svg
[downloads-url]: http://badge.fury.io/js/mcfly-github
[travis-image]: https://travis-ci.org/mcfly-io/mcfly-github.svg?branch=master
[travis-url]: https://travis-ci.org/mcfly-io/mcfly-github
[daviddm-image]: https://david-dm.org/mcfly-io/mcfly-github.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mcfly-io/mcfly-github
[daviddm-dev-image]: https://david-dm.org/mcfly-io/mcfly-github/dev-status.svg?theme=shields.io
[daviddm-dev-url]: https://david-dm.org/mcfly-io/mcfly-github#info=devDependencies
[coveralls-image]: https://coveralls.io/repos/mcfly-io/mcfly-github/badge.svg
[coveralls-url]: https://coveralls.io/r/mcfly-io/mcfly-github
[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/mcfly-io/mcfly-github?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge


