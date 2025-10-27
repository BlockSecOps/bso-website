module.exports = {
  apps: [{
    name: 'bso-app',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3001',
    cwd: '/var/www/bso',
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    max_memory_restart: '500M',
    env_production: {
      NODE_ENV: 'production',

      // Payload CMS Configuration
      PAYLOAD_SECRET: 'csXEcfoBWxZbH8HhrXVdxSO1ALtyIg9zSsWXOHrN6FA=',
      DATABASE_URI: 'mongodb://localhost:27017/blocksecops',
      NEXT_PUBLIC_SERVER_URL: 'https://blocksecops.com',

      // Cloudflare Turnstile CAPTCHA
      // REPLACE THESE WITH YOUR REAL KEYS FROM CLOUDFLARE
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: '0x4AAAAAAB8FmCmHbTzba5im',
      TURNSTILE_SECRET_KEY: '0x4AAAAAAB8FmPt9OoJTHCOBO7rPqdMjgvI',
    },
  }]
}
