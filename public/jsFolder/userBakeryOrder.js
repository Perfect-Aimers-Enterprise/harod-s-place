const configBakery = {
    apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000'
      : `${window.location.protocol}//${window.location.hostname}`
  };

const bakeType = document.getElementById('bakeType')
const otherBakeType = document.getElementById('otherBakeType')
const bakeQuantity = document.getElementById('bakeQuantity')
const bakeDescription = document.getElementById('bakeDescription')
const bakeContact = document.getElementById('bakeContact')
const cancleBakeryPopUp = document.getElementById('cancleBakeryPopUp')
const bakeryPopUp = document.getElementById('bakeryPopUp')
const userOrderName = localStorage.getItem('userName')
const userOrderContact = localStorage.getItem('userPhone')
const userOrderEmail = localStorage.getItem('userEmail')
const token = localStorage.getItem('token')



const breadOrderForm = document.getElementById('breadOrderForm')

breadOrderForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const submitBtn = e.target.querySelector('button');
    if(!token){
        return alert("You have to Login to Place Orders")
    }
        const formData = new FormData(breadOrderForm)        
        formData.forEach((value, key)=>{
        formData[key] = value
    });


    try {
        putBtnInLoadingState(submitBtn, 'Processing')

        const response = await fetch(`${configBakery.apiUrl}/harolds/requestBakery`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok) throw new Error("Unable to place Order")

        showToastNoti("Order Placed Successfully", true, submitBtn)

        // bakeryPopUp.classList.remove('hidden')
        cancleBakeryPopUp.addEventListener('click', () => {
            bakeryPopUp.classList.add('hidden')
        })
    } catch (error) {
        console.log(error);
        showToastNoti("Unable to place Order", false, submitBtn)
    }

})