FROM oven/bun:debian

WORKDIR /usr/local/app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY src ./src
COPY drizzle ./drizzle
COPY index.ts drizzle.config.ts tsconfig.json ./

RUN useradd -m app
USER app

EXPOSE 3000

CMD ["bun", "run", "start"]