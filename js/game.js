document.addEventListener('DOMContentLoaded', function () {
    const nome = localStorage.getItem('nome') || 'Jogador';
    const pecas = parseInt(localStorage.getItem('pecas')) || 3;

    //----------------------------------------------------ELEMENTOS DA PÁGINA DO JOGO----------------------------------------------------
    const areaJogo = document.getElementById('game'); // área do jogo
    const displayJogador = document.getElementById('player-info'); // display jogador
    const displayContador = document.getElementById('move-count'); // contador de movimentos
    const mensagemVitoria = document.createElement('div'); // adiciona um elemento para a mensagem de vitória

    let contadorMovimentos = 0;
    let pecaSelecionada = null;
    let torreSelecionada = null;

    displayJogador.textContent = `Jogador: ${nome}`; // Exibe o nome do jogador
    displayContador.textContent = `Movimentos: ${contadorMovimentos}`; // Contador de movimentos

    mensagemVitoria.id = 'mensagem-vitoria'; // Define um id para o elemento da mensagem de vitória
    mensagemVitoria.style.display = 'none'; // Inicialmente escondido
    mensagemVitoria.style.position = 'absolute'; // Para posicionar a mensagem
    mensagemVitoria.style.top = '20px'; // Ajuste conforme necessário
    mensagemVitoria.style.left = '50%'; // Centraliza horizontalmente
    mensagemVitoria.style.transform = 'translateX(-50%)'; // Ajuste para centralizar
    mensagemVitoria.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Fundo escuro
    mensagemVitoria.style.color = '#fff'; // Texto branco
    mensagemVitoria.style.padding = '10px 20px'; // Espaçamento
    mensagemVitoria.style.borderRadius = '5px'; // Cantos arredondados
    mensagemVitoria.style.fontSize = '18px'; // Tamanho da fonte
    mensagemVitoria.style.fontWeight = 'bold'; // Negrito

    document.body.appendChild(mensagemVitoria); // Adiciona a mensagem ao body

    let torres = [[], [], []]; // Array das torres

    function criarJogo() { // Função para configurar o início do jogo
        torres = [[], [], []]; // Reinicia as torres
        for (let i = pecas; i >= 1; i--) {
            torres[0].push(i); // Adiciona as peças na primeira torre
        }

        carregarTorres(); // Carrega as torres na tela
    }

    function carregarTorres() {
        areaJogo.innerHTML = '';
        for (let i = 0; i < torres.length; i++) {
            const torre = torres[i];
            const divTorre = document.createElement('div');
            divTorre.classList.add('torre');
            divTorre.id = `torre-${i}`; // Atribuindo um ID às torres
            divTorre.addEventListener('click', function() { 
                tratamentoTorre(i); // Usa o índice da torre
            });

            for (let j = 0; j < torre.length; j++) {
                const peca = torre[j];
                const divPeca = document.createElement('div');
                divPeca.classList.add('peca');
                divPeca.id = `peca-${i}-${j}`; // Atribuindo um ID às peças
                divPeca.textContent = peca;
                divPeca.style.width = `${peca * 20 + 20}px`;
                divPeca.style.height = '40px';
                divPeca.style.margin = '4px auto'; 
                divPeca.addEventListener('click', function(e) {
                    tratamentoPeca(e, i); // Passa o índice da torre
                });
                divTorre.appendChild(divPeca);
            }

            areaJogo.appendChild(divTorre); 
        }
    }

    function tratamentoPeca(event, idTorre) {
        event.stopPropagation(); 
        const divPeca = event.target;
    
        if (pecaSelecionada !== null && torreSelecionada !== null) {
            if (movimentoValido(torreSelecionada, idTorre)) {
                moverPeca(torreSelecionada, idTorre);
                contadorMovimentos++;
                displayContador.textContent = `Movimentos: ${contadorMovimentos}`;
                carregarTorres();
    
                if (torres[2].length === pecas) {
                    mensagemVitoria.textContent = `Parabéns, ${nome}! Você completou o jogo em ${contadorMovimentos} movimentos.`;
                    mensagemVitoria.style.display = 'block'; // Exibe a mensagem de vitória
                    pecaSelecionada = null;
                    torreSelecionada = null;
                }
            } else {
                alert('Movimento inválido. Tente novamente.');
            }
    
            // Remove a classe 'selecionado' de todas as peças e torres
            const todosElementos = document.querySelectorAll('.peca, .torre');
            for (let i = 0; i < todosElementos.length; i++) {
                todosElementos[i].classList.remove('selecionado');
            }
            pecaSelecionada = null;
            torreSelecionada = null;
        } else {
            pecaSelecionada = divPeca;
            torreSelecionada = idTorre;
            // Remove a classe 'selecionado' de todas as torres
            const todasTorres = document.querySelectorAll('.torre');
            for (let i = 0; i < todasTorres.length; i++) {
                todasTorres[i].classList.remove('selecionado');
            }
            pecaSelecionada.classList.add('selecionado');
        }
    }

    function tratamentoTorre(idTorre) {
        if (pecaSelecionada !== null && torreSelecionada !== null) {
            if (movimentoValido(torreSelecionada, idTorre)) {
                moverPeca(torreSelecionada, idTorre);
                contadorMovimentos++;
                displayContador.textContent = `Movimentos: ${contadorMovimentos}`;
                carregarTorres();

                if (torres[2].length === pecas) {
                    mensagemVitoria.textContent = `Parabéns, ${nome}! Você completou o jogo em ${contadorMovimentos} movimentos.`;
                    mensagemVitoria.style.display = 'block'; // Mostra a mensagem de vitória
                }

                // Remove a classe 'selecionado' de todas as peças e torres
                const todosElementos = document.querySelectorAll('.peca, .torre');
                for (let i = 0; i < todosElementos.length; i++) {
                    todosElementos[i].classList.remove('selecionado');
                }
                pecaSelecionada = null;
                torreSelecionada = null;
            } else {
                alert('Movimento inválido. Tente novamente.');
            }
        } else {
            torreSelecionada = idTorre; // Define a torre selecionada
            // Remove a classe 'selecionado' de todas as torres
            const todasTorres = document.querySelectorAll('.torre');
            for (let i = 0; i < todasTorres.length; i++) {
                todasTorres[i].classList.remove('selecionado');
            }
            document.getElementById(`torre-${idTorre}`).classList.add('selecionado'); // Adiciona a classe 'selecionado' à torre
        }
    }

    function moverPeca(origem, destino) {
        const peca = torres[origem].pop(); // Tira o último objeto da array da torre de origem
        torres[destino].push(peca); // Adiciona o objeto ao final da array da torre de destino
    }

    function movimentoValido(origem, destino) {
        if (origem < 0 || origem > 2 || destino < 0 || destino > 2) return false; // Verifica se o índice das torres é válido
        if (torres[origem].length === 0) return false; // Verifica se a torre de origem está vazia
        if (torres[destino].length === 0) return true; // Se a torre de destino estiver vazia, o movimento é válido
        const pecaMovida = torres[origem][torres[origem].length - 1]; // Obtém a peça no topo da torre de origem
        const pecaDestino = torres[destino][torres[destino].length - 1]; // Obtém a peça no topo da torre de destino
        return pecaMovida < pecaDestino; // O movimento é válido se a peça movida for menor que a peça no destino
    }

    criarJogo(); // Inicia o jogo
});

function reiniciar() {
    location.reload(); // Recarrega a página para reiniciar o jogo
}

function voltarInicio() {
    window.location.href = 'index.html'; // Volta para a página inicial
}
