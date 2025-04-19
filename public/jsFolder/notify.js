function showToastNoti(toastText, successStatus, submitBtn){
  // Insert Initial Button Text
  submitBtn.innerHTML = `<span class="bg-black text-white"><span>${submitBtn.initInnerText}</span></span>${submitBtn.initInnerText}`

  const toast = successStatus? document.querySelector('div.toastCon.success') : document.querySelector('div.toastCon.failure');
  toast.querySelector('span.notification').innerHTML = toastText
  toast.classList.remove('show1');
  toast.firstChild.innerHTML = toastText;
  const btnClose = toast.querySelector('.btn-close');
  btnClose.addEventListener('click', ()=>{
    toast.classList.add('show1');
    activateBtn(submitBtn);

  })
  toast.classList.add('bring_down')
  setTimeout(() => {
    toast.classList.remove('bring_down');

    // triggerBtn.disabled = false;
    // toast.classList.add('show')
  }, 2500);

  setTimeout(() => {

    activateBtn(submitBtn);
  }, 3200);

}

const putBtnInLoadingState = (btn, loading_text)=>{
  btn.initInnerText = btn.querySelector('span').outerText;
  btn.innerHTML = `<span class="spinner-grow spinner-grow-sm"></span> ${loading_text}`
  btn.disabled = true
}

const activateBtn = (btn)=>{
  // btn.innerHTML = `<span class="bg-black text-white"><span>${btn.initInnerText}</span></span>${btn.initInnerText}`
  btn.disabled = false;
}

window.showAlertOrder = showAlertOrder;
window.putButtonInLoadingState = putButtonInLoadingState;
window.activateBtn = activateBtn;
