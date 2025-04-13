function showAlertOrder(alert, alertText){
  alert.classList.remove('show1');
  alert.firstChild.innerHTML = alertText;
  const btnClose = alert.querySelector('.btn-close');
  btnClose.addEventListener('click', ()=>{
    alert.classList.add('show');

  })
  alert.classList.add('bring_down')
  setTimeout(() => {
    alert.classList.remove('bring_down');
    // triggerBtn.disabled = false;
    // alert.classList.add('show')
    
  }, 2500);

}

const putButtonInLoadingState = (btn, loading_text)=>{
          btn.innerHTML = `<span class="spinner-grow spinner-grow-sm"></span> ${loading_text}`
        btn.disabled = true
}

const removeBtnFromLoadingState = (btn, btn_text)=>{
  btn.innerHTML = btn_text;
  btn.disabled = false;
}

window.showAlertOrder = showAlertOrder;
window.putButtonInLoadingState = putButtonInLoadingState;
window.removeBtnFromLoadingState = removeBtnFromLoadingState;
