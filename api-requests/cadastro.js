
const formulario = document.querySelector("form");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("password");
function cadastrarUsuario() {
 

	fetch("http://localhost:8080/users/cadastro", {
	  headers: {
		"Content-Type": "application/json",
		'Accept': "application/json",
	   
  
	  },
	  method: "POST",
	  body: JSON.stringify({
		nome: nome.value,
		email: email.value,
		senha: senha.value,
	  }),
	})
	  .then(function (response) {
		if (response.status === 422) {
		  mostrarMensagem("Usuário existe, faça login");
		  limparCampos();
		} else if (response.status === 201) {
		  window.location.href = "/login.html";
		  limparCampos();
		} else {
		  console.error("Erro ao cadastrar usuário:", response.status);
		  limparCampos();
  
		}
	  })
	  .catch(function (error) {
		console.error("Erro ao se cadastrar:", error);
		console.log(window.location.origin);
  
	  });
  }
  
  function limparCampos() {
	nome.value = "";
	email.value = "";
	senha.value = "";
  }
  
  formulario.addEventListener("submit", function (event) {
	event.preventDefault();
	cadastrarUsuario();
  });
  
  
  