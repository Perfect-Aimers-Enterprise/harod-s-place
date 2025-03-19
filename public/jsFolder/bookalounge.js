const configg = {
    apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000'
      : `${window.location.protocol}//${window.location.hostname}`
  };

  document.addEventListener('DOMContentLoaded', () => {
    adminGetUserBookingFunc()
  })

  const loungeProductForm = document.getElementById('loungeProductForm')

  loungeProductForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const loungeType1 = document.getElementById('loungeType1').value
    const loungeType2 = document.getElementById('loungeType2').value
    const loungeType3 = document.getElementById('loungeType3').value
    const loungeTypePrice1 = document.getElementById('loungeTypePrice1').value
    const loungeTypePrice2 = document.getElementById('loungeTypePrice2').value
    const loungeTypePrice3 = document.getElementById('loungeTypePrice3').value
    const perpetualFeatures = document.getElementById('perpetualFeatures').value
    const formData = {
        loungeType1,
        loungeType2,
        loungeType3,
        loungeTypePrice1,
        loungeTypePrice2,
        loungeTypePrice3,
        perpetualFeatures
    }
    updateLoungeBookingFunc(formData)

  })
const updateLoungeBookingFunc = async (formData) => {
    try {
        const response = await fetch(`${configg.apiUrl}/perpetualtaste/updateLoungeBookings`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        console.log('Lounge FormData', formData);
        console.log('Lounge Response', response);
        
        

        if(!response.ok) {
            alert('Failed to Create Lounge Booking Data')
        } 

        const data = await response.json()

        alert(data.message)
        
    } catch (error) {
        console.log(error);
        
    }
}

const loungBookingPopulateId = document.getElementById('loungBookingPopulateId')

const adminGetUserBookingFunc = async () => {
    loungBookingPopulateId.innerHTML = ''
    try {
        const response = await fetch(`${configg.apiUrl}/perpetualtasteuser/getUserBookedLounge`)

        console.log(response);
        
        const data = await response.json()

        const getLoungeBookingsData = data.getLoungeBookings
        
        

        getLoungeBookingsData.forEach((eachData) => {
            console.log(eachData);
            
            const populateEachData = `
                <div class="border rounded-lg shadow-md p-4 mt-[10px]">
                <div class="flex items-center justify-between">
                <div class="">
                  <h4 class="font-semibold">${eachData.userBookingName}</h4>
                  <p class="text-sm text-gray-600">${eachData.loungeType}</p>
                  <p class="text-sm text-gray-600">${eachData.eventDate}</p>
                  <p class="text-sm text-gray-600">${eachData.eventTime}</p>
                </div>
  
                <div class="">
                    <div>
                    <a class="text-blue-500 underline" href="tel:+234${eachData.bookingContact}">Tel No: ${eachData.userBookingTel}</a>
                    </div>
                    <div>
                    <a class="text-blue-500 underline" href="tel:+234${eachData.bookingContact}">Booking No: ${eachData.bookingContact}</a>
                    </div>
                    <div>
                    <a class="text-orange-600 underline" href="mailto:${eachData.userBookingMail}">${eachData.userBookingMail}</a>
                    </div>
                </div>
    
                <div>
                    <p>${eachData.eventName}</p>
                    <p>${eachData.eventType}</p>
                    <p>${eachData.numberOfGuest}</p>
                </div>
                </div>

                <div class="text-center text-[10px] md:text-[12px] overflow-x-scroll border-[1px] border-gray-400 p-[3px]">
                <p>${eachData.eventMessage}</p>
                </div>
                </div>
            </div>
            `

            loungBookingPopulateId.innerHTML += populateEachData
        })
        
    } catch (error) {
        console.log(error);
        
    }
}