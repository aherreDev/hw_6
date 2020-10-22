import Handler from './models/Handler.js'
import Product from './models/Product.js'
import Inventory from './models/Inventory.js'

window.onload = () =>{
  $(document).ready(function(){
    M.AutoInit();
    $('input, textarea').on('focus',(e)=>{
      console.log()
      $(`label[for="${e.target.id}"]`).addClass("active")
    })
    $('input, textarea').on('blur',(e)=>{
      if(e.target.value) return null
      $(`label[for="${e.target.id}"]`).removeClass("active")
    })
    new Inventory();
  });
}


