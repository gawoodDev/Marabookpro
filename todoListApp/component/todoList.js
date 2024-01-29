import {createElement} from '../function/dom.js'



export class TODO {
    
    #todos = []
    #element
    #todo_container
    
    constructor(todos){
        this.#todos = todos;
    }
    
    appendTo(element){
        
        this.#element = element
        this.#element.innerHTML = `
        <form>
          <input type="text" name="formValue" id="formValue" value="" /> <button type="submit">Add</button>
        </form>
        
        <div class='filter_container'>
          <button class="active filter_btn" data-filter="all" type="button">All</button>
          <button class="filter_btn" data-filter="todo" type="button">todo</button>
          <button class="filter_btn" data-filter="finish" type="button">Finish</button>
        </div>
      
        <ul class="todo_container">
          
        </ul> `;
            
        this.#todo_container = this.#element.querySelector('.todo_container')
        
        for (let todo of this.#todos) {
            const item = new TODO_ITEM(todo)
            this.#todo_container.append(item.appendTo)
        }
    
        const form = this.#element.querySelector('form')
        form.addEventListener('submit', e => this.onSubmit(e) )
        
        this.#element.querySelectorAll('.filter_container button').forEach((button)=>{
            button.addEventListener('click', e => this.#toggleFilter(e));
        })
        
        
   
    }
    
    onSubmit(e){
        e.preventDefault()
        
        const form = e.currentTarget
        const title = new FormData(e.currentTarget).get('formValue').toString().trim()
        
        if (title === '') {
            console.log('no text added')
            return
        }
        
        const todo = {
            id: Date.now(),
            title,
            isCompleted: false
        }
        const item = new TODO_ITEM(todo)
        this.#todo_container.prepend(item.appendTo)
        
        form.reset()
        form['formValue'].focus()
        
        
    }
    
    #toggleFilter(e){
        e.preventDefault()
        const button = e.currentTarget
        const attribute = e.currentTarget.getAttribute('data-filter')
        button.parentElement.querySelector('.active').classList.remove('active')
        button.classList.add('active')
        
        if (attribute === 'todo') {
            this.#todo_container.classList.remove('finish')
            this.#todo_container.classList.add('not_finish')
        }
        else if (attribute === 'finish'){
            this.#todo_container.classList.remove('not_finish')
            this.#todo_container.classList.add('finish')

        }
        else{
            this.#todo_container.classList.remove('not_finish')
            this.#todo_container.classList.remove('finish')
              
        }
    }

   
    
}





class TODO_ITEM {
    
    #task 
    
    constructor(todo){
        
        
        
        const id =`todo_${todo.id}`;
        
        const li = createElement('li',{
            class: 'todo_item'
        })
        
        this.#task = li

        const checkbox = createElement('input',{
            id,
            type: 'checkbox',
            checked: todo.isCompleted ? '' : false
        })
        const label = createElement('label',{
            for: id
        })
        
        label.innerHTML = todo.title
        const button = createElement('button',{
            class: 'deleted_btn',
            type: 'button'
        })
        button.innerHTML = 'Rem'
        
        button.addEventListener('click',(e) => {
            this.remove(e)
        })
        
        
        this.#task.append(checkbox)
        this.#task.append(label)
        this.#task.append(button)
        
        
        this.toggle(checkbox)
        
        checkbox.addEventListener('change', e => {
            this.toggle(e.currentTarget)
        })
        
    }
    
    get appendTo(){
        return this.#task
    }
    
    remove(e){
       e.preventDefault()
       this.#task.remove()
   }
    
    toggle(checkbox) {
        if (checkbox.checked) {
            console.log('yes')
            this.#task.classList.add('is_completed')
        } else {
            this.#task.classList.remove('is_completed')
            console.log('no')
        }
    }
}