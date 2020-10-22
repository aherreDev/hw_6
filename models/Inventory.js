import Product from './Product.js'

class Inventory{
  constructor(){
    $('#add_form').on('submit',(e) => this.addNewProduct(e))
    $('#delete_form').on('submit',(e) => this.removeProduct(e))
    $('#search_form').on('submit',(e) => this.getProduct(e))
    $('.sort').on('click',(e) => this.getSortedProducts(e.target.id === 'mget_1'))
    this.products = new Array(20)
    this.totalProductos = 0
  }
  addNewProduct(e){
    e.preventDefault();
    let serializeData = $(e.target).serializeArray()
    $(e.target).trigger("reset")
    let closeBtn = $('#add_modal_close')
    if(this.totalProductos === 20) {
      M.toast({html: 'No space free'})
      return this.closeModal(closeBtn)
    }
    let productAdded = false
    for(let i = 0; i < this.products.length && !productAdded; i++){
      if(!this.products[i]){
        this.products[i] = new Product(serializeData[0].value,
          serializeData[1].value,
          serializeData[2].value,
          serializeData[3].value,
          serializeData[4].value
        )
        productAdded = true
        this.totalProductos++
      }
    }
    this.refreshUI(this.products)
    this.closeModal(closeBtn)
  }
  removeProduct(e){
    e.preventDefault()
    let serializeData = $(e.target).serializeArray()
    $(e.target).trigger("reset")
    let closeBtn = $('#delete_modal_close')
    let productRemoved = false
    for(let i = 0; i < this.products.length && !productRemoved; i++){
      if(this.products[i]){
        if(this.products[i].code === serializeData[0].value){
          this.products[i]  = undefined
          productRemoved = true
          this.totalProductos--
        }
      }
    }
    if(!productRemoved){
      M.toast({html: 'Product not found'})
    } else{
      this.refreshUI(this.products)
    }
    this.closeModal(closeBtn)
  }
  getProduct(e){
    e.preventDefault()
    let serializeData = $(e.target).serializeArray()
    $(e.target).trigger("reset")
    let closeBtn = $('#search_modal_close')
    let productFound = false
    for(let i = 0; i < this.products.length && !productFound; i++){
      if(this.products[i]){
        if(this.products[i].code === serializeData[0].value){
          productFound = this.products[i]
        }
      }
    }
    if(!productFound){
      M.toast({html: 'Product not found'})
    } else{
      this.refreshUI([productFound])
    }
    this.closeModal(closeBtn)
  }
  getSortedProducts(asc){
    if(this.totalProductos === 0){
      M.toast({html: 'The inventory is empty'})
      return false
    }
    let sortedProducts = new Array(this.products.length)
    if(asc){
      sortedProducts = this.products
    }else{
      for(let i = this.products.length - 1, e = 0; i >= 0; i--, e++){
        sortedProducts[e] = this.products[i]
      }
    }
    this.refreshUI(sortedProducts)
  }
  closeModal(closeBtn){
    closeBtn.click()
  }
  refreshUI(products){
    let productsHtml = products.filter(p=>typeof p === 'object').map(p => this.getCard(p.code,p.name,p.description,p.totalPrice))
    $('#products_list > div').remove()
    $('#products_list').append(productsHtml)
  }
  getCard(code, name, description, totalPrice){
    return `<div class="col s4">
              <div class="card">
                <div class="card-stacked">
                  <div class="card-content">
                    <strong class="is-size-3">${name}</strong>
                    <p>${description}</p>
                    <div>Code: <strong>${code}</strong></div>
                  </div>
                  <div class="card-action">
                    <a href="#">Total price: $${totalPrice}</a>
                  </div>
                </div>
              </div>
            </div>`
  }
}

export default Inventory
