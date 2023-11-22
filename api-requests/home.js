


const recuperarToken = () => {
  // Recuperar o token do localStorage
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = "/index.html"; 
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
     
      // mostrarConteudoPrivado(); // Função para mostrar conteúdo privado

      //colocar uma mensagem seja bem vindo para os estudantes
    } else if (response.status === 403) {
      console.log(response);
      window.location.href = "/index.html"; 
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

// const mostrarConteudoPrivado = () => {
//   // Mostrar elementos do perfil
//   document.querySelector('.profile').style.display = 'block';

//   // Mostrar elementos de cursos
//   const boxes = document.querySelectorAll('.box');
//   boxes.forEach(box => {
//     box.style.display = 'block';
//   });
// };

// Chama a função recuperarToken
recuperarToken();


