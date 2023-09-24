

let menu_button = document.querySelector('.menu_button')
let box_nav_head = document.querySelector('.box_nav_head')
let closer_nav = document.querySelector('.closer_nav')

closer_nav.addEventListener('click', (e)=>{
  box_nav_head.classList.toggle('open')
})

menu_button.addEventListener('click', (e)=>{
  e.preventDefault()
  
  box_nav_head.classList.toggle('open')


})







