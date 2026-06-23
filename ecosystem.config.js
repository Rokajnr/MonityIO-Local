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
      script: ".next/standalone/server.js",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "127.0.0.1",
        PORT: "3000",
        NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
        STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
        REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
        STRAPI_REVALIDATE_SECONDS: process.env.STRAPI_REVALIDATE_SECONDS,
      },
    },
  ],
};
