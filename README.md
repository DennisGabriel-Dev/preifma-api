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
<hr>
Para efetuar testes, é importante criar o arquivo 

```
.env.test
```

<br>
O conteúdo dele é o mesmo do ```.env``` citado acima, para uma melhor experiência opte por usar bancos separados.
Assim que tudo estiver devidamente configurado para rodar os testes, execute:
```
npm test
```
