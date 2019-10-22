# Meetapp

## Backend

---

`$ git clone https://TheNeoCarvalho/meetapp-backend.git`

### Instalação das Dependências

---

`$ yarn install`

---

### Criando os containers

1. Postgres
   `$ docker run --name database -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=meetapp -p 5432:5432 -d postgres`

2. MongoDB
   `$ docker run --name mongo -p 27017:27017 -d -t mongo`

3. Redis
   `$ docker run --name redis -p 6379:6379 -d -t redis:alpine`

### Executando as Migrations

`$ yarn migrate`

---

### Executando a API

`$ yarn dev`

`$ yarn queue`

## Frontend

---

`$ git clone https://TheNeoCarvalho/meetapp-frontend.git`

### Instalação das Dependências

---

`$ yarn install`

### Iniando o Frontend

`$ yarn start`

## Mobile

---

`$ git clone https://TheNeoCarvalho/meetapp-mobile.git`

### Instalação das Dependências

---

`$ yarn install`

### Iniando o Mobile

`$ yarn react-native run-android`

ou

`$ yarn react-native run-ios`
