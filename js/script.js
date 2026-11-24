/* =========================================================
   MUNDO PET - FASE 2
   Funções JavaScript do formulário de agendamento
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    // Localiza os elementos do formulário no HTML.
    const formulario = document.getElementById("formAgendamento");
    const campoData = document.getElementById("dataAgendamento");
    const mensagem = document.getElementById("mensagemFormulario");

    // Se a página não tiver o formulário, encerra a execução.
    if (!formulario || !campoData || !mensagem) {
        return;
    }

    // Obtém a data de hoje no formato exigido pelo input date (AAAA-MM-DD).
    function obterDataLocal() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");

        return `${ano}-${mes}-${dia}`;
    }

    // Impede que o usuário selecione uma data anterior ao dia atual.
    campoData.min = obterDataLocal();

    // Trata o envio do formulário.
    formulario.addEventListener("submit", function (evento) {
        // Evita o recarregamento da página durante a demonstração.
        evento.preventDefault();

        // Executa a validação nativa dos campos obrigatórios e formatos.
        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        // Confere novamente se a data escolhida não ficou no passado.
        if (campoData.value < obterDataLocal()) {
            mensagem.className = "col-12 alert alert-danger mt-3";
            mensagem.textContent = "Escolha uma data igual ou posterior à data de hoje.";
            campoData.focus();
            return;
        }

        // Reúne os dados necessários para mostrar o resumo da solicitação.
        const dados = new FormData(formulario);
        const nomeCliente = dados.get("nomeCliente");
        const nomePet = dados.get("nomePet");
        const servico = dados.get("servico");
        const modalidade = dados.get("modalidade");
        const data = campoData.value;
        const horario = dados.get("horarioAgendamento");

        // Converte a data para o formato brasileiro.
        const dataFormatada = data.split("-").reverse().join("/");

        // Apresenta uma confirmação acessível na própria página.
        mensagem.className = "col-12 alert alert-success mt-3";
        mensagem.textContent =
            `Solicitação registrada para ${nomeCliente}. ` +
            `Pet: ${nomePet}. Serviço: ${servico}. ` +
            `Modalidade: ${modalidade}. Data: ${dataFormatada}, ` +
            `às ${horario}. Esta é uma demonstração acadêmica: ` +
            `o pedido não foi enviado a um sistema de atendimento.`;

        // Leva a mensagem para a área visível da tela.
        mensagem.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    // Limpa a mensagem quando o usuário escolhe limpar o formulário.
    formulario.addEventListener("reset", function () {
        mensagem.textContent = "";
        mensagem.className = "col-12";
    });
});
