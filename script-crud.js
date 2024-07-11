// encontrar o botão adicionar tarefa

const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const paragrafoDescricaoTarefa= document.querySelector('.app__section-active-task-description')

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function atualizarTarefas(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));}

function criarElementoTarefa(tarefa) { 
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick =()=>{ 
        const novaDescricao =   prompt('digitar uma nova tarefa');
        console.log('nova descricao da task:',novaDescricao);
    paragrafo.textContent=novaDescricao;
    tarefa.descricao=novaDescricao;
    atualizarTarefas();
}
    const botaoDeteteTask =document.createElement('button');
    botaoDeteteTask.textContent = ('Delete')
    botaoDeteteTask.classList.add('app_button-edit')
    
   
    botaoDeteteTask.addEventListener('click',()=>{
        const index = tarefas.indexOf(tarefa)
        if (index > -1){
            tarefas.splice(index,1)
            atualizarTarefas();
            li.remove();
        }
    })

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', 'imagens/edit.png')
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)
    li.append(botaoDeteteTask)
    
    li.onclick=() =>{ 
        document.querySelectorAll('.app__section-task-list-item-active')
        .forEach(elemento=>{
            elemento.classList.remove('app__section-task-list-item-active')
           })
        if(tarefaSelecionada==tarefa){
            paragrafoDescricaoTarefa.textContent='';
            tarefaSelecionada=null;
            liTarefaSelecionada = null;
            return;
        }


        tarefaSelecionada=tarefa;
        liTarefaSelecionada = li;
        paragrafoDescricaoTarefa.textContent=tarefa.descricao;

       li.classList.add('app__section-task-list-item-active')
    }

    return li
}   




btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
})

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
   
    ulTarefas.append(elementoTarefa)
    atualizarTarefas();
    textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})


tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});

const btnCancelar= document.querySelector('.app__form-footer__button--cancel')
   
function limparFormulario (){
   
        textarea.value='';
      
        formAdicionarTarefa.classList.toggle('hidden')
    }

    btnCancelar.addEventListener('click', limparFormulario);

    document.addEventListener('focoFinalzado',() =>{
        if (tarefaSelecionada && liTarefaSelecionada){
            liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
            liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
            liTarefaSelecionada.querySelector('button')
            .setAttribute('disabled', 'disabled');
    
        }
    })