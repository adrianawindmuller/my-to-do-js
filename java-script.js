function onLoad() {
    document.getElementById('txtTarefa').focus();

    let ulTarefa = document.querySelector('#ul-lista-tarefas')
    new Sortable(ulTarefa, {
        animation: 150,
        ghostClass: 'blue-background-class',
        forceFallback: true,
        onChoose: function (evt) { $("#ul-lista-tarefas").css('cursor', 'grab'); },
        onStart: function (evt) { $("#ul-lista-tarefas").css('cursor', 'grabbing'); },
        onEnd: function (evt) { $("#ul-lista-tarefas").css('cursor', 'grab'); },
    });
}

function criarTarefa() {
    if (!textoTarefaEstaVazio()) {  // ! - not 
        let descricaoTarefa = document.getElementById('txtTarefa').value;
        let li = criarLi(descricaoTarefa);

        alterarTextoTarefa(li, descricaoTarefa);
        criarCheckBox(li);
        criarLixeira(li);

    }
}

function presionarEnterTarefa(event) {
    if (event.keyCode == 13) {
        criarTarefa();
        document.getElementById('txtTarefa').value = ""

    }
}

function textoTarefaEstaVazio() {
    let tarefa = document.getElementById('txtTarefa').value;
    return (tarefa.length == 0);
}

function criarLi(descricaoTarefa) {
    let span = document.createElement('span');
    span.append(descricaoTarefa);
    span.onclick = function () { alternarModoEdicaoTarefa(true, li) }

    let li = document.createElement('li')
    li.append(span);
    li.classList.add('list-group-item', 'cursor');

    document.getElementById('ul-lista-tarefas').appendChild(li);

    return li;
}

function alterarTextoTarefa(li, descricaoTarefa) {
    let inputTexto = document.createElement('input');
    inputTexto.value = descricaoTarefa;
    inputTexto.classList.add('editar-tarefa');

    inputTexto.onkeypress = function (event) {
        if (event.keyCode == 13) {
            alternarModoEdicaoTarefa(false, li);
            let Span = li.querySelector('span');
            Span.innerText = "";
            Span.append(inputTexto.value);
        }
    }
    li.appendChild(inputTexto);

    alternarModoEdicaoTarefa(false, li);
}

function alternarModoEdicaoTarefa(editar, li) {
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
    chkConcluir.onclick = function () { concluiTarefa(li) }
}

function concluiTarefa(li) {
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

