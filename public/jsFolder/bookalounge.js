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
    
    // const loungeType1 = document.getElementById('loungeType1').value
    // const loungeType2 = document.getElementById('loungeType2').value
    // const loungeType3 = document.getElementById('loungeType3').value
    // const loungeTypePrice1 = document.getElementById('loungeTypePrice1').value
    // const loungeTypePrice2 = document.getElementById('loungeTypePrice2').value
    // const loungeTypePrice3 = document.getElementById('loungeTypePrice3').value
    // const perpetualFeatures = document.getElementById('perpetualFeatures').value
    // const formData = {
    //     loungeType1,
    //     loungeType2,
    //     loungeType3,
    //     loungeTypePrice1,
    //     loungeTypePrice2,
    //     loungeTypePrice3,
    //     perpetualFeatures
    // }
    
    updateLoungeBookingFunc();
    // alert('Done with validation 3')

  })
const updateLoungeBookingFunc = async () => {
    let formData = {
        loungeTypes: [],
        loungeTypesPrices: [],
        haroldsFeatures:''
    };
    const nativeFormData = new FormData(loungeProductForm);
    nativeFormData.forEach((value, key)=>{

        if(key=='loungeTypes[]'){

            formData['loungeTypes'].push(value)
        }
        else if(key=='loungeTypesPrices[]'){
            formData['loungeTypesPrices'].push(value)
            
        }
        else{
            formData.haroldsFeatures = value;
        }
        });

        console.log(formData)

        const types = formData['loungeTypes'];
        const prices = formData['loungeTypesPrices'];
        const haroldsFeatures = formData['haroldsFeatures']


        let loungeDetails = [];

        for (let index = 0; index < types.length; index++) {
            loungeDetails[index] = {loungeType:types[index], loungeTypePrice:prices[index]}
            
        }

        console.log(loungeDetails);

        const body = {
            loungeTypesAndPrices : loungeDetails,
            haroldsFeatures
        }

        const btnCreateLounge = document.getElementById('uploadLoungeBtn') 
        const alertSuccess = document.getElementById('alert_menu_upload_success')
        const alertFailure = document.getElementById('alert_menu_upload_failure')

        btnCreateLounge.innerHTML = `<span class="spinner-grow spinner-grow-sm">
          </span> Loading`
        btnCreateLounge.disabled = true
    try {
        const response = await fetch(`${configg.apiUrl}/harolds/updateLoungeBookings`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
                
        
        if(!response.ok) {
            throw new Error("Unable to create lounge");
        } 
        showAlertLounge(alertSuccess, 'Lounge Created Sucessfully', btnCreateLounge)

        const data = await response.json()

        
    } catch (error) {
        showAlertLounge(alertFailure, 'Unable to Create Lounge', btnCreateLounge)

        
    }
    finally{
        btnCreateLounge.innerHTML = 'Upload Data'

    }
}

const loungBookingPopulateId = document.getElementById('loungBookingPopulateId')

const adminGetUserBookingFunc = async () => {
    loungBookingPopulateId.innerHTML = ''
    try {
        const response = await fetch(`${configg.apiUrl}/haroldsUser/getUserBookedLounge`)

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
        showAlertLounge(alertFailure, 'Unable to Fetch Booked Lounges')        
    }
}

const BtnLoungeAdder = document.getElementById('loungeAdderBtn');


let loungeCounter = 2;
BtnLoungeAdder.addEventListener('click', ()=>{
    const loungeContainer = document.getElementById('loungeContainer');
    const loungeMarkup = `
                  <div class="flex items-center justify-between gap-2">
                    <div class="w-full mt-1 border border-gray-300 rounded"><input required type="text" class="p-2 block w-full border border-gray-300 rounded" placeholder="Enter Lounge Type 1" name="loungeTypes[]" id="loungeType${loungeCounter}"></div>

                    <div class="w-full mt-1 border border-gray-300 rounded"><input required type="number" class="p-2 block w-full border border-gray-300 rounded" placeholder="Enter Lounge Price 1" name="loungeTypesPrices[]", id="loungeTypePrice${loungeCounter}"></div>
                </div>`
    ++loungeCounter;

    const containingLoungeDiv = document.createElement('div')
    containingLoungeDiv.innerHTML = loungeMarkup;
    loungeContainer.append(containingLoungeDiv);

})

function showAlertLounge(alert, alertText, triggerBtn){
    alert.classList.remove('show1');
    alert.firstElementChild.innerHTML = alertText;
    const btnClose = alert.querySelector('.btn-close');
    btnClose.addEventListener('click', ()=>{
        alert.classList.add('show1');
    })
    alert.classList.add('bring_down')
    setTimeout(() => {
        alert.classList.remove('bring_down');
        triggerBtn.disabled = false;
        
    }, 2500);

}

const validateFormElements = (form)=>{
    const elements = form.querySelectorAll('input, textarea');
    elements.forEach((element)=>{
        if(!(element.value.length>1)){
            console.log(element.value.length)
            element.setCustomValidity('This field can not be empty')
        }
        else{
            element.setCustomValidity('')
        }
        console.log(element.validationMessage);
        setTimeout(() => {
            element.reportValidity();
            
        }, 50);
    })
}