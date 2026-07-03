function getInputs(){
    return {
        nome: document.getElementById('nome'),
        data: document.getElementById('data'),
        email: document.getElementById('email'),
        senha: document.getElementById('senha'),
        pais: document.getElementById('pais'),
        jogador_favorito: document.getElementById('jogador_favorito')
    };
}

function calcularIdade(dataNascimento) {
    if (!dataNascimento) return 0;
    const hoje = new Date();
    const partes = dataNascimento.split('-'); 
    const anoNasc = parseInt(partes[0], 10);
    const mesNasc = parseInt(partes[1], 10) - 1;
    const diaNasc = parseInt(partes[2], 10);
    let idade = hoje.getFullYear() - anoNasc;
    if (hoje.getMonth() < mesNasc || (hoje.getMonth() === mesNasc && hoje.getDate() < diaNasc)) {
        idade--;
    }
    return idade;
}

function classificarTorcedor(idade){
    if(idade <= 16){
        return "Torcedor Mirim";
    }
    else if(idade <= 30){
        return "Torcedor Novato";
    }
    else{
        return "Torcedor Experiente";
    }
}

function getValores({nome, data, email, senha, pais, jogador_favorito}){
    const dataValor = data.value.trim();
    return {
        nome: nome.value.trim(),
        data: data.value.trim(),
        idade: calcularIdade(dataValor),
        categoria: classificarTorcedor(idade),
        email: email.value.trim(),
        senha: senha.value.trim(),
        pais: pais.value.trim(),
        jogador_favorito: jogador_favorito.value.trim()
    };
}

async function cadastrar(){
    const inputs = getInputs();
    const dados = getValores(inputs);

    await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    window.location.href = 'resultado.html';
}

async function mostrarResultado(){
    const resultadoDiv = document.getElementById('resultado');
    if (!resultadoDiv) return;
    const resposta = await fetch('/api/usuarios');
    const usuarios = await resposta.json();
    if (usuarios.length === 0) {
        resultadoDiv.innerHTML = '<p>Nenhum usuário cadastrado ainda.</p>';
        return;
    }
    let html = '<table><thead><tr><th>ID</th><th>Nome</th><th>Data Nasc.</th><th>Idade</th><th>Categoria</th><th>Email</th><th>País</th><th>Jogador Favorito</th></tr></thead><tbody>';
    for (const u of usuarios) {
        html += `<tr><td>${u.id}</td><td>${u.nome}</td><td>${u.data}</td><td>${u.idade} anos</td><td>${u.categoria}</td><td>${u.email}</td><td>${u.pais}</td><td>${u.jogador_favorito}</td></tr>`;
    }
    html += '</tbody></table>';
    resultadoDiv.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
    const btnEnviar = document.getElementById('btnEnviar');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', function(event) {
            event.preventDefault();
            cadastrar();
        });
    }
    if (document.getElementById('resultado')) {
        mostrarResultado();
    }
});

async function mostrarUltimo(){

    const resposta = await fetch('/api/ultimo');
    const usuario = await resposta.json();

    document.getElementById("ultimo").innerHTML = `
        <p><strong>Nome:</strong> ${usuario.nome}</p>
        <p><strong>Idade:</strong> ${usuario.idade} anos</p>
        <p><strong>Categoria:</strong> ${usuario.categoria}</p>
        <p><strong>E-mail:</strong> ${usuario.email}</p>
        <p><strong>País:</strong> ${usuario.pais}</p>
        <p><strong>Jogador Favorito:</strong> ${usuario.jogador_favorito}</p>
    `;

}

async function mostrarHistorico(){

    const resposta = await fetch('/api/usuarios');
    const usuarios = await resposta.json();

    let html = `
    <table>
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>País</th>
            <th>Categoria</th>
        </tr>
    `;

    for(const u of usuarios){

        html += `
        <tr>
            <td>${u.id}</td>
            <td>${u.nome}</td>
            <td>${u.pais}</td>
            <td>${u.categoria}</td>
        </tr>
        `;

    }

    html += "</table>";

    document.getElementById("historico").innerHTML = html;

}

document.addEventListener("DOMContentLoaded", function(){

    mostrarUltimo();
    mostrarHistorico();

});
