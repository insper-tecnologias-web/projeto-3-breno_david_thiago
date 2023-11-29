```[tasklist]
### ToDo
Sprit1:
  - [x] backend funcionando
  - [x] frontend funcionando
  - [x] implementar user no back
  - [x] criar pagina de login
  - [x] criar pagina de signup
Sprint2:
  - [x] criar timeline
  - [x] criar funcionalidades de fazer posts
  - [x] criar tela de perfil
  - [x] criar comentarios
Sprint3:
  - [x] adicionar posts e comentários ao perfil, além das funcionalidades
  - [x] adicionar funcionalidade de deletar posts/comentários feitos a partir da página de perfil
  - [x] últimos ajustes estilização e funcionalidades
  - [x] Deployar
-
```
<h1 align= "center">Diagrama do projeto:</h1>
<div  align= "center"><img width="452" alt="image" src="https://github.com/insper-tecnologias-web/projeto-3-breno_david_thiago/assets/69681254/290fdd03-bf22-4b28-a4ec-8f90611a21cf"></div>



<h1 align="center"> Crypto Oracle </h1>
<h2>Aplicação que permite a visualização de dados do mercado de criptomoedas em tempo real, que permite o favoritamento das moedas, além da participação em uma comunidade voltada para discussão do mercado.</h2>
<h3>Tecnologias utilizadas:</h3>
<p>-React + Vite</p>
  </p>-Tailwind</p>
 </p> -Django</p>
  </p>-PostgreSQL</p>
  </p>-Vercel</p>
  </p>-Axios</p>
  </p>-Render</p>
   </p>-Api externa utilizada: Coinraking, https://rapidapi.com/Coinranking/api/coinranking1/ </p>
   
<h2>Funcionalidades implementadas:</h2>
  <p>Autenticação de usuário, páginas de login/cadastro</p>                                
  <p>Visualização de dados do mercado de criptomoedas em tempo real, além dos dados das 50 maiores moedas em Market Cap, a partir de requisicão para api externa </p>
  <p>Ao clicar no nome, símbolo, ou ícone de uma moeda específica, a aplicação faz uma requisição diferente para a API externa, utilizando o parâmetro passado na rota do React, que consiste na uuid, ou chave única de cada moeda, devolvendo assim diversas informações específicas da moeda selecionada, em uma página específica dessa moeda/p>
  <p>Favoritamento de moedas em uma watchlist ligada ao usuário a partir de uma Rest API</p>
  <p>Página que mostra watchlist pertencente ao usuário</p>
  <p>Criação de uma página de Comunidade, onde o usuário possui acesso a uma Timeline com posts de todos os usuários, além de poder fazer seu próprio post ou comentar nos posts de outros usuários</p>  
  <p>Ao selecionar um post da Timeline, a página mostra o post selecionado e todos os comentários pertencentes ao post, além de permitir a adição de novos comentários</p>    
  <p>`Página de perfil que mostra todos os dados do seu usuário, além de todos os posts feitos por ele e também comentários em outros posts, ao clicar em um post, abre a página do post especifíco, mostrando todos os comentários e podendo fazer novos, ao clicar em um comentário, abre o post em que ele foi feito, permitindo visuzalizar outros comentários e fazer novos</p>  
  <p>Funcionalidade de deletar posts e comentários a partir da página de perfil</p> 
  

<h3>
  Deploys:
</h3>
<p>Back-end: https://cryptooracle-projeto-3.onrender.com</p>
<p>Front-end: https://projeto-3-breno-david-thiago.vercel.app</p>
