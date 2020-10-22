class Handler{
  constructor(){
      M.AutoInit();
      //$('.action').on('click', this._handleAction)
  }
  _handleAction(e){
    console.log($(`#${$(e.target).attr('id')}.modal`))
    M.updateTextFields();
    //$(`#${$(e.target).attr('id')}.modal`).modal('open')
  }

}

export default new Handler();
