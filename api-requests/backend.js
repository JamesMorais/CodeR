const recuperarToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = "/index.html";
        return;
    }

    const realizarPesquisa = (titulo) => {
        const cursosContainer = document.getElementById('cursos-container');
        const cursos = cursosContainer.getElementsByClassName('box');

        Array.from(cursos).forEach(curso => {//intera ocada elemento cursos e pega
            const tituloCurso = curso.querySelector('h3').textContent.toLowerCase();
            const shouldShow = tituloCurso.includes(titulo);
            curso.style.display = shouldShow ? 'block' : 'none';
        })
    }


    const cursosBackend = () => {
        fetch(`http://localhost:8080/cursos/backend`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                if (response.status === 403) {
                    window.location.href = "/index.html";
                }
                throw new Error(`${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const cursosContainer = document.getElementById('cursos-container');
            cursosContainer.innerHTML = ''; // Limpa os cursos existentes

            if (data.length > 0) {
                const links = data.map((curso, index) => {
                    const link = document.createElement('a');
                    link.href = curso.playlist;
                    link.classList.add('box');

                    const playIcon = document.createElement('i');
                    playIcon.classList.add('fas', 'fa-play');
                    link.appendChild(playIcon);

                    const img = document.createElement('img');
                    img.src = `images/post-1-${index + 2}.png`;
                    link.appendChild(img);

                    const h3 = document.createElement('h3');
                    h3.textContent = curso.titulo;
                    link.appendChild(h3);

                    return link;
                });

                cursosContainer.append(...links);
            } else {
                console.log('Nenhum curso encontrado para esta área.');
            }
        })
        .catch(erro => {
            console.error('Erro na requisição:', erro);
        })
        .finally(() => {
            // Agendar a próxima execução após 2 horas
            setTimeout(() => cursosBackend(), 7200000);
        });
    };

    // ouvinte pesquisa
    document.getElementById('searchButton').addEventListener('click', function (event) {
        event.preventDefault(); //tira o comportamento padrão do envio do formulário
        const titulo = document.getElementById('search').value.trim().toLowerCase();
        realizarPesquisa(titulo);
    });

    // funçao de cursos
    cursosBackend();
};

// funçao de token
recuperarToken();







// const recuperarToken = () => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//         window.location.href = "/index.html";
//         return;
//     }

//     // função requisiçao
//     const cursosBackend = () => {
//         fetch('http://localhost:8080/cursos/backend', {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 "Content-Type": "application/json",
//                 'Accept': "application/json"
//             }
//         })
//         .then(response => {
//             if (!response.ok) {
//                 if (response.status === 403) {
//                     window.location.href = "/index.html";
//                 }
//                 throw new Error(`${response.status} - ${response.statusText}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             //  dados da resposta
//             const cursosContainer = document.getElementById
//             ('cursos-container');
//             if (data.length > 0) {
                
//                      //cria um array
//                 const links = data.map((curso, index) => {
//                     //criar link para atribuir cursos
//                     const link = document.createElement('a');
//                     link.href = curso.playlist;
//                     link.classList.add('box');
//                    //criar elemento icon-video
//                     const playIcon = document.createElement('i');
//                     //add css
//                     playIcon.classList.add('fas', 'fa-play');
//                     //adicionar ao link
//                     link.appendChild(playIcon);
 
//                     //criando imagem
//                     const img = document.createElement('img');
//                     img.src = `images/post-1-${index + 2}.png`; 
//                     link.appendChild(img);

//                     const h3 = document.createElement('h3');
//                     h3.textContent = curso.titulo;
//                     link.appendChild(h3);
//                     //coversar com o james e perguntar se precisa de titulo msm

//                     return link;
//                 });

//                 cursosContainer.append(...links);
//             } else {
//                 console.log('Nenhum curso encontrado para esta área.');
//             }
//         })

//         .catch(erro => {
//             console.error('Erro na requisição:', erro);
//         })
//         .finally(() => {
//             // Agendar a próxima execução após 2 horas
//             setTimeout(cursosBackend, 7200000);
//         });
//     };

//     // Chamando a função trazer cursos
//     cursosBackend();
    
// }

// // Chamando a função principal

// recuperarToken();

