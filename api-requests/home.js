
  // const sair = () => {
  //   // Remover o token do localStorage
  //   localStorage.removeItem('token');
  
  //   // Redirecionar para a página de login
  //   window.location.href = "/index.html";
  // };
  



const recuperarToken = () => {
  // Recuperar o token do localStorage
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = "/index.html"; // Redirecionar para a página de login se o token não estiver presente
  }
  verificarToken(token);
};

const verificarToken = (token) => {
  fetch("http://localhost:8080/users/verificarToken", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ token }), // Envia o token no corpo da requisição
  })
  .then(response => {
    if (response.status === 200) {
     
      mostrarConteudoPrivado(); // Função para mostrar conteúdo privado
    } else if (response.status === 403) {
      console.log(response);
      window.location.href = "/index.html"; // Redireciona para a página de login
    }
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  })
  .finally(() => {
    // Agendar a próxima execução após 2 horas
    setTimeout(verificarToken, 7200000);
});
};

const mostrarConteudoPrivado = () => {
  // Mostrar elementos do perfil
  document.querySelector('.profile').style.display = 'block';

  // Mostrar elementos de cursos
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    box.style.display = 'block';
  });
};

// Chama a função recuperarToken
recuperarToken();

// const botaoSair = document.querySelector('.option-btn');
// botaoSair.addEventListener('click', sair);
