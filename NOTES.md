# Utilizing Supabase 
Dentro do supabase, temos que a criação de talbelas e elementos é primariamente recomendada de ser feita por meio de migrações, como as seguintes sendo feitas, com isso, temos os seguintes exemplos de comandos que podemos utilizar dentro dos sistemas para poder criar, modificar, e usar nossas migrações:

##### Criação da pasta de migrações
```bash
supabase init
```
##### Criação de uma Migração
```bash
supabase migration new <migration_name>
```


##### Execução de uma Migração
```bash
supabase link --project-ref <PROJECT_ID>
supabase db push
```

## Auth and Normal Data
Dentro do sistema o qual temos, temos que os dados de autenticacao sao separados dos outros bancos de dados, pela necessidade de padronizar elementos de seguranca, e para facilitar elementos de seguranca que sao presentes dentro dos conceitos de bancos de dados. Com isso, as credenciais de login do sistema sao separadas, e nao sao salvas conjuntamente com os dados do usuario dentro do sistema.

Alem disso, como estamos fazendo login, o proprio **supabase** faz com que trabalhemos com token para elementos de autenticacao dentro de sistemas frontend, e isso facilita a forma como temos de trabalhar, pois acelera o desenvolvimento e a implementacao de sistemas de autenticacao e autorizacao dentro do nosso app.

### Browser Side vs. Server Side
Dentro das formas de autenticação do supabase, como especificado em [supabase auth nextjs tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs). Temos que devem ser criados dois clientes, de forma que um deles se comunica com as rotas e os elementos de API, sendo assim o `ServerClient`, e temos que o outr vai se comunicar com os componentes de interface, sendo o `BrowserClient`. A partir desse momento, temos que eles são criados como especificado dentro do o `lib/supabase.ts`

> Como **server components** não podem escrever em cookies, podemos precisar de um proxy para atualizar os tokens de autorização que estão expirados.

Para fazer a atualização dos tokens podemos:

- Atualizar os tokens com `supabase.auth.getClaims`
- Atualizar dentro dos server components por meio do `request.cookies.set`, não fazendo com que os cookies tentem se atualizar várias vezes
- Usar o mesmo método que o anterior, mas pro browser atualizar os tokens antigos.

### Métodos de Autenticação
Quando vamos fazer a autenticação do usuário, diversos métodos podem ser utilizados, de forma que eles visam facilitar o entendimento e a forma como temos de entender o comportamento nosso sistema. Com isso, temos que os métodos e suas responsabilidades são:

- ***getUser:*** Pega as últimas informações do usuário da parte de autenticação.
- ***getSession:*** Pega os dados crus da sessão, de forma que todas as informações podem ser vistas
- ***getClaims:*** Lê o access_token dentro do storage das páginas, e verifica o mesmo para que a autenticação seja feita

Em resumo, vamos usar o ***getClaims*** para verificar a identidade do usuário, e o ***getUser*** quando precisamos atualizar os dados do usuário no client

# Architectural Beaviour and Structure of Drag & Drop
Como vamos usar o react flow como ferramenta principal de construcao dos stickers presentes dentro do nosso sistema de mural, podemos usar o mesmo para facilitar a forma como temos de cosntruir e posicionar nossos elementos presentes dentro do sistema e do mural, tanto de forma visual quando falamos do mural, como de forma a determinar as coordenadas de posicionamento e funcionamento dentro do banco de dados,quando falamos de posicoes espaciais dentroda interface.
