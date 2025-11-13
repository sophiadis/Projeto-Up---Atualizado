// Dados das vagas
const vagas = [
    {
        id: 1,
        titulo: "Desenvolvedor(a) Full Stack",
        categoria: "Desenvolvimento",
        descricao: "Buscamos um desenvolvedor full stack com experiência em React e Node.js para integrar nosso time.",
        nivel: "pleno",
        cargo: "desenvolvedor",
        localizacao: "Natal",
        jornada: "integral",
        salario: "R$ 4.000 - R$ 6.000"
    },
    {
        id: 2,
        titulo: "Analista de Marketing Digital",
        categoria: "Marketing",
        descricao: "Profissional para gerenciar campanhas digitais, redes sociais e estratégia de conteúdo.",
        nivel: "pleno",
        cargo: "marketing",
        localizacao: "Natal",
        jornada: "integral",
        salario: "R$ 3.500 - R$ 5.000"
    },
    {
        id: 3,
        titulo: "Enfermeiro(a) Assistencial",
        categoria: "Saúde",
        descricao: "Profissional de enfermagem para atuar em clínica com experiência em atendimento ao paciente.",
        nivel: "pleno",
        cargo: "saude",
        localizacao: "Natal",
        jornada: "integral",
        salario: "R$ 2.500 - R$ 3.500"
    },
    {
        id: 4,
        titulo: "Engenheiro(a) de Dados",
        categoria: "Desenvolvimento",
        descricao: "Especialista em arquitetura de dados e pipelines ETL para processar grandes volumes de informação.",
        nivel: "senior",
        cargo: "desenvolvedor",
        localizacao: "Natal",
        jornada: "integral",
        salario: "R$ 6.000 - R$ 9.000"
    },
    {
        id: 5,
        titulo: "Analista de RH Júnior",
        categoria: "Recursos Humanos",
        descricao: "Profissional para auxiliar em recrutamento, seleção e gestão de pessoal.",
        nivel: "junior",
        cargo: "rh",
        localizacao: "Natal",
        jornada: "integral",
        salario: "R$ 2.000 - R$ 3.000"
    },
    {
        id: 6,
        titulo: "Estagiário(a) em Administração",
        categoria: "Administração",
        descricao: "Oportunidade para estudante de administração com interesse em gestão empresarial.",
        nivel: "junior",
        cargo: "vendas",
        localizacao: "Natal",
        jornada: "meio-periodo",
        salario: "R$ 1.200 - R$ 1.500"
    }
];

// Renderizar vagas
function renderizarVagas(vagasFiltradas = vagas) {
    const container = document.getElementById('cards-vagas');
    container.innerHTML = '';

    if (vagasFiltradas.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">Nenhuma vaga encontrada com os filtros selecionados.</p>';
        return;
    }

    vagasFiltradas.forEach(vaga => {
        const card = document.createElement('div');
        card.className = 'vaga';
        card.innerHTML = `
            <h3>${vaga.titulo}</h3>
            <span class="vaga-categoria">${vaga.categoria}</span>
            <p class="vaga-descricao">${vaga.descricao}</p>
            <div class="vaga-info">
                <span><strong>Nível:</strong> ${vaga.nivel.charAt(0).toUpperCase() + vaga.nivel.slice(1)}</span>
                <span class="vaga-salario">${vaga.salario}</span>
            </div>
            <button class="candidatar-btn" onclick="abrirModalComVaga(${vaga.id})">Se candidatar</button>
        `;
        container.appendChild(card);
    });

    // Atualizar select do modal
    atualizarSelectVagas();
}

// Atualizar select de vagas no modal
function atualizarSelectVagas() {
    const select = document.getElementById('vaga-select');
    select.innerHTML = '<option value="">-- Escolha uma vaga --</option>';
    
    vagas.forEach(vaga => {
        const option = document.createElement('option');
        option.value = vaga.id;
        option.textContent = vaga.titulo;
        select.appendChild(option);
    });
}

// Abrir modal
function abrirModal() {
    document.getElementById('modal').style.display = 'block';
}

// Abrir modal com vaga pré-selecionada
function abrirModalComVaga(vagaId) {
    abrirModal();
    document.getElementById('vaga-select').value = vagaId;
}

// Fechar modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('form-candidatura').reset();
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        fecharModal();
    }
}

// Enviar formulário
document.getElementById('form-candidatura').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const vagaId = document.getElementById('vaga-select').value;
    const curriculo = document.getElementById('curriculo').files[0];
    
    const vaga = vagas.find(v => v.id == vagaId);
    
    // Aqui você pode enviar os dados para seu servidor
    console.log({
        nome,
        email,
        telefone,
        vaga: vaga.titulo,
        curriculo: curriculo.name
    });
    
    alert(`Candidatura enviada com sucesso!\n\nVaga: ${vaga.titulo}\nNome: ${nome}\nEmail: ${email}`);
    
    fecharModal();
});

// Filtrar vagas
function filtrarVagas() {
    const busca = document.getElementById('busca').value.toLowerCase();
    const localizacao = document.getElementById('localizacao').value.toLowerCase();
    const checkboxes = document.querySelectorAll('.filtro-checkbox:checked');
    const filtrosAtivos = Array.from(checkboxes).map(cb => cb.value);

    const vagasFiltradas = vagas.filter(vaga => {
        const matchBusca = vaga.titulo.toLowerCase().includes(busca) || 
                          vaga.descricao.toLowerCase().includes(busca);
        const matchLocalizacao = vaga.localizacao.toLowerCase().includes(localizacao) || localizacao === '';
        const matchFiltros = filtrosAtivos.length === 0 || 
                            filtrosAtivos.includes(vaga.nivel) ||
                            filtrosAtivos.includes(vaga.cargo) ||
                            filtrosAtivos.includes(vaga.jornada);

        return matchBusca && matchLocalizacao && matchFiltros;
    });

    renderizarVagas(vagasFiltradas);
}

// Event listeners para filtros
document.getElementById('busca').addEventListener('input', filtrarVagas);
document.getElementById('localizacao').addEventListener('input', filtrarVagas);
document.querySelectorAll('.filtro-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', filtrarVagas);
});

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    renderizarVagas();
});