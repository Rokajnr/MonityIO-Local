module.exports = {
  apps: [
    {
      name: "monity-server",
      cwd: "./server",
      script: "node_modules/.bin/strapi",
      args: "start",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "600M",
      env: {
        NODE_ENV: "production",
        HOST: "127.0.0.1",
        PORT: "1337",
      },
    },
    {
      name: "monity-client",
      cwd: "./client",
      script: "node_modules/.bin/next",
      args: "start",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "127.0.0.1",
        PORT: "3000",
      },
    },
  ],
};
