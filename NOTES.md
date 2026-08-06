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

# Auth and Normal Data
Dentro do sistema o qual temos, temos que os dados de autenticacao sao separados dos outros bancos de dados, pela necessidade de padronizar elementos de seguranca, e para facilitar elementos de seguranca que sao presentes dentro dos conceitos de bancos de dados. Com isso, as credenciais de login do sistema sao separadas, e nao sao salvas conjuntamente com os dados do usuario dentro do sistema.

Alem disso, como estamos fazendo login, o proprio **supabase** faz com que trabalhemos com token para elementos de autenticacao dentro de sistemas frontend, e isso facilita a forma como temos de trabalhar, pois acelera o desenvolvimento e a implementacao de sistemas de autenticacao e autorizacao dentro do nosso app.

# Architectural Beaviour and Structure of Drag & Drop
Como vamos usar o react flow como ferramenta principal de construcao dos stickers presentes dentro do nosso sistema de mural, podemos usar o mesmo para facilitar a forma como temos de cosntruir e posicionar nossos elementos presentes dentro do sistema e do mural, tanto de forma visual quando falamos do mural, como de forma a determinar as coordenadas de posicionamento e funcionamento dentro do banco de dados,quando falamos de posicoes espaciais dentroda interface.
