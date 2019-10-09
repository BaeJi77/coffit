module.exports = {
  apps : [{
    name: 'API',
    script: './bin/www',
    PORT: 3000,
    instances: 'max',
    exec_mode : "cluster",
    watch: false,
    env: {
      NODE_ENV: 'development'
    },
    env_test: {
      NODE_ENV: 'test'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
