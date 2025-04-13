// config.js
const config2 = {
    apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000'
      : `${window.location.protocol}//${window.location.hostname}`
  };

  const navigationPopUp = document.getElementById('navigationPopUp')

  let debounceTimer;

document.addEventListener('DOMContentLoaded', ()=> {
    getAllMenuProductFunc()
    // fetchUserGallery()
   

    
})

let originalMenuItems;
const menuGridClass = document.querySelector('.menuGridClass');
const expandableMenuGridClass = document.querySelector('section.maximizable_menu_section .menuGridClass');
const searchInputs = document.querySelectorAll('div.searchHolder>input')

const refreshBtns = document.querySelectorAll('div.searchHolder button.refresh')

const notFoundMenuSearch = document.querySelectorAll('.menuSearchNotFound');

const loader = document.querySelector('.menu_loader');

const getAllMenuProductFunc = async () => {
    try {

        loader.classList.remove('hidden')
        const getAllMenuProductResponse = await fetch(`${config2.apiUrl}/harolds/product/getMenuProducts`);
        console.log(getAllMenuProductFunc)
        const data = await getAllMenuProductResponse.json();
        menuGridClass.innerHTML = '';        
        expandableMenuGridClass.innerHTML = '';        

        data.forEach((eachData) => {
            const eachDataId = eachData._id;

            let productContent = '';


            if (eachData.menuPrice && (!eachData.variations || eachData.variations.length === 0 || isAllVariationsInvalid(eachData.variations))) {
                
                productContent = `
                    <div class="border rounded-lg shadow-lg p-4 bg-white text-black menu-item" data-id="${eachDataId}">
                        <img src="${eachData.menuImage}" alt="${eachData.menuProductName}" class="w-full h-48 object-cover rounded">
                        <h3 class="mt-4 text-xl font-semibold">${eachData.menuProductName}</h3>
                        <p class="text-gray-600">${eachData.menuDescription}</p>
                        <p class="mt-2 text-orange-700 font-bold">₦${eachData.menuPrice}</p>
                        <button id="orderNowButton" class="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 w-full text-sm animatedBtn1"><span class="bg-black text-white"><span>ORDER NOW</span></span>ORDER NOW</button>
                    </div>
                `;
            } else if (eachData.variations && eachData.variations.length > 0) {
                 // Show the price of the first variation
                 const firstVariationPrice = eachData.variations[0].price;

                 productContent = `
                     <div class="border rounded-lg shadow-lg p-4 bg-white text-black menu-item" data-id="${eachDataId}">
                         <img src="${eachData.menuImage}" alt="${eachData.menuProductName}" class="w-full h-48 object-cover rounded">
                         <h3 class="mt-4 text-xl font-semibold">${eachData.menuProductName}</h3>
                         <p class="text-gray-600">${eachData.menuDescription}</p>
                         <p class="mt-2 text-orange-700 font-bold">₦${firstVariationPrice}</p>
                         <button id="orderNowButton" class="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 w-full text-sm animatedBtn1"><span class="bg-black text-white"><span>ORDER NOW</span></span>ORDER NOW</button>
                     </div>
                 `;
            }

            // Append the product content to the menu grid
            menuGridClass.innerHTML += productContent;
            expandableMenuGridClass.innerHTML += productContent;
        });

        originalMenuItems = Array.from(menuGridClass.children);

        setTimeout(() => {
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach((item) => {
                item.classList.add('visible');
            });
        }, 100);
        
        const orderNowButton = document.querySelectorAll('#orderNowButton');
        
        orderNowButton.forEach((eachOrderNowButton) => {
            eachOrderNowButton.addEventListener('click', (e) => {
                const token = localStorage.getItem('token');
                if (!token) {
                //    alert('Please Register an Account')
                navigationPopUp.classList.remove('hidden')
                   return
                }
                const menuProductId = e.target.closest('.menu-item').dataset.id;
                fetchSingleProductFunc(menuProductId);
            });
        });

    } catch (error) {
        throw error;
    }
    finally{
        loader.classList.add('hidden');
    }

};



const fetchSingleProductFunc = async (menuProductId) => {

  
    try {
      const fetchSingleProductResponse = await fetch(`${config2.apiUrl}/harolds/product/getSingleMenuProduct/${menuProductId}`)  
      const data = await fetchSingleProductResponse.json()
      const menuProductOrderImage = data.menuImage
      const menuProductOrderName = data.menuProductName
      const menuProductOrderDescription = data.menuDescription
      const menuProductOrderPrice = data.menuPrice
      const menuProductVariations = data.variations || []; // Check if variations exist

      localStorage.setItem('menuProductOrderImage', menuProductOrderImage)
      localStorage.setItem('menuProductOrderName', menuProductOrderName)
      localStorage.setItem('menuProductOrderDescription', menuProductOrderDescription)
      localStorage.setItem('menuProductOrderPrice', menuProductOrderPrice)
      localStorage.setItem('menuProductVariations', JSON.stringify(menuProductVariations));

      window.location.href = '../htmlFolder/orderDetailsPage.html'

    } catch (error) {
        throw error      
    }}



const escapeSpecialChars = (input)=>{
    return input.replace(/[.*&^?$+\[\|\\](){}]/g, '\\$&')
}


// This function searches the menu and returns the result
const searchMenu = (element, index)=>{

    const inputElement = element;
    const menuGrid = inputElement.closest('div.searchTab').nextElementSibling.nextElementSibling;

    // console.log(menuGrid)

    let inputText = inputElement.value.trim();
    if(inputText==''){
        return cancelSearch(element);
    }
    inputText = escapeSpecialChars(inputText)

    let menuItems = originalMenuItems;

    const regex = new RegExp(inputText, 'i')

    menuGrid.innerHTML = ''
    let filteredItems = menuItems.filter((item)=> {
        return regex.test(item.querySelector('h3').textContent);
    })

    if(filteredItems.length<=0) {
        menuGrid.classList.add('hidden')
        return notFoundMenuSearch.forEach(element => {
        element.classList.remove('hidden')
    })
}


else {
    notFoundMenuSearch.forEach(element => {
        element.classList.add('hidden')
    });

    menuGrid.classList.remove('hidden')

    filteredItems = filteredItems.map((item)=> item.cloneNode(true));

    menuGrid.append(...filteredItems)

}
}

const cancelSearch = (element)=>{
    const inputElement = element;

    notFoundMenuSearch.forEach(element => {
        element.classList.add('hidden')
    });
    inputElement.closest('div.searchTab').nextElementSibling.nextElementSibling.innerHTML = '';
    inputElement.closest('div.searchTab').nextElementSibling.nextElementSibling.append(...originalMenuItems.map((items)=>items.cloneNode(true)));
    inputElement.closest('div.searchTab').nextElementSibling.nextElementSibling.classList.remove('hidden');
}

const refreshMenu = async(element)=>{
    const siblingInputElement = element.parentElement.querySelector('input')
    await getAllMenuProductFunc();
    searchMenu(siblingInputElement)
}


searchInputs.forEach((searchInput, index, array)=>{
    searchInput.addEventListener('input', (e)=>{

        let nextIndex = index==0? 1 : 0;
        array[nextIndex].value = searchInput.value;
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            searchMenu(e.target, index) 
            searchMenu(array[nextIndex], nextIndex) 


        }, 500);
    })
})

refreshBtns.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
    refreshMenu(btn);
})
})

function isAllVariationsInvalid(variations) {
    return variations.every((variation) => !variation.size || variation.price === null);
  }