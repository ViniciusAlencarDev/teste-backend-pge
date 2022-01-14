# SGP - Teste PGE
# Backend

## Pré-requisitos ✔

Ter o **nodejs** ou **dokcer** instalado.
Ter um servidor **mysql** ativo com uma base de dados chamada **sgp** (configurar os dados em .env e config/config.json)

## Instação ⚙


Criar as tabelas na base de dados
```
npx sequelize db:migrate
```

Insira dados de teste no base de dados
```
npx sequelize db:seed:all
```

## Com NodeJS

Transpilar a aplicação
```
npm run build
```

Iniciar servidor
```
yarn run start
```


## Com Docker

Criar container para a aplicação
```
docker build . -t viniciusalencardev/testepgebackend
```

Iniciar servidor
```
docker run -p 3030:3030 -d viniciusalencardev/testepgebackend
```

* Obrigado 😎
