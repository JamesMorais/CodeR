const recuperarToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = "/index.html";
        return;
    }

    // função requisiçao
    const cursosFront = () => {
        fetch('http://localhost:8080/cursos/frontend', {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
                'Accept': "application/json"
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
            //  dados da resposta
            const cursosContainer = document.getElementById
            ('cursos-container');
            if (data.length > 0) {
                
                     //cria um array
                const links = data.map((curso, index) => {
                    //criar link para atribuir cursos
                    const link = document.createElement('a');
                    link.href = curso.linkPlaylist;
                    link.classList.add('box');
                   //criar elemento icon-video
                    const playIcon = document.createElement('i');
                    //add css
                    playIcon.classList.add('fas', 'fa-play');
                    //adicionar ao link
                    link.appendChild(playIcon);
 
                    //criando imagem
                    const img = document.createElement('img');
                    img.src = `images/post-1-${index + 2}.png`; 
                    link.appendChild(img);

                    const h3 = document.createElement('h3');
                    h3.textContent = curso.titulo;
                    link.appendChild(h3);
                    //coversar com o james e perguntar se precisa de titulo msm

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
            setTimeout(cursosFront, 7200000);
        });
    };

    // Chamando a função trazer cursos
    cursosFront();
    
}

// Chamando a função principal

recuperarToken();




