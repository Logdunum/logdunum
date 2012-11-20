var cfg = module.exports = require('cfg').createConfig({envPrefix:'logdunum'})
  , path = require('path')

cfg.set('host', 'localhost')
cfg.set('port', 27017)
cfg.set('database', 'logdunum')
cfg.set('collection', 'logs')
cfg.set('failover', path.join(__dirname, '..', 'failover.log'))

// Specific configuration per environment
cfg.env('test', function() {
  cfg.set('failover', path.join(__dirname, '..', 'failover-tests.log'));
});


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

