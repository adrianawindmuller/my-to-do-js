function onLoad() {
    document.getElementById('txtTarefa').focus();
    arrastarTarefa();   
}

function arrastarTarefa(){
    let ulTarefa = document.querySelector('#ul-lista-tarefas');
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
        criarEditarTarefa(li);

    }
}

function presionarEnterTarefa(event) {
    let tarefa = document.getElementById('txtTarefa');
    if (event.keyCode == 13) {
        criarTarefa();
        tarefa.value = "";
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
    li.classList.add('list-group-item', 'cursor','form-inline');

    document.getElementById('ul-lista-tarefas').appendChild(li);

    return li;
}

function alterarTextoTarefa(li, descricaoTarefa) {
    let inputTexto = document.createElement('input');
    inputTexto.value = descricaoTarefa;
    inputTexto.classList.add('editar-tarefa', 'form-control');
    inputTexto.setAttribute('maxlength','22');

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
    let btnLixeira = document.createElement('button');
    btnLixeira.classList.add('btn-outline-primary', 'btn', 'btn-sm');

    let icone = document.createElement('i');
    icone.classList.add('far', 'fa-trash-alt');

    btnLixeira.appendChild(icone);
    li.appendChild(btnLixeira);

    btnLixeira.onclick = function () { excluirTarefa(li) }
}

function excluirTarefa(li) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        li.parentNode.removeChild(li);
    }
}

function criarEditarTarefa(li){
    let btnEditar = document.createElement('button');
    btnEditar.classList.add('btn-outline-primary', 'btn', 'btn-sm','botao-editar');

    let icone = document.createElement('i')
    icone.classList.add('fas', 'fa-pencil-alt');

    btnEditar.appendChild(icone);
    li.appendChild(btnEditar)

    btnEditar.onclick = function () {alternarModoEdicaoTarefa(true, li)}
}
