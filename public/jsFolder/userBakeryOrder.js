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


const breadOrderForm = document.getElementById('breadOrderForm')

breadOrderForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log("Ordering bread")

    const formData = {
        bakeType: bakeType.value,
        otherBakeType: otherBakeType.value,
        bakeQuantity: parseInt(bakeQuantity.value),
        bakeDescription: bakeDescription.value,
        bakeContact: parseInt(bakeContact.value),
        userOrderName,
        userOrderContact,
        userOrderEmail
    }

    try {
        const response = await fetch(`${configBakery.apiUrl}/harolds/requestBakery`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        bakeryPopUp.classList.remove('hidden')
        cancleBakeryPopUp.addEventListener('click', () => {
            bakeryPopUp.classList.add('hidden')
        })
    } catch (error) {
        console.log(error);
    }
})