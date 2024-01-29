import {callApi} from './function/api.js'
import {createElement} from './function/dom.js'
import {TODO} from './component/todoList.js'
const page = document.querySelector('#page')


try {
    
    const data = await callApi("entri.json")
    const newTodo = new TODO(data)
    newTodo.appendTo(page)
    
    
} catch (e) {
    
    const div = createElement('div',{
        class: 'alerted'
    })
    div.innerHTML = "Le serveur ne peut pas démarrer."
    page.prepend(div)
    
}







