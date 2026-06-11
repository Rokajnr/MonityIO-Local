# Stage 1: Build the application
FROM node:20-alpine AS build

# Install build dependencies for native node modules (e.g., better-sqlite3)
RUN apk add --no-cache \
    build-base \
    gcc \
    autoconf \
    automake \
    libtool \
    zlib-dev \
    libpng-dev \
    nasm \
    bash \
    vips-dev \
    git

WORKDIR /opt/

# Install dependencies first for caching
COPY package.json package-lock.json ./
RUN npm ci

WORKDIR /opt/app
COPY . .

# Build the Strapi admin panel and backend code
ENV NODE_ENV=production
RUN npm run build

# Remove development dependencies to keep the image slim
RUN npm prune --production

# Stage 2: Production runtime image
FROM node:20-alpine AS runtime

# Install system dependencies needed at runtime (like libvips for image resizing)
RUN apk add --no-cache vips-dev

WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules

WORKDIR /opt/app
COPY --from=build /opt/app ./

ENV PATH=/opt/node_modules/.bin:$PATH
ENV NODE_ENV=production

EXPOSE 1337

CMD ["npm", "run", "start"]
