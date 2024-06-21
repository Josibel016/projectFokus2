const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea= document.querySelector('.app__form-textarea');
const bntSalvar = document.querySelector('.app__form-footer__button app')
const tarefas= [];


btnAdicionarTarefa.addEventListener('click',()=>{
    formAdicionarTarefa.classList.toggle('hidden');
   
    
})

formAdicionarTarefa.addEventListener('submit',(evento)=>{
    evento.preventDefault();

    const tasks ={
        descricao:textarea.value
    } 
tarefas.push(tasks);
    localStorage.setItem('descricaoTarefa',JSON.stringify(tarefas));
    textarea.value=''
}

)


