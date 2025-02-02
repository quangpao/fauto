FROM imbios/bun-node:1.2.2-20-slim as builder
WORKDIR /app
COPY package.json bun.lockb tsconfig.json ./
RUN bun install
COPY . .
RUN bunx prisma generate
RUN rm -rf node_modules
RUN bun install --production 
RUN bun pm cache rm 


FROM oven/bun:1.1.12-slim
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .
ENV PS1A="🐳\[\e[33m\]\u\[\e[m\]@bun\[\e[36m\][\[\e[m\]\[\e[36m\]\w\[\e[m\]\[\e[36m\]]\[\e[m\]: "

RUN echo 'PS1=$PS1A' >> ~/.bashrc
