const recupearToken = () =>{

	const token = localStorage.getItem('token');
	if(!token){
		return Window.location.href = "/index.html"
	}

const search = (titulo) =>{

 const cursosContainer = document.getElementById('cursos-container');
 const cursos = cursosContainer.getElementsByClassName('box');

 Array.from(cursos).forEach(curso =>{
const tituloCurso = curso.querySelector('h3').textContent.toLowerCase();
const shouldShow = tituloCurso.includes(titulo);
curso.style.display = shouldShow ? 'block' : 'none';

 })

}


	

}


