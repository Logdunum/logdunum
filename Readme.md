Purpose
=======

Logdunum is made in order to make logging in a cluster of several servers a breeze, using MongoDB to store everything fast. It provides both an API for logging from your code, and a cli in order to show and filter your logs.

Install
=======
```bash
npm install logdunum
```

Usage
=====
* in your code, in order to log something :
```js
var logger = require('logdunum')(module) // you should get it locally in each module to report the file

logger.info('hello, world')
logger.debug('hello','world')
logger.warn({hello: 'world', "goodbye in":5}, 'minutes')
```

* as a client :

```bash
$> logdunum -f -n 50
```

You can get help with the cli using --help :
```bash
$> logdunum --help

  Usage: logdunum [options]

  Options:

    -h, --help            output usage information
    -V, --version         output the version number
    -n, --lines [number]  Only output the last n lines
    -f, --follow          Output appended lines as their arrive
    -l, --level [level]   Filter lines by level, either as a regexp, or a comma separated list
    -m, --min [level]     Minimal level threshold, with trace < debug < log < info < warn < error < fatal
    -u, --user [user]     Output only what happened for user
    -c, --no-color        Output without colors
    -d, --rawdate         Output raw date, rather than humanized ones
    -p, --fullpath        Output full file path, rather than humanized ones

```

Configuration
=============

You can configure logdunum with everything available in ```lib/config.js``` thanks to [cfg](https://github.com/LearnBoost/cfg.js), so you can override settings thank to the process arguments using namespace 'logdunum' or by prefixing environnment variable with 'LOGDUNUM'

* examples :

```bash
$> ./myprogram --logdunum-database mylogs
$> logdunum --logdunum-collection logdunumLogs
$> LOGDUNUM_PORT=27018 logdunum -f
```

