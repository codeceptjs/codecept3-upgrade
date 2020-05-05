# 🛫 codecept3-upgrade

Upgrade script for CodeceptJS v3 to automatically migrate tests to the new syntax:

```js
// CodeceptJS v2 - before
Scenario('title', (I, loginPage) => {});

// CodeceptJS v3 - after
Scenario('title', ({ I, loginPage }) => {});
```


## Usage

⚠ This script will change your code. Before using this script - commit all your changes and switch to a new git branch.


Migration is done via "codecept3-upgrade" npx script which can be executed without an installation.

* Upgrade all tests (*test.js) in current directory: 

```
npx codecept3-upgrade 
```

* Upgrade all tests (*test.js) in a path: 

```
npx codecept3-upgrade tests/
```

* In case other file mask than **_test.js is used, apply this script to directory with tests and provide `--all` option so all JS files will be parsed:

```
npx codecept3-upgrade tests/ --all
```

After migration was performed review all the updates, install CodeceptJS v3 and run all tests.
If updated tests work correctly - commit your changes.

---

License MIT