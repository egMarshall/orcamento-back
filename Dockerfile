# Use a imagem base oficial do Node.js (última versão)
FROM node:latest AS build

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie o package.json e o yarn.lock
COPY package.json yarn.lock ./

# Instale as dependências do aplicativo
RUN yarn install --frozen-lockfile

# Copie o restante do código do aplicativo
COPY . .

# Defina a variável de ambiente DATABASE_URL e JWT_SECRET
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}

# Gere o Prisma Client
RUN npx prisma generate

# Ajuste as permissões dos arquivos e diretórios
RUN chown -R node:node /usr/src/app

# Execute o script de build
USER node
RUN yarn run build

################################################################################
# Crie uma nova etapa para rodar o aplicativo com dependências mínimas de runtime
# onde os arquivos necessários são copiados da etapa de build.
FROM node:latest

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie os arquivos necessários da etapa de build
COPY --from=build /usr/src/app .

# Ajuste as permissões dos arquivos e diretórios
RUN chown -R node:node /usr/src/app

# Execute o aplicativo como um usuário não-root
USER node

# Exponha a porta que o aplicativo irá rodar
EXPOSE 3001

CMD ["sh", "-c", "npx prisma migrate deploy && yarn start"]
