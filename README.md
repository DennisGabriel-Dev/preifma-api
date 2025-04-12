# preifma-api
Pré-requisitos:
Postgres: 15 ou superior. <br>
Criar arquivo ```.env``` na pasta root:
```ruby
DB_USER=<nome_do_usuario>
DB_PASSWORD=<senha_do_usuario>
DB_NAME=preifma
DB_HOST=localhost
PORT=3000
JWT_SECRET=<chave_secreta>
```

depois de configurar tudo isso, basta rodar:<br>
```
npm install
node --watch server.js
```
