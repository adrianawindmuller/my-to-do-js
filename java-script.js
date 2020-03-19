onLoad = () => document.getElementById('txtTarefa').focus();

function criarTarefa() {
    if (!inputEstaVazio()) {  // ! - not 
        let descricaoTarefa = document.getElementById('txtTarefa').value;
        let li = criarLi(descricaoTarefa);

        criarInputTarefa(li, descricaoTarefa);
        criarCheckBox(li);
        criarLixeira(li);
    }
}

function enterTarefa(event) {
    if (event.keyCode == 13) {
        criarTarefa();
        document.getElementById('txtTarefa').value = ""

    }
}

function inputEstaVazio() {
    let tarefa = document.getElementById('txtTarefa').value;
    return (tarefa.length == 0);
}

function criarLi(descricaoTarefa) {
    let span = document.createElement('span');
    span.append(descricaoTarefa);
    span.onclick = function () { alternarModoEdicao(true, li) }

    let li = document.createElement('li')
    li.append(span);
    li.classList.add('list-group-item');

    document.getElementById('ul-lista-tarefas').appendChild(li);

    return li;
}

function criarInputTarefa(li, descricaoTarefa) {
    let inputTexto = document.createElement('input');
    inputTexto.value = descricaoTarefa;
    inputTexto.classList.add('editar-tarefa');

    inputTexto.onkeypress = function (event) {
        if (event.keyCode == 13) {
            alternarModoEdicao(false, li);
            li.querySelector('span').append(inputTexto.value);
        }
    }
    li.appendChild(inputTexto);

    alternarModoEdicao(false, li);
}

function alternarModoEdicao(editar, li) {
    let editarTarefa = li.querySelector('.editar-tarefa');
    let span = li.querySelector('span');

    if (editar) {
        span.style.display = 'none';

        editarTarefa.style.display = 'inline';
        editarTarefa.removeAttribute('readonly');
        editarTarefa.focus();
    } else {
        span.style.display = 'inline'

        editarTarefa.style.display = 'none';
        editarTarefa.setAttribute('readonly', '');
    }
}

let idTarefa = 1;
function criarCheckBox(li) {
    let chkConcluir = document.createElement('input');
    chkConcluir.setAttribute('type', 'checkbox');
    chkConcluir.setAttribute('id', idTarefa++)
    li.appendChild(chkConcluir);
    chkConcluir.classList.add('chkConcluir');
    chkConcluir.onclick = function () { alterarTarefa(li) }
}

function alterarTarefa(li) {
    let concluido = li.querySelector('.chkConcluir').checked;

    if (concluido) {
        li.style.textDecoration = 'line-through';
        li.style.fontStyle = 'italic';
    } else {
        li.style.textDecoration = 'none';
        li.style.fontStyle = 'normal';
    }
}

function criarLixeira(li) {
    let botao = document.createElement('button');
    botao.classList.add('btn-outline-danger', 'btn', 'btn-sm');

    let icone = document.createElement('i');
    icone.classList.add('far', 'fa-trash-alt');

    botao.appendChild(icone);
    li.appendChild(botao);

    botao.onclick = function () { excluirTarefa(li) }
}

function excluirTarefa(li) {
    if (confirm('Tem certeza?')) {
        li.parentNode.removeChild(li);
    }
}
