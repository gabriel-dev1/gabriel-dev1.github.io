const postagens = [
  { 
    id: 1, 
    titulo: "Aprenda HTML", 
    data: "2026-05-01", 
    resumo: "Introdução básica...", 
    conteudo: "O HTML (HyperText Markup Language) é a espinha dorsal de qualquer site na internet. Ele não é uma linguagem de programação, mas sim uma linguagem de marcação que define a estrutura do seu conteúdo. Ao aprender HTML, o foco deve ser o uso de tags semânticas como <header>, <main>, <article> e <footer>. Essas tags ajudam os motores de busca (como o Google) a entender o que é mais importante na sua página, além de melhorar drasticamente a acessibilidade para leitores de tela usados por pessoas com deficiência visual." 
  },
  { 
    id: 2, 
    titulo: "Dominando o CSS", 
    data: "2026-05-10", 
    resumo: "Dicas de layout...", 
    conteudo: "Criar layouts bonitos e responsivos mudou completamente com a chegada do CSS Grid e do Flexbox. O Flexbox é perfeito para alinhar elementos em uma única dimensão (linhas ou colunas), como menus de navegação e barras de ferramentas. Já o CSS Grid brilha na criação de layouts bidimensionais complexos, como grades de postagens ou portfólios. Combinando essas duas ferramentas com media queries, você consegue garantir que o seu site seja exibido perfeitamente tanto em celulares pequenos quanto em monitores ultra-wide." 
  },
  { 
    id: 3, 
    titulo: "JavaScript Moderno", 
    data: "2026-05-15", 
    resumo: "Entendendo o ES6+...", 
    conteudo: "O EcmaScript 6 (ES6) revolucionou o JavaScript trazendo recursos que tornaram o código muito mais limpo e legível. Entre as principais mudanças estão as Arrow Functions, que simplificam a escrita de funções, e as Promises, que facilitam o tratamento de operações assíncronas como requisições de APIs. Além disso, os métodos modernos de array como .map(), .filter() e .reduce() permitem manipular listas de dados complexas de forma declarativa, eliminando a necessidade de laços de repetição 'for' tradicionais e repetitivos." 
  }
];

const form = document.getElementById('formContato');

if (form) {

  form.addEventListener('submit', function(event) {
    event.preventDefault(); 
  
    const nome = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('message').value.trim();
    const erroTexto = document.getElementById('mensagemErro');
  
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (nome === '' || email === '' || mensagem === '') {
      erroTexto.textContent = 'Por favor, preencha todos os campos.';
      erroTexto.style.display = 'block';
      return;
    }
  
    if (!regexEmail.test(email)) {
      erroTexto.textContent = 'Por favor, digite um e-mail válido.';
      erroTexto.style.display = 'block';
      return;
    }
  
    erroTexto.style.display = 'none';
    alert('Formulário enviado com sucesso!');
  });
}

const fragment = document.getElementById("fragment_nav");

fragment.innerHTML = `<nav class="flex" id="fragment_nav2">
    <div>
    <a href="./index.html">Início</a>
    <a href="./curriculum.html">Currículo</a>
    <a href="./receitas.html">Receitas</a>
    <a href="./contact.html">Contato</a>
    <a href="./about.html">Sobre</a>
    </div>
    <div class="controles-acessibilidade">
      <button id="btn-diminuir" aria-label="Diminuir tamanho da fonte">A-</button>
      <button id="btn-normal" aria-label="Tamanho de fonte normal">A</button>
      <button id="btn-aumentar" aria-label="Aumentar tamanho da fonte">A+</button>
    </div>
    <div>
      <button class="buttons" id="btn-tema" aria-label="Alternar para modo noturno">
        Modo Diurno
      </button>
    </div>
</nav>`;

const botaoTema = document.getElementById('btn-tema');
const htmlElement = document.documentElement;

// 1. Verifica se o usuário já tem uma preferência salva
const temaSalvo = localStorage.getItem('tema');

if (temaSalvo) {
  htmlElement.setAttribute('data-theme', temaSalvo);
  atualizarBotao(temaSalvo);
}

// 2. Escuta o clique no botão para alternar o tema
botaoTema.addEventListener('click', () => {
  const temaAtual = htmlElement.getAttribute('data-theme');
  const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
  
  // Aplica o novo tema no HTML
  htmlElement.setAttribute('data-theme', novoTema);
  
  // Salva a escolha no localStorage
  localStorage.setItem('tema', novoTema);
  
  // Atualiza o texto e a acessibilidade do botão
  atualizarBotao(novoTema);
});

// Funçao auxiliar para mudar o texto e o aria-label do botão
function atualizarBotao(tema) {
  if (tema === 'dark') {
    botaoTema.innerHTML = 'Modo Claro';
    botaoTema.setAttribute('aria-label', 'Alternar para modo claro');
  } else {
    botaoTema.innerHTML = 'Modo Noturno';
    botaoTema.setAttribute('aria-label', 'Alternar para modo noturno');
  }
}

let tamanhoAtual = 100;
const passo = 10; 
const tamanhoMinimo = 80;
const tamanhoMaximo = 150;

document.getElementById('btn-aumentar').addEventListener('click', () => {
  if (tamanhoAtual < tamanhoMaximo) {
    tamanhoAtual += passo;
    htmlElement.style.fontSize = `${tamanhoAtual}%`;
  }
});

document.getElementById('btn-diminuir').addEventListener('click', () => {
  if (tamanhoAtual > tamanhoMinimo) {
    tamanhoAtual -= passo;
    htmlElement.style.fontSize = `${tamanhoAtual}%`;
  }
});

document.getElementById('btn-normal').addEventListener('click', () => {
  tamanhoAtual = 100;
  htmlElement.style.fontSize = `${tamanhoAtual}%`;
});

function abrirModal(idPost) {
  const post = postagens.find(p => p.id === idPost);
  
  if (post) {
    document.getElementById("modalTitulo").innerText = post.titulo;
    document.getElementById("modalConteudo").innerText = post.conteudo; 
    
    document.getElementById("meuModal").style.display = "block";
  }
}

function fecharModal() {
  document.getElementById('meuModal').style.display = 'none';
}

window.onclick = function(event) {
  var modal = document.getElementById('meuModal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

function exibirPostagens() {
  const container = document.getElementById("posts");
  
  const postsOrdenados = postagens.sort((a, b) => new Date(b.data) - new Date(a.data));
  
  const postagensHTML = postsOrdenados.map(post => {
  const dataFormatada = new Date(post.data).toLocaleDateString('pt-BR');
    
    return `
      <article onclick="abrirModal(${post.id})" class="art post">
        <h2 class="h2">${post.titulo}</h2>
        <span>Publicado em: ${dataFormatada}</span>
        <p>${post.resumo}</p>
        <hr>
      </article>
    `;
  }).join(""); 

  container.innerHTML = postagensHTML;
}

document.addEventListener("DOMContentLoaded", exibirPostagens);
