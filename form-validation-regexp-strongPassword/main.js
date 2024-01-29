const loader_template = document.querySelector('#loader_template');
const header = document.querySelector('header');
const viewpass = document.getElementById('viewpass');


let msg = '';
let loadText = 'Loading...';

function getContent(id){
    return loader_template.content.firstElementChild.cloneNode(true)
}



class FORM {
    
    #regEpx = {
        email: /^[a-zA-Z0-9,._]+[@]{1}[a-zA-Z0-9]+[.]{1}[a-zA-Z]{2,10}$/ ,
        sexe: /^[a-zA-Z]+/,
        username: /^[a-zA-Z0-9_\-*;]+/,
        password: /^[a-zA-Z0-9$#&!?*_\-]+/
    }


    constructor (){
        
        this.form = document.querySelector('form');
        this.username = this.form.username;
        this.email = this.form.email;
        this.password = this.form.password;
        this.msg = '';
        this.isOk = false;


        this.form.addEventListener('submit', (e)=>{
            e.preventDefault();
            this.onSubmit()
            
        })
        
        this.showHide()
    }
    
    onLoad(){
        let container = document.createElement('div')
        container.classList.add('box_anime')
        
        loadText.trim().split('').forEach((l, i) =>{
            let span = document.createElement('span')
            span.innerHTML = l;
            span.setAttribute('style', `--i:${i}`)
            span.classList.add('item_anime')
            container.append(span);
    
        })
        
        document.body.append(container)
        
        
    }

    showHide(){
        viewpass.addEventListener('click',(e)=> {
            e.preventDefault();
            let type = this.password.type;
            this.password.type = type === 'password' ? 'text': 'password';
        });
    }
    
    onSubmit(){
        
        let data = new FormData(this.form)
        let terms = Object.fromEntries(data);
        
        let a = false
        let b = false
        let c = false
        
        
        for(let  [key, value] of Object.entries(terms)){
            this.key = key
            this.value = value
            this.veryfing(); 
            
            if (this.key === 'email' && this.isOk) {
                a = true
            }
            if (this.key === 'password' && this.isOk) {
                b = true
            }
            if (this.key === 'username' && this.isOk) {
                c = true
            }
            
            
        }
        
        if (a && b && c) {
           this.loading();

        }


        
    }
    
    veryfing(){
        let regEpx = this.#regEpx[this.key];
        this.isOk = this.checkRegepx(regEpx);
        this.Checked()
    }
    
    Checked(){
        let input = this[this.key];
        let parent = input.parentElement;

        if (!parent.querySelector('span')) {
            this.span = this.MsgElement();
            parent.append(this.span)
        }else{
            this.span = parent.querySelector('span');
        }
        this.addClass()
        this.setMsg()
    }
    
    addClass(){
        if (this.isOk) {
            this.span.classList.remove('alerted')
            this.span.classList.add('success')
        } else {
            this.span.classList.remove('success')
            this.span.classList.add('alerted')
        }    
    }
    
    setMsg(){
        if (this.isOk) {
            this.msg = `${this.key} valide!`;
        } else {
            if (this.key === 'password') {
                this.badPassword();
                return
            }
            this.msg = `veuillez inséré un ${this.key} valide!`
        }
        
        this.span.innerHTML = this.msg;
    }
    
    MsgElement(){
        return document.createElement('span')
    }
        
    checkRegepx(regEpx){
        this.value = this.value.toString().trim()

        if (this.key === 'password') {
            return this.checkedPassword()
        }
        
        let testValue = regEpx.test(this.value)
        let notEmpty = this.value.toString().trim() !== ''
        return testValue && notEmpty;
    }
        
    badPassword(){
        
        let msg = ''
        
        if (this.value.toString().length < 8) {
            msg = ` Au moins 8 caractères`
        }else if (!/[a-z]/.test(this.value)) {
            msg = ` Au moins une lettres minuscules`
        }else if(!/[A-Z]/.test(this.value)){
            msg = ` Au moins une lettres Magiscul`
       }
        else if(!/[0-9]/.test(this.value)){
            msg = ` Au moins un chiffre`
        }
        else if(!/[#*"\-:+;()!?/#@$,]/.test(this.value)){
            msg = ` Au moins un des caractères suivants  #*"-:+;()!?/#@`
        }
        else if(/[ ]+/.test(this.value)) {
            msg = `Ve doit pas contenir d'espace vide!`
        }
        else{
            msg = `${this.key} valide!`;
        }
        
        this.span.innerHTML = msg;
        
    }
        
    checkedPassword(){
        
        
        if (this.value.length < 8) {
            return false
        } else if (!/[a-z]/.test(this.value)) {
            return false
        } else if (!/[A-Z]/.test(this.value)) {
            return false
        }
        else if (!/[0-9]/.test(this.value)) {
            return false
        }
        else if (!/[#*"\-:+;()!?/#@$,]/.test(this.value)) {
            return false
        }
        else if (/[ ]+/.test(this.value)) {
            return false
        }
        else {
            return true
        }        
    }
    
    loading(){
        let loader = getContent()
        let btn = this.form.querySelector('button')
        btn.setAttribute('disabled', '')
        btn.classList.add('off')
        
        setTimeout(()=>{
            this.onLoad();
            document.querySelector('#loader_container').insertAdjacentElement('beforeend', loader)
        }, 200)
        
        setTimeout(() => {
            btn.removeAttribute('disabled', '')
            btn.classList.remove('off')
            loader.remove()
            document.querySelector('.box_anime').remove()
        }, 3000)
        
    }
    
    
}



let f = new FORM()



