---------- 1.ESTRUTURA DA APLICAÇÃO ----------

1. Comando para iniciar o projeto, instalando o package.json
npm init -y

2. Passo 1 - Comando para instalar o typescript com dependência de desenvolvimento
npm i -D typescript

3. Passo 2 - Comando para instalar um arquivo de configuração do typescript
npx tsc --init

4. Passo 3 - Agora, acessar o arquivo tsconfig.json e alterar o valor da chave "target" de es2016 para es2020

5. Passo 4 - Agora executar o comando de conversão TS para o node entender
npx tsc src/index.ts

6. Passo 5 - ao gerar o index.js, pode abrir e ver como ficou, depois, clique nele e delete o arquivo index.js

7. Passo 6 - Altere o nome do arquivo index.ts para server.ts

8. Comando para instalar o FastiFy
npm i fastfy

9. Comando para instalar tipagem typescript
npm install -D @types/node

10. Apagar todo o conteúdo do arqruivo server.ts
- digitar o conteúdo para finalizar o arquivo

11. Comando para gerar o arquivo que o node entende
npx tsc src/server.ts

12. Comando para executar o arquivo
node src/server.js

13. Comando para executar o arquivo ts diretamente
npm install tsx - D
npx tsx src/server.ts

OBS.: A diferença entre "server.js" e "server.ts" é que para executar em produção, o server.js é muito mais rápido
Mas para testes de desenvolvimento é muito mais prático, gerar o server.js

14. Para automatizar, altere o arquivo package.json em "scripts"
"dev": "npx tsx watch src/server.ts"

15. Comando para instalação do ESLINT com dependência de Desenvolvimento (este ou abaixo)
npm i eslint -D

16. Comando para instalação do ESLINT com dependência de Desenvolvimento da RoketSeat (este foi o instalado)
npm i eslint @rocketseat/eslint-config -D

17. Instalar extensao no VS Code: dotenv

18. Comando para instalação do dotenv na linha do terminal
npm i dotenv

19. Instalando a biblioteca zod
npm i zod


---------- 2.BANCO DE DADOS ----------


---------- 3.IMPLEMENTANDO AS ROTAS ----------
1. Comando de instalação de Cookie
npm i @fastify/cookie


---------- 4.TESTES AUTOMATIZADOS ----------
1. Instalação do vitest => Site: vitest.dev
comando: npm i vitest -D

2. Comando para executar o teste
npx vitest

3. Para executar o teste com o comando "npm test", adicione a seguinte seção ao seu package.json:
{
  "scripts": {
    "test": "vitest"
  }
}

4. Comando de instalação de Super test
npm i supertest -D
npm i -D @types/supertest


---------- 5.PREPARANDO APP PARA DEPLOY ----------
OBS.: os passos 1 e 2 não vão ser usados, pois usou outros recursos

1. Configuração do arquivo tsconfig.json para deploy
/* Modules */
//"rootDir": "./src", 

/* Emit */
//"outDir": "./build",

2. Executar o comando
npx tsc
-----------------------

3. Instalar recurso "tsup" para deploy. que é criar a aplicação Java Script pq é mais rápida que a TS TypeScript Site: tsup.egoist.dev
npm i tsup -D

4. configurar o arquivo package.json
"scripts":
{
    //"build": "tsup src"                 //desta forma vai crirar a pasta "dist"
    "build": "tsup src --out-dir build" //desta forma vai crirar a pasta "build"
}

5. Executar o comando no terminal
npm run build

6. Comando no terminal para Testar a aplicação em js
node build/server.js

7. Criar arquivo .eslintignore na raiz da aplicação para desconsiderar os erros de eslint dos seguintes arquivos
node_modules
build

8. git hub
git init
git add .
git commit -m "Initial commit"
gh repo create
.....
gh repo view -w

----
quando fizer alterações e quiser subir a aplicação, digite
git add .
git commit -m "fix: ajuste na rota hello"
git push 



9. Plataformas para rodar a aplicação.
9.1: https://render.com/ (recomendado e usado nesta aula)
9.2: https://fly.io/
9.3: https://railway.app/

---------- 5.CRIANDO A CONTA NA PLATAFORMA RENDER ----------
1. Cadastrar a CONTA
2. No Painel, criar um banco PostgreSQL (O banco será suspenso em 90 dias)
-Name: ignite-nodejs-02-db
-Region: Ohio
-Version: 15
-Instance: Free U$0,00 /mês
-Clicar no botão Criar Banco de Dados

3.Voltar para a aplicação e instalar o driver do PostgreSQL com o comando
npm i pg

4. Abrir o arquivo package.json
alterar o sqlite3 para dependencia de desenvolvimento