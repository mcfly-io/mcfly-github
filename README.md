# mcfly-github

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][downloads-url]   
[![Build Status][travis-image]][travis-url] [![Coverage percentage][coveralls-image]][coveralls-url]    
[![Dependency Status][daviddm-image]][daviddm-url] [![Dependency Dev Status][daviddm-dev-image]][daviddm-dev-url]    

[![NPM][npm-nodei-image]][npm-nodei-url]

## Installation
```bash
npm i --save mcfly-github
```

## How to create a github token file
Execute the following
```js
githubHelper.createTokenFile('<your_github_login>', 
  '<your_github_password>', 
  'github-repos', 
  './files/testAuth.json'); 
```
then use `getClient()` without any parameters

## Functions

<dl>
<dt><a href="#getUsername">getUsername()</a> ⇒ <code>Promise.&lt;String&gt;</code></dt>
<dd><p>Gets the git user name</p>
</dd>
<dt><a href="#buildClient">buildClient([username], [password])</a> ⇒ <code>Object</code></dt>
<dd><p>Gets a connected github client
can fallback to process.env.GITHUB_TOKEN or ./files/testAuth.json</p>
</dd>
<dt><a href="#checkClient">checkClient(github)</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Checks the validity of the credentials</p>
</dd>
<dt><a href="#getClient">getClient(username, password)</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Gets a valid github client by checking the credentials</p>
</dd>
<dt><a href="#getRepo">getRepo(github, param)</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Gets a specific repo</p>
</dd>
<dt><a href="#getAllRepos">getAllRepos(github, param)</a> ⇒ <code>Promise.&lt;Array&gt;</code></dt>
<dd><p>Gets all the repo</p>
</dd>
<dt><a href="#getFileAsBuffer">getFileAsBuffer(github, param)</a> ⇒ <code>Promise.&lt;Buffer&gt;</code></dt>
<dd><p>Gets the content of the file in an object</p>
</dd>
<dt><a href="#getPackageJson">getPackageJson(github, param)</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Gets the content of package.json</p>
</dd>
<dt><a href="#createTokenFile">createTokenFile(username, password, tokenName, filename)</a> ⇒ <code>Promise.&lt;Object&gt;</code></dt>
<dd><p>Creates a token file</p>
</dd>
<dt><a href="#createRelease">createRelease(param)</a> ⇒ <code>Promise</code></dt>
<dd><p>Creates a release on github</p>
</dd>
</dl>

<a name="getUsername"></a>

## getUsername() ⇒ <code>Promise.&lt;String&gt;</code>
Gets the git user name

**Kind**: global function
**Returns**: <code>Promise.&lt;String&gt;</code> - The username
<a name="buildClient"></a>

## buildClient([username], [password]) ⇒ <code>Object</code>
Gets a connected github client
can fallback to process.env.GITHUB_TOKEN or ./files/testAuth.json

**Kind**: global function
**Returns**: <code>Object</code> - The github client

| Param | Type | Description |
| --- | --- | --- |
| [username] | <code>String</code> | The github username |
| [password] | <code>String</code> | The github password |

<a name="checkClient"></a>

## checkClient(github) ⇒ <code>Promise.&lt;Object&gt;</code>
Checks the validity of the credentials

**Kind**: global function
**Returns**: <code>Promise.&lt;Object&gt;</code> - The github client

| Param | Type | Description |
| --- | --- | --- |
| github | <code>Object</code> | The github client |

<a name="getClient"></a>

## getClient(username, password) ⇒ <code>Promise.&lt;Object&gt;</code>
Gets a valid github client by checking the credentials

**Kind**: global function
**Returns**: <code>Promise.&lt;Object&gt;</code> - The github client

| Param | Type | Description |
| --- | --- | --- |
| username | <code>String</code> | The github username |
| password | <code>String</code> | The github password |

<a name="getRepo"></a>

## getRepo(github, param) ⇒ <code>Promise.&lt;Object&gt;</code>
Gets a specific repo

**Kind**: global function
**Returns**: <code>Promise.&lt;Object&gt;</code> - The resulting repository

| Param | Type | Description |
| --- | --- | --- |
| github | <code>Object</code> | The github client |
| param | <code>Object</code> | An object with the following properties: user, repo |

<a name="getAllRepos"></a>

## getAllRepos(github, param) ⇒ <code>Promise.&lt;Array&gt;</code>
Gets all the repo

**Kind**: global function
**Returns**: <code>Promise.&lt;Array&gt;</code> - An array of the repos found

| Param | Type | Description |
| --- | --- | --- |
| github | <code>Object</code> | The github client |
| param | <code>Object</code> | An object with the following properties: per_page, page |

<a name="getFileAsBuffer"></a>

## getFileAsBuffer(github, param) ⇒ <code>Promise.&lt;Buffer&gt;</code>
Gets the content of the file in an object

**Kind**: global function
**Returns**: <code>Promise.&lt;Buffer&gt;</code> - A stream of the file

| Param | Type | Description |
| --- | --- | --- |
| github | <code>Object</code> | The github client |
| param | <code>Object</code> | An object with the following properties: user, repo, filepath |

<a name="getPackageJson"></a>

## getPackageJson(github, param) ⇒ <code>Promise.&lt;Object&gt;</code>
Gets the content of package.json

**Kind**: global function
**Returns**: <code>Promise.&lt;Object&gt;</code> - package.json as an object

| Param | Type | Description |
| --- | --- | --- |
| github | <code>Object</code> | The github client |
| param | <code>Object</code> | An object with the following properties: user, repo |

<a name="createTokenFile"></a>

## createTokenFile(username, password, tokenName, filename) ⇒ <code>Promise.&lt;Object&gt;</code>
Creates a token file

**Kind**: global function
**Returns**: <code>Promise.&lt;Object&gt;</code> - The result of the api call to create the token

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


