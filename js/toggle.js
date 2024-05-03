
function toggle(selector){
  let button = document.querySelector(selector)
  if(!button.classList.contains('is-toggle')){
    turnOffPreviousButton()
    button.classList.add('is-toggle')
  } else{
    button.classList.remove('is-toggle')
  }
}

function turnOffPreviousButton(){
  let previousButton = document.querySelector('.is-toggle')
  if(previousButton){
    previousButton.classList.remove('is-toggle')
  }
}