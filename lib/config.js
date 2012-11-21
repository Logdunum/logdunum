var cfg = module.exports = require('cfg').createConfig(
    {
      env: true
    , envPrefix: 'LOGDUNUM'
    , argv: true
    , argvPrefix: 'logdunum'
    })
  , path = require('path')
  , file
  , origin = process.env.PWD || path.dirname( (module.parent || module).filename)
  , conf

cfg.set('configuration file')
cfg.set('host', 'localhost')
cfg.set('port', 27017)
cfg.set('database', 'logdunum')
cfg.set('collection', 'logs')
cfg.set('failover', path.join(__dirname, '..', 'failover.log'))

if(cfg.get('configuration file'))
  try {
    file = cfg.get('configuration file')
    if(file.match("^./"))
      file= path.join(origin, file)
    conf = require(file)
  } catch (e) {
    console.warn ('Could not load configuration file', file)
    file = null;
  }
else
  try { 
    file = path.join(process.env.HOME,'.logdunum/cfg.js')
    conf = require(file)
  } catch (e) {
    try {
      file = "/etc/logdunum/cfg.js"
      conf = require(file)
    } catch(e) {
      file = null;
    }
  }
if(file)
  console.log('Using', file, 'as logdunum configuration')

if(conf)
  cfg.set(conf)

// Specific configuration per environment
cfg.env('test', function() {
  cfg.set('failover', path.join(__dirname, '..', 'failover-tests.log'))
})


cfg.set('logs', {
  db: {
    host: cfg.get('host'),
    port: cfg.get('port'),
    database: cfg.get('database'),
    options: {
      server: {
        auto_reconnect: true,
        poolSize: 4
      },
      db: {
        native_parser: true
      }
    },
    collections: {
      logs: {
        name: cfg.get('collection')
      }
    }
  },
  failover: cfg.get('failover')
})

