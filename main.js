let script_content = document.getElementById('box_script_text_content')
let switch_script = document.getElementById('switch_script')




switch_script.addEventListener('click', (e)=>{
  e.preventDefault()
  
  
  script_content.classList.toggle('open')
  
})
