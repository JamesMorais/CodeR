const formulario = document.querySelector("form");
const email = document.getElementById('email');
const senha = document.getElementById('password');


function autenticarUsuario(){
     //passar a url do endpoint
	fetch("http://localhost:8080/users/login", {
		//passar o cabeçalho e informar o tipo de dado
		//que esta  sendo passado
		headers: {'Content-Type': 'application/json',
        Accept: 'application/json'	 
	},
	
	method: "POST",

     //dados que irao ser passados pelo usuario
	body: JSON.stringify({
		email: email.value,
		senha: senha.value,
	  }),
})     //parametro para receber a promisse
.then(function (response) {
	if (response.status === 401) {
	  console.log("Email ou senha inválidos")
	} else if (response.status === 200) {
	  response.json().then(function (data) {
		var token = data.token;
		console.log("Token recebido:", token);
		// Armazenado token gerado pro usuario no localStorage
		localStorage.setItem("token", token);

		window.location.href = "/index.html";
	  });
	} else {
	  console.error("Erro ao tentar fazer login:", response.status);
	  // colocar outros tratamnetos com mensagens
	}
  })
}

  
formulario.addEventListener("submit", function(event) {
	event.preventDefault();
	autenticarUsuario();
   });