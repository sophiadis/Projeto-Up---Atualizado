// Função para abrir o teste - TODOS mostram alerta
function abrirTeste(paginaTeste) {
    // Lista de todos os testes e suas mensagens
    const testesMensagens = {
        'quem-carreira.html': 'Quem é você na carreira? - Em desenvolvimento',
        'teste-vocacao.html': 'Teste de vocação - Em desenvolvimento',
        'trajetoria-talentos.html': 'Trajetória de talentos - Em desenvolvimento',
        'perfil-aptidoes.html': 'Perfil de aptidões - Em desenvolvimento',
        'analise-potencial.html': 'Análise de potencial - Em desenvolvimento',
        'trilhas-inspiram.html': 'Trilhas que inspiram - Em breve',
        'rumo-realizacao.html': 'Rumo à realização - Em desenvolvimento',
        'trabalho-equipe.html': 'Trabalho em equipe - Em desenvolvimento'
    };

    // Pega a mensagem do teste ou usa uma mensagem padrão
    const mensagem = testesMensagens[paginaTeste] || 'Este teste está em desenvolvimento';
    
    // MOSTRA ALERTA PARA TODOS OS TESTES
    alert('🚧 ' + mensagem + '! Estará disponível em breve.');
}

// Adiciona eventos de clique aos cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const pagina = this.getAttribute('data-pagina');
            if (pagina) {
                abrirTeste(pagina);
            }
        });
    });
});

// Função para voltar à página de testes
function voltarParaTestes() {
    window.location.href = 'testes.html';
}