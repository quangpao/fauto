FROM oven/bun:slim

WORKDIR /app

COPY . .

RUN bun install
RUN bunx prisma generate
ENV PS1A="🐳\[\e[33m\]\u\[\e[m\]@bun\[\e[36m\][\[\e[m\]\[\e[36m\]\w\[\e[m\]\[\e[36m\]]\[\e[m\]: "

RUN echo 'PS1=$PS1A' >> ~/.bashrc
