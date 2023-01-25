//Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList= document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')


//Event  Listener
document.addEventListener('DOMContentLoaded', getTodos)
 todoButton.addEventListener('click', addTodo)
 todoList.addEventListener('click', deleteCheck)
 filterOption.addEventListener('click', filterTodo)


//Functions
function addTodo(event){
    //prevent form from submitting
 event.preventDefault();

 //todo div
 const todoDiv = document.createElement('div')
todoDiv.classList.add('todo')

//Create Li
const newToDo = document.createElement('li')
newToDo.innerText = todoInput.value
newToDo.classList.add('todo-item')
todoDiv.appendChild(newToDo)

//add to the localstorage
saveLocalTodos(todoInput.value)

//check-mark button
const completedButton = document.createElement('button')
completedButton.innerHTML = '<i class="fas fa-check"></i>'
completedButton.classList.add('completed-btn')
todoDiv.appendChild(completedButton)

//trash button
const trashButton = document.createElement('button')
trashButton.innerHTML = '<i class="fas fa-trash"></i>'
trashButton.classList.add('trash-btn')
todoDiv.appendChild(trashButton)

//append to List
todoList.appendChild(todoDiv)

//clear todo input value
todoInput.value=''
}

function deleteCheck(event){
    const item = event.target;
    //delete todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;

        //animation
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', () => {
            todo.remove()
        })
    
    }

    //check mark
   if(item.classList[0] === 'completed-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed')
   } 
}

function filterTodo(event){
    const todos = todoList.childNodes
    todos.forEach((todo) =>{
        switch(event.target.value){
            case 'all':
                todo.style.display = 'flex'
                break
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = 'none'
                }
                break
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }else{
                    todo.style.display = 'none'
                }
                break
                
        }
    } )
}

function saveLocalTodos(todo){
    //check if i have  already todos in localstorage
    let todos;

    if(localStorage.getItem('todos') === null){
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach((todo) => {
        //todo div
 const todoDiv = document.createElement('div')
 todoDiv.classList.add('todo')
 
 //Create Li
 const newToDo = document.createElement('li')
 newToDo.innerText = todo
 newToDo.classList.add('todo-item')
 todoDiv.appendChild(newToDo)
 
 //check-mark button
 const completedButton = document.createElement('button')
 completedButton.innerHTML = '<i class="fas fa-check"></i>'
 completedButton.classList.add('completed-btn')
 todoDiv.appendChild(completedButton)
 
 //trash button
 const trashButton = document.createElement('button')
 trashButton.innerHTML = '<i class="fas fa-trash"></i>'
 trashButton.classList.add('trash-btn')
 todoDiv.appendChild(trashButton)
 
 //append to List
 todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos=[]
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}