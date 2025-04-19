// config.js
const configBookings = {
    apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000'
      : `${window.location.protocol}//${window.location.hostname}`
  };

document.addEventListener('DOMContentLoaded', ()=> {
  fetchLoungeDetailsFunc()
})

const fetchLoungeDetailsFunc = async () => {
    try {
        const response = await fetch(`${configBookings.apiUrl}/harolds/getLoungeBookings`)
        const data = await response.json()
        insertLoungeDetailsinForm(data);
        addEventListeners2CustomSelect();
        
        
        
    } catch (error) {
        throw new Error("Unable to retrieve lounge details");
        
    }
  }

const sendBookingDiv = document.getElementById('sendBookingDiv')
const loungePopUp = document.getElementById('loungePopUp')
const cancleLoungePopUp = document.getElementById('cancleLoungePopUp')

// const populateLoungeBookingFormData = (loungeType1, loungeType2, loungeType3, loungeTypePrice1, loungeTypePrice2, loungeTypePrice3, haroldsFeatures) => {
    
//     sendBookingDiv.innerHTML = ''

//     const populateLoungeBookingForm = `
//         <form id="sendBookingForm" class="mt-6 max-w-lg mx-auto space-y-4">
//             <div>
//               <label for="eventName" class="block text-sm font-medium">Event Name</label>
//               <input type="text" id="eventName" name="eventName" class="w-full border rounded px-3 py-2">
//             </div>

//             <div>
//               <label for="numberOfGuest" class="block text-sm font-medium">Number of Guest</label>
//               <input type="text" id="numberOfGuest" name="numberOfGuest" class="w-full border rounded px-3 py-2">
//             </div>
    
//             <div>
//               <label for="loungeType" class="block text-sm font-medium">Lounge Type</label>
//               <select name="loungeType" id="loungeType" class="py-2 pl-10 text-sm text-gray-700 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200">
//                 <option value="" disabled selected>Select Event Type</option>
//                 <option value="${loungeType1} &#8358;${loungeTypePrice1}">${loungeType1} &#8358;${loungeTypePrice1}</option>
//                 <option value="${loungeType2} &#8358;${loungeTypePrice2}">${loungeType2} &#8358;${loungeTypePrice2}</option>
//                 <option value="${loungeType3} &#8358;${loungeTypePrice3}">${loungeType3} &#8358;${loungeTypePrice3}</option>
//               </select>
//             </div>

//             <div>
//               <label for="eventType" class="block text-sm font-medium">Event Type</label>
//               <input type="text" id="eventType" name="eventType" class="w-full border rounded px-3 py-2">
//             </div>

//             <div>
//               <label for="eventDate" class="block text-sm font-medium">Event Date</label>
//               <input type="date" id="eventDate" name="eventDate" class="w-full border rounded px-3 py-2">
//             </div>

//             <div>
//               <label for="eventTime" class="block text-sm font-medium">Event Time <span class="text-[10px] md:text-[12px]">(Click on the Clock Icon to Select)</span></label>
//               <input type="time" id="eventTime" name="eventTime" class="w-full border rounded px-3 py-2">
//             </div>

//             <div>
//               <label for="bookingContact" class="block text-sm font-medium">Booking Contact</label>
//               <input type="number" id="bookingContact" name="bookingContact" class="w-full border rounded px-3 py-2">
//             </div>
    
//             <div>
//               <label for="eventMessage" class="block text-sm font-medium">Message (For Additional Request)</label>
//               <textarea id="eventMessage" name="eventMessage" rows="4" class="w-full border rounded px-3 py-2"></textarea>
//             </div>

//             <div class="mb-[10px] font-thin italic text-[12px] md:text-[14px] lg:text-[16px]">
//               <p id="truncateText">${haroldsFeatures}</p>

//               <p id="readMoreTruncate" class="text-orange-600 cursor-pointer">Read More</p>
//             </div>
//             <button type="submit" class="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 w-full mt-[10px]">Book</button>
//         </form>
//             `

//     sendBookingDiv.innerHTML = populateLoungeBookingForm 
    
//     // Truncate Text Display 
//     const truncateText = document.getElementById('truncateText')
//     const readMoreTruncate = document.getElementById('readMoreTruncate')
//     const originalText = truncateText.textContent
//     const truncatedText = originalText.substring(0, 120) + '...'

//     truncateText.textContent = truncatedText

//     readMoreTruncate.addEventListener('click', () => {
//     if (readMoreTruncate.textContent === 'Read More') {
//         readMoreTruncate.textContent = ''
//         truncateText.textContent = originalText
//         readMoreTruncate.textContent = 'Read Less'
//     } else {
//         readMoreTruncate.textContent = 'Read More'
//         truncateText.textContent = truncatedText
//     }
//     })


//         const userBookingMail = localStorage.getItem('userEmail')
//         const userBookingTel = parseFloat(localStorage.getItem('userPhone'))
//         const userBookingName = localStorage.getItem('userName')
//         const numberOfGuest = document.getElementById('numberOfGuest')
//         const loungeType = document.getElementById('loungeType')
//         const eventType = document.getElementById('eventType')
//         const eventName = document.getElementById('eventName')
//         const bookingContact = document.getElementById('bookingContact')
//         const eventMessage = document.getElementById('eventMessage')
//         const eventTime = document.getElementById('eventTime')
//         const eventDate = document.getElementById('eventDate')
        

//         document.getElementById('sendBookingForm').addEventListener('submit', (e) => {
//             e.preventDefault()

//             const formData = {
//                 userBookingMail,
//                 userBookingTel,
//                 userBookingName,
//                 numberOfGuest: numberOfGuest.value,
//                 loungeType: loungeType.value,
//                 eventType: eventType.value,
//                 eventName: eventName.value,
//                 bookingContact: parseInt(bookingContact.value),
//                 eventMessage: eventMessage.value,
//                 eventTime: eventTime.value,
//                 eventDate: eventDate.value

//             }

//             executeLoungeBookingFunc(formData)

//             numberOfGuest.value = ''
//             numberOfGuest.value = ''
//             eventType.value = ''
//             eventName.value = ''
//             bookingContact.value = ''
//             eventMessage.value = ''

//             loungePopUp.classList.remove('hidden')

//             cancleLoungePopUp.addEventListener('click', () => {
//                 loungePopUp.classList.add('hidden')
//             })

//         })
// }

const insertLoungeDetailsinForm = (loungeDetails)=>{
    const { loungeTypesAndPrices, haroldsFeatures } = loungeDetails;
  let nativeLoungeOptionElements = loungeTypesAndPrices.map((typeAndPrice)=>{
    const {loungeType, loungeTypePrice} = typeAndPrice;
    return(
      `<option value="${loungeType} &#8358;${loungeTypePrice}">${loungeType} &#8358;${loungeTypePrice}</option>`
    )
  }).join('');
  nativeLoungeOptionElements = `<option value="" disabled selected>Select Event Type</option>` + nativeLoungeOptionElements;

  const customLoungeOptionElements = loungeTypesAndPrices.map((typeAndPrice)=>{
    const {loungeType, loungeTypePrice} = typeAndPrice;
    return(
      `<li>${loungeType} &#8358;${loungeTypePrice}</li>`
    )
  }).join('')

  const loungeSelector = document.getElementById('loungeSelector');
  loungeSelector.innerHTML = nativeLoungeOptionElements;  document.getElementById('custom_lounge_selector_container').innerHTML = customLoungeOptionElements;
  const truncateText = document.getElementById('truncateText');
  truncateText.innerHTML = haroldsFeatures;


      // Truncate Text Display 
    const readMoreTruncate = document.getElementById('readMoreTruncate')
    const originalText = truncateText.textContent
    const truncatedText = originalText.substring(0, 120) + '...'

    truncateText.textContent = truncatedText

    readMoreTruncate.addEventListener('click', () => {
    if (readMoreTruncate.textContent === 'Read More') {
        readMoreTruncate.textContent = ''
        truncateText.textContent = originalText
        readMoreTruncate.textContent = 'Read Less'
    } else {
        readMoreTruncate.textContent = 'Read More'
        truncateText.textContent = truncatedText
    }
    })

}

const addEventListeners2CustomSelect = ()=>{
    // Custom Dropdown Element

const customSelectElement = document.querySelectorAll('div.custom-select');
const chosenOptionElement = document.querySelector('.custom-select div.chosen');
const optionHolderElement = document.querySelector('.custom-select ul')
// const customSelectElement = document.querySelector('div.custom-select')


customSelectElement.forEach((element)=>{

    element.addEventListener('click', ()=>{
        element.focus()
    })
    element.addEventListener('blur', ()=>{
        element.classList.remove('open')
    })

    element.addEventListener('focus', (e)=>{
    const rect = chosenOptionElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if(spaceAbove>chosenOptionElement.offsetHeight && spaceAbove>spaceBelow){
        // Display Above
        optionHolderElement.style.bottom = 'calc(100% + 3px)';
    }
    else{
        // Display Below
        optionHolderElement.style.top = 'calc(100% + 3px)';
    }
    const parentCustomSelect = e.target.closest('div.custom-select');
    parentCustomSelect.classList.toggle('open')})
})


    // codes that make the custom select functionality map with those of an actual in built select element

let allCustomSelectElements = document.querySelectorAll('.custom-select');

allCustomSelectElements.forEach((customSelect)=>{
    const customSelectOptions = customSelect.querySelectorAll('ul>li');
    // customSelectOptions.addEventListener("click", ()=>{
    //     console.log("first")
    // })
    customSelectOptions.forEach((option)=>{
        option.addEventListener('click', (e)=>{
            e.stopPropagation();
            const chosenListItem = e.target;
            const chosenListItemDisplay = e.target.closest('ul').previousElementSibling;
            let nativeSelectElementOptions = e.target.closest('.custom-select').nextElementSibling.querySelectorAll('select option') || e.target.closest('.custom-select').nextElementSibling.querySelectorAll('option');
            // let selectelementOptions = nativeSelectElementOptions.querySelectorAll('option');
            nativeSelectElementOptions = Array.from(nativeSelectElementOptions);
            // let selectedOption = nativeSelectElementOptions.find(option=>chosenListItem.innerHTML==option.innerHTML);
            nativeSelectElementOptions.forEach((nativeOption)=>{
                nativeOption = nativeOption.querySelector('span.value') ||  nativeOption;
                const nativeOptionText = nativeOption.textContent;
                nativeOption.selected = option.querySelector('span.value')? nativeOptionText == option.querySelector('span.value').textContent : nativeOptionText === option.textContent;
                if(nativeOption.selected===true){
                    chosenListItemDisplay.innerHTML = nativeOptionText;
                }
                if (nativeOption.selected) {
                    nativeOption.setAttribute('selected', 'selected');
                }
                else {
                    nativeOption.removeAttribute('selected');
                }    
            })
            const containingCustomSelectElement = e.target.closest('.custom-select')
            containingCustomSelectElement.blur();

        }
 )
    })
})

}


document.getElementById('sendBookingForm').addEventListener('submit', async (e) => {
    e.preventDefault()

    const submitBtn = e.target.querySelector('button')

    const userBookingEmail = localStorage.getItem('userEmail')
    const userBookingTel = parseFloat(localStorage.getItem('userPhone'))
    const userBookingName = localStorage.getItem('userName');
    const token = localStorage.getItem('token')

    if(!token){
        return alert('You have to Login to Book a Lounge')
    }

    let formData = {
        userBookingEmail,
        userBookingTel,
        userBookingName,
    }

    new FormData(document.getElementById('sendBookingForm')).forEach((value, key)=>{
        formData[key] = value
    });

    try {
        putBtnInLoadingState(submitBtn, 'Processing', submitBtn)
        await executeLoungeBookingFunc(formData)
        showToastNoti('Lounge Booked Successfully', true)
        
    } catch (error) {
        console.log('An Error occured when booking the lounge!');
        showToastNoti('Unable to Book Lounge', false)
    }

    finally{
        e.target.reset();
        // loungePopUp.classList.remove('hidden')
        cancleLoungePopUp.addEventListener('click', () => {
            loungePopUp.classList.add('hidden')
        })
    }



})


const executeLoungeBookingFunc = async (formData) => {
    try {
        const response = await fetch(`${configBookings.apiUrl}/haroldsUser/executeLoungeBooking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if(!response==200) throw new Error("Unable to Book a Lounge!");

        const data = await response.json()
        
    } catch (error) {
        throw new Error("Unabale to book Lounge");
        
    }
}
