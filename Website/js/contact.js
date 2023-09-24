let drop_down_email = document.querySelectorAll('.drop_down_email')  
let drop_down_email_item = document.querySelectorAll('.drop_down_email > div')  
let input_email = document.querySelector('#email')  


let INPUT_DROPER =  class {
  constructor (input) {
    this.input = input
    this.droplist = this.input.nextElementSibling
    this.dropitem = Array.from(this.droplist.querySelectorAll('div'))
    
    this.CLICK_INPUT()
    this.DROP_SELECT()
    
    this.input.contentEditable = 'false'

    
  }
  
    
  alerted () {
  }
    
  
  CLICK_INPUT () {
    this.input.addEventListener('click', 
     this.DROP_DOWN_ON.bind(this) 
    )
  }
  
  
  
  DROP_DOWN_ON ()  {
    try {
      document.querySelector('.drop_down_email.block').classList.remove('block')
    } catch (e) { }
    this.droplist.classList.toggle('block')
  }
  
  
  
  DROP_DOWN_OFF  (){
    this.droplist.classList.remove('block')
  }
  
  
  
  DROP_SELECT (){
    this.dropitem.forEach(item => {
      item.addEventListener('click', this.CHOOSE.bind(this))
    })
  }


  CHOOSE (e){
    let self = e.target
    self.style.backgroundColor = 'blue';
  
    this.input.value = self.innerText
    this.DROP_DOWN_OFF()
    
    self.removeEventListener('click', this.CHOOSE.bind(this))
    return this.input.value
    
  }
  
  
  get INP_VAL () {
    return this.input.value
  }
  
  
  
  
}




document.querySelectorAll('.dropable').forEach(element => {
  let BOO = new INPUT_DROPER(element)
  BOO.alerted()
})



let SEND_INFO = (e)=> {
     e.preventDefault()
     let self = e.target
     console.log(self.email.value)
     console.log(self.firstname.value)
     console.log(self.service.value)
}

document.querySelector('form.sendDetails').addEventListener('submit', SEND_INFO)











































