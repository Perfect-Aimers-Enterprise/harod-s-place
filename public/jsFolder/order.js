const config = {
  apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : `${window.location.protocol}//${window.location.hostname}`
};

    const alertSuccess = document.getElementById('alert_menu_upload_success')
    const alertFailure = document.getElementById('alert_menu_upload_failure')

document.addEventListener('DOMContentLoaded', () => {
    getMenuProductFunc()
    fetchAllOrders()
    fetTotalOrderIncome()
    countPendingOrdersFunc()
    countRegisteredUsers()
    getWeeklyGrowthFunc()
    getAllUserMessageFunc()
    // getAdminMenuLandingFunc()
    // getAllSpecialImagesFunc()
    fetchGallery();
    getAllDailyMenus()
    fetchAllUserBakeryBookings()
})

// All Api URL Testing
// 
const getMenuProductFuncUrl = `${config.apiUrl}/harolds/product/getMenuProducts`
const menuProductFormUrl = `${config.apiUrl}/harolds/product/createMenuProduct`

// All Api URL Development
// const menuProductFormUrl = '/harolds/product/createMenuProduct'
// const getMenuProductFuncUrl = '/harolds/product/getMenuProducts'

const menuProductForm = document.getElementById('menuProductForm')
const menuProductList = document.getElementById('menuProductList')

menuProductForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let menuProductTarget = e.target

    const formData = new FormData(menuProductTarget)
    const menuUploadBtn = document.getElementById('menuUploadBtn')


    formData.forEach((value, key) => {
    });
    
    try {

        putButtonInLoadingState(menuUploadBtn)

        const createMenuProduct = await fetch(`${config.apiUrl}/harolds/product/createMenuProduct`, {
            method: 'POST',
            body: formData
        })        

        if (createMenuProduct.ok) {
          showAlertOrder(alertSuccess, "Product Uploaded Successfully")
          
          getMenuProductFunc(); // Refresh product list
        } else {
          throw new Error('Unable to upload product')
        }

        const data = await createMenuProduct.json()        
    } catch (error) {
        showAlertOrder(alertFailure, 'Unable to Upload Product');        
    }
    finally{
      removeBtnFromLoadingState(menuUploadBtn, 'Upload Product')

    }
})

// getMenuProducts
// getMenuProducts
const getMenuProductFunc = async (e) => {
    const getMenuProductsResponse = await fetch(getMenuProductFuncUrl);

    const data = await getMenuProductsResponse.json();
    menuProductList.innerHTML = '';

    data.forEach((eachData) => {
      const menuProductId = eachData._id;
      let productContent = '';

      // Check if product has price or variations
      if (eachData.menuPrice && (!eachData.variations || eachData.variations.length === 0 || isAllVariationsInvalid(eachData.variations))) {
        // Display product with price
        productContent = `
          <div class="flex items-center justify-between border rounded-lg shadow-md p-4 menuProductEach" data-id="${menuProductId}">
            <div class="flex items-center space-x-4">
              <img src="${eachData.menuImage}" alt="${eachData.menuProductName}" class="w-16 h-16 object-cover rounded">
              <div>
                <h4 class="font-semibold">${eachData.menuProductName}</h4>
                <p class="text-sm text-gray-600">₦${eachData.menuPrice}</p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button class="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 editButton" data-id="${menuProductId}">
                <p class="hidden md:block">Edit</p>
                <i class="fas fa-pencil-alt md:hidden"></i>
              </button>
              <button class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 deleteButton" data-id="${menuProductId}">
                <p class="hidden md:block">Delete</p>
                <i class="fas fa-trash md:hidden"></i>
              </button>
            </div>
          </div>
        `;
      } else if (eachData.variations && eachData.variations.length > 0) {

        
        // Display product with variations
        let variationsContent = '';
        eachData.variations.forEach((variation) => {
          variationsContent += `
            <div class="flex items-center space-x-4 mb-2">
              <p class="text-sm text-gray-600">${variation.size} - ₦${variation.price}</p>
            </div>
          `;
        });

        productContent = `
          <div class="flex items-center justify-between border rounded-lg shadow-md p-4 menuProductEach" data-id="${menuProductId}">
            <div class="flex items-center space-x-4">
              <img src="${eachData.menuImage}" alt="${eachData.menuProductName}" class="w-16 h-16 object-cover rounded">
              <div>
                <h4 class="font-semibold">${eachData.menuProductName}</h4>
                <div class="text-sm text-gray-600">
                  ${variationsContent}
                </div>
              </div>
            </div>
            <div class="flex space-x-2">
              <button class="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 editButton" data-id="${menuProductId}">
                <p class="hidden md:block">Edit</p>
                <i class="fas fa-pencil-alt md:hidden"></i>
              </button>
              <button class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 deleteButton" data-id="${menuProductId}">
                <p class="hidden md:block">Delete</p>
                <i class="fas fa-trash md:hidden"></i>
              </button>
            </div>
          </div>
        `;
      }

      // Append the product content to the product list
      menuProductList.innerHTML += productContent;
    });

    attachEditEventListeners();
    
};


// Helper function to check if all variations are invalid
function isAllVariationsInvalid(variations) {
  return variations.every((variation) => !variation.size || variation.price === null);
}


const attachEditEventListeners = () => {

  // Edit Listener Section 
  const editButton = document.querySelectorAll('.editButton')
  editButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      const menuProductId = e.target.closest('.editButton').dataset.id

      console.log(menuProductId);
      
      fetchSingleProductFunc(menuProductId, button) 
    })
  })

  // Delete Listener Section 
  const deleteButton = document.querySelectorAll('.deleteButton')
  deleteButton.forEach((button) => {
    button.addEventListener('click', (e) => {
      const menuProductId = e.target.closest('.menuProductEach').dataset.id

      deleteSingleProductFunc(menuProductId, button)
    })
  })


}

const fetchSingleProductFunc = async (menuProductId, button) => {

  try {
    putButtonInLoadingState(button)

    const fetchSingleProductResponse = await fetch(`${config.apiUrl}/harolds/product/getSingleMenuProduct/${menuProductId}`)

    const data = await fetchSingleProductResponse.json()
    const menuPopUpSection = document.getElementById('menuPopUpSection')
    menuPopUpSection.classList.remove('hidden')

    const menuPopUpDiv = document.getElementById('menuPopUpDiv')
    menuPopUpDiv.innerHTML = ""
  
  
    const editEachProduct = `
      <div id="closeMenuPopUp" class="text-red-500 flex items-center font-bold">
          <div><i class="fas fa-times"></i></div>
            <p>close</p>
          </div>
      <h2 class="text-xl font-bold mb-4 text-center mt-[10px]">Edit Menu Products</h2>

      <form id="editMenuProductForm"  class="space-y-4 border-b pb-6 mb-6 text-black">
                <div class="eachEditMenuProductDiv">
                  <label for="menuName" class="block text-sm font-medium ">${data.menuProductName}</label>
                  <input
                    required
                    type="text"
                    id="menuName"
                    value="${data.menuProductName}"
                    name="menuName"
                    class="mt-1 p-2 block w-full border border-gray-300 rounded"
                    placeholder="Enter new product name"
                  />
                </div>
            
                <div>
                  <label for="menuProductDescription" class="block text-sm font-medium ">${data.menuDescription}</label>
                  <textarea
                    id="menuProductDescription"
                    name="menuProductDescription"
                    class="mt-1 p-2 block w-full border border-gray-300 rounded"
                    rows="3"
                    placeholder="Enter new product description"
                  >${data.menuDescription}</textarea>
                </div>
            
                <div>
                  <label for="menuProductPrice" class="block text-sm font-medium ">₦${data.menuPrice}</label>
                  <input
                    required
                    type="number"
                    id="menuProductPrice"
                    name="menuProductPrice"
                    value="${data.menuPrice}"
                    class="mt-1 p-2 block w-full border border-gray-300 rounded"
                    placeholder="Enter new product price"
                  />
                </div>
            
                <button
                  type="submit"
                  class="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full submit"
                >
                  Upload Product
                </button>
                
              </form>
    `;
    menuPopUpDiv.innerHTML = editEachProduct

    const closeMenuPopUp = document.getElementById('closeMenuPopUp')

    closeMenuPopUp.addEventListener('click', () => {
      menuPopUpSection.classList.add('hidden')
    })

    // Edit Listener Section 
    const editMenuProductForm = document.getElementById('editMenuProductForm', button)
    editMenuProductForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      const menuName = document.getElementById('menuName').value;
      const menuProductDescription = document.getElementById('menuProductDescription').value;
      const menuProductPrice = document.getElementById('menuProductPrice').value;  
      

      const formData = {
        menuProductName: menuName,
        menuDescription: menuProductDescription,
        menuPrice: menuProductPrice,
      };
    
      
      try{

        putButtonInLoadingState(button)

        await updateMenuProductFunc(menuProductId, formData);
        menuPopUpSection.classList.add('hidden');
        showAlertOrder(alertSuccess, "Product Edited Successfully");

    }
      catch(err){
          showAlertOrder(alertFailure, 'Unable to Edit Product')
      }
      finally{
        removeBtnFromLoadingState(button, 'Upload Product')
      }
    })

  } catch (error) {
    showAlertOrder(alertFailure, 'Unable to Display Product Details')
    
  }
    finally{
      removeBtnFromLoadingState(button, `<p class="hidden md:block">Edit</p>
                <i class="fas fa-pencil-alt md:hidden"></i>`)
    }
}

  const updateMenuProductFunc = async (menuProductId, formData) => {

    console.log(formData);
          const updateMenuProductResponse = await fetch(`${config.apiUrl}/harolds/product/updateMenuProduct/${menuProductId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      

      if (!updateMenuProductResponse.ok)
          throw new Error('Unable to Update Product')
        
        getMenuProductFunc(); // Refresh product list

  }


  const deleteSingleProductFunc = async (menuProductId, button) => {
    try {
      putButtonInLoadingState(button)
      const deleteSingleProductResponse = await fetch(`${config.apiUrl}/harolds/product/deleteMenuProduct/${menuProductId}`, {
        method: 'DELETE',
      })

      if (deleteSingleProductResponse.ok) {
        showAlertOrder(alertSuccess, "Product Deleted Successfully")
        getMenuProductFunc(); // Refresh product list
      } else {
        throw new Error("Unable to Delete Product");
      }
      
    } catch (error) {
      showAlertOrder(alertFailure, 'Unable to Delete Product')
    }
    finally{
      removeBtnFromLoadingState(button, `<p class="hidden md:block">Delete</p>
                <i class="fas fa-trash md:hidden"></i>`);

    }
  }

  // Select all sidebar links and sections
const sidebarLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.content');

// Add click event listeners to each sidebar link
sidebarLinks.forEach((link, index) => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior

    // Hide all sections and remove active class from links
    sections.forEach(section => section.classList.add('hidden'));
    sidebarLinks.forEach(link => link.classList.remove('bg-gray-700'));

    // Show the clicked section and add active class to the link
    sections[index].classList.remove('hidden');
    link.classList.add('bg-gray-700');
  });
});

const adminOrdersList = document.getElementById('adminOrdersList')

{/* <p><strong>Variation: </strong>{ Size ${eachData.menuProductOrderVariation.size} : Price ${eachData.menuProductOrderVariation.price} }</p> */}

const fetchAllOrders = async () => {
  adminOrdersList.innerHTML = '';

    const response = await fetch(`${config.apiUrl}/harolds/adminGetOrder/adminGetAllProceedOrder`);

    const data = await response.json();
    const spreadData = data.orderProceed;

    spreadData.forEach((eachData) => {
      const menuOrderId = eachData._id;

      // Format the createdAt date
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true, // For AM/PM format
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        };
        return date.toLocaleString('en-US', options);
      };

      const ordersDisplay = `
        <div class="border rounded-lg shadow-md p-4 ordersIdClass" data-id="${menuOrderId}">
          <div class="flex items-center justify-between">
            <!-- Product Info -->
            <div class="flex items-center space-x-4">
              <img src="${eachData.menuProductOrderImage}" alt="${eachData.menuProductOrderName}" class="w-16 h-16 object-cover rounded">
              <div>
                <h4 class="font-semibold">${eachData.menuProductOrderName}</h4>
                <p class="text-sm text-gray-600">₦${eachData.menuProductOrderPrice}</p>
              </div>
            </div>
            <!-- Order Time -->
            <div class="text-sm text-gray-500">
              <p>Ordered At:</p>
              <p>${formatDate(eachData.createdAt)}</p>
            </div>
          </div>

          <!-- Client Info -->
          <div class="mt-4 space-y-2">
            <p><strong>Client Name:</strong> ${eachData.userName}</p>
            <p><strong>Email:</strong> ${eachData.userEmail}</p>
            <p><strong>Phone:</strong> ${eachData.userPhone}</p>
            <p><strong>Order Tel:</strong> ${eachData.menuProductOrderContact}</p>


            <p><strong>Address:</strong> ${eachData.menuProductOrderAddress}</p>
            <p><strong>Quantity:</strong> ${eachData.menuProductOrderQuantity}</p>
            <p><strong>Total Price:</strong> ₦${eachData.menuTotalProductOrderPrice}</p>
          </div>

          <!-- Actions -->
          <div class="mt-4 md:flex md:space-x-4 space-y-1 md:space-y-0">
            <button class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full cancleOrderBtn">
              Cancel Order
            </button>
            
            <button id="confirmOrderBtn" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full">
              Confirm/Delivered
            </button>
          </div>
        </div>
      `;

      adminOrdersList.innerHTML += ordersDisplay;
      const confirmOrderBtn = document.getElementById('confirmOrderBtn');
      confirmOrderBtn.addEventListener('click', (e) => {
        const confirmMenuOrderId = e.target.closest('.ordersIdClass').dataset.id;
        confirmUserOrders(confirmMenuOrderId);
      });
    });

    document.querySelectorAll('.cancleOrderBtn').forEach((button) => {
      button.addEventListener('click', (e) => {
        const deleteMenuOrderId = e.target.closest('.ordersIdClass').dataset.id;
        cancleUserOrders(deleteMenuOrderId, cancelBtn);
      });
    });


  
};


const cancleUserOrders = async (menuOrderId, cancelOrderBtn) => {
  try {
    putButtonInLoadingState(cancelOrderBtn)
    const response = await fetch(`${config.apiUrl}/harolds/order/adminCancleOrder/${menuOrderId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    

    const data = await response.json()
    fetchAllOrders();
    if(!response.ok) throw new Error('Unable to Cancel User Order');

    showAlertOrder(alertSuccess, 'User Order Cancelled Succssfully!')
    
  } catch (error) {
    showAlertOrder(alertFailure, 'Unable to Cancel User Order')
    
  }
  finally{
    removeBtnFromLoadingState(cancelOrderBtn)
  }
}

const confirmUserOrders = async (menuOrderId) => {
  try {
    const response = await fetch(`${config.apiUrl}/harolds/order/adminConfirmOrder/${menuOrderId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    console.log(response);
    
    const data = await response.json()
    console.log(data);
    

    fetchAllOrders()

  } catch (error) {
      showAlertOrder(alertFailure, "Unable to Confirm User Order")
  }
}

const fetTotalOrderIncome = async () => {
    const response = await fetch(`${config.apiUrl}/harolds/adminGetOrder/adminGetAllConfirmedOrdersPrice`)

    console.log('Total Price',response);
    
    const data = await response.json()
    console.log('total Price Data', data.totalPrice);

    const analyticTotalPrice = data.totalPrice
    
    const analyTicEarning = document.getElementById('analyTicEarning')

    analyTicEarning.textContent = analyticTotalPrice
}

const countPendingOrdersFunc = async () => {
    const response = await fetch(`${config.apiUrl}/harolds/adminGetOrder/adminGetAllProceedOrder`);

    const data = await response.json()
    const countData = data.count
    document.getElementById('pendingOrders').textContent = countData;
}

const countRegisteredUsers = async () => {
    const response = await fetch(`${config.apiUrl}/harolds/api/getRegisteredUser`)    

    const data = await response.json()
    console.log('reg users count', data);
    document.getElementById('regUserCount').textContent = data.count

}

const getWeeklyGrowthFunc = async () => {
    const response = await fetch(`${config.apiUrl}/harolds/adminGetOrder/getWeeklyGrowth`)

    const data = await response.json()
    console.log('adminChart',data);
    
    const { growthPercentage } = data;

        // Update the growth percentage in the UI
        const weeklyGrowthElem = document.getElementById('weeklyGrowth');
        // weeklyGrowthElem.textContent = `${growthPercentage > 0 ? '+' : ''}${growthPercentage}%`;
        // weeklyGrowthElem.className = `text-2xl font-bold ${
        //   growthPercentage >= 0 ? 'text-green-500' : 'text-red-500'
        // }`;

        weeklyGrowthElem.textContent = growthPercentage !== undefined 
  ? `${growthPercentage > 0 ? '+' : ''}${growthPercentage}%`
  : 'Data Unavailable';
weeklyGrowthElem.className = `text-2xl font-bold ${
  growthPercentage >= 0 ? 'text-green-500' : 'text-red-500'
}`;

}


const getAllUserMessageFunc = async () => {  
    const response = await fetch(`${config.apiUrl}/harolds/message/getAllUserMessage`);

    const data = await response.json();

    const messagesList = document.getElementById('messagesList');

    // Clear the message list
    messagesList.innerHTML = '';

    // Helper function to format the date
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleString('en-US', options); // Adjust 'en-US' for locale preferences
    };

    // Populate messages
    data.forEach((eachData) => {
      const formattedTime = formatDate(eachData.createdAt); // Format the timestamp

      const populateAllUserMessage = `
        <div id="eachPopulateMessage" class="border rounded-lg shadow-md p-4 cursor-pointer" data-id="${eachData._id}">
          <div class="flex justify-between items-center">
            <!-- User Info -->
            <div>
              <h4 class="font-semibold">${eachData.userName}</h4>
              <p class="text-sm text-gray-600">${eachData.userMessageTitle}</p>
            </div>
            <!-- Time Posted -->
            <p class="text-sm text-gray-500">${formattedTime}</p>
          </div>
        </div>
      `;
      messagesList.innerHTML += populateAllUserMessage;
    });

    // Add event listeners for each message
    const eachPopulateMessage = document.querySelectorAll('#eachPopulateMessage');

    eachPopulateMessage.forEach((button) => {
      button.addEventListener('click', (e) => {
        const messageId = e.target.closest('#eachPopulateMessage').dataset.id;

        getSingleUserMessageFunc(messageId);
      });
    });
};


const getSingleUserMessageFunc = async (messageId) => {
  try {
    const response = await fetch(`${config.apiUrl}/harolds/message/getSingleUserMessage/${messageId}`)

    const data = await response.json()

    const messagePopup = document.getElementById('messagePopup')
    messagePopup.classList.remove('hidden')
    messagePopup.innerHTML = ''

    const populateEachMessage = `
      <div class="bg-white w-96 rounded-lg shadow-lg p-6">
            <h2 id="popupUserName" class="text-xl font-bold mb-2">Name: ${data.userName}</h2>
            <p id="popupTitle" class="text-lg font-semibold mb-2">Message Title: ${data.userMessageTitle}</p>
            <p id="popupDescription" class="text-gray-600 mb-4">Message: ${data.userMessage}</p>
            <p><strong>Phone:</strong> <span id="popupPhone">${data.userPhone}</span></p>
            <p><strong>Email:</strong> <span id="popupEmail">${data.userEmail}</span></p>
            <button id="closeMessage" class="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full">Close</button>
          </div>
    `
    messagePopup.innerHTML = populateEachMessage

    const closeMessage = document.getElementById('closeMessage')
    closeMessage.addEventListener('click', () => {
      messagePopup.classList.add('hidden')
    })

  } catch (error) {
    
  }
}


// Handle dynamic variation addition
const addVariationBtn = document.getElementById("addVariationBtn");
const variationsContainer = document.getElementById("variationsContainer");
const priceSection = document.getElementById('priceSection');
const showVariationBtn = document.getElementById('showVariationBtn')
  // let variationAdded = true;

  // Toggle between Price or Variation form
  function toggleVariationOption() {
    if (variationsContainer.classList.contains('hidden')) {
      priceSection.classList.add('hidden');
      showVariationBtn.textContent = 'Close Variation'
      showVariationBtn.classList.add('bg-red-500')
      showVariationBtn.classList.remove('bg-blue-500')
      variationsContainer.classList.remove('hidden');
      addVariationBtn.classList.remove('hidden');

      
    } else {
      priceSection.classList.remove('hidden');
      showVariationBtn.classList.remove('hidden')
      showVariationBtn.classList.remove('bg-red-500')
      showVariationBtn.classList.add('bg-blue-500')
      showVariationBtn.textContent = 'Show Variation'
      variationsContainer.classList.add('hidden');
      addVariationBtn.classList.add('hidden');
    }
  }

  // Add Variation Button Clicked
  showVariationBtn.addEventListener('click', () => {
    // variationAdded = false;
    toggleVariationOption();
  });


addVariationBtn.addEventListener("click", () => {
  const newVariation = document.createElement("div");
  newVariation.classList.add("flex", "space-x-4", "mb-4");

  newVariation.innerHTML = `
    <input
      required
      type="text"
      name="variationSize[]"
      class="mt-1 p-2 block w-1/2 border border-gray-300 rounded"
      placeholder="Enter variation size (e.g., 1L)"
    />
    <input
      required
      type="number"
      name="variationPrice[]"
      class="mt-1 p-2 block w-1/2 border border-gray-300 rounded"
      placeholder="Enter price"
    />
  `;
  
  variationsContainer.appendChild(newVariation);
});



// Generic function to handle form submissions
async function handleFormSubmit(event, endpoint, formBtn) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  console.log(formBtn);
  const initialBtnText = formBtn.innerHTML;

  try {
    putButtonInLoadingState(formBtn);
    const response = await fetch(`${config.apiUrl}${endpoint}`, {
      method: "PATCH",
      body: formData,
    });
    await response.json();

    if (!response.ok) throw new Error("Unable to Upload")
      
    form.reset();
    showAlertOrder(alertSuccess, "Failed to upload. Please try again.");
  } catch (error) {
    showAlertOrder(alertFailure, "Unable to upload. Please try again.");
  }
  finally{
    removeBtnFromLoadingState(formBtn, initialBtnText)
  }
}



// Attach event listeners to forms
document.getElementById("heroImageForm").addEventListener("submit", (e) => handleFormSubmit(e, "/haroldsLanding/updateHeroImageSchema", document.querySelector('form#heroImageForm button')));

document.getElementById("flyer1Form").addEventListener("submit", (e) => handleFormSubmit(e, "/haroldsLanding/uploadFlyer1Schema", document.querySelector('form#flyer1Form button')));

document.getElementById("flyer2Form").addEventListener("submit", (e) => handleFormSubmit(e, "/haroldsLanding/uploadFlyer2Schema", document.querySelector('form#flyer2Form button')));


async function handleCreateFormSubmit(event, endpoint) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  try {
    const response = await fetch(`${config.apiUrl}${endpoint}`, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();

    if (response.ok) {
      alert(result.message);
      form.reset();
    } else {
      alert(result.message || "An error occurred.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to upload. Please try again.");
  }
}


const galleryForm = document.getElementById('galleryForm')
const createGalleryFunc = async () => {
  const createBtn = document.querySelector('#galleryForm button.upload')
  const formData = new FormData(galleryForm);

  try{
    
    putButtonInLoadingState(createBtn);

    const response = await fetch(`${config.apiUrl}/galleryDisplay/createGallery`, {
      method: 'POST',
      body: formData
    })

    const result = await response.json();
        if (response.ok) {
          showAlertOrder(alertSuccess, "File uploaded successfully!");
          // fetchGallery(); 
          fetchGallery()
        } else {
          throw new Error("Unable to Upload File.");
        }
  }
  catch(err){
    showAlertOrder(alertFailure, "Unable to Upload File.");
  }
  finally{
    removeBtnFromLoadingState(createBtn, "Upload Gallery")
  }

}

galleryForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  await createGalleryFunc()
} )


async function fetchGallery() {
  try {
    const response = await fetch(`${config.apiUrl}/galleryDisplay/getGallery`); // Fetch the gallery data
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Parse the response JSON

    console.log(response, data);
    

    const container = document.getElementById("galleryListDiv"); // Select the container for gallery items
    container.innerHTML = ''
    data.forEach((item) => {
      let content;

       // Function to format the time in a human-readable format
       function timeAgo(date) {
        const now = new Date();
        const timeDifference = now - new Date(date);
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years > 0) {
          return `${years} year${years > 1 ? 's' : ''} ago`;
        } else if (months > 0) {
          return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
          return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
          return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
          return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
          return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
      }

      const timePosted = timeAgo(item.createdAt);

      const deleteId = item._id

      console.log('deleted Id', deleteId);
      

      if (item.galleryType === "image") {

        content = `
          <div id="galleryIdDiv" class="flex items-center justify-between border rounded-lg shadow-md p-4" data-id="${deleteId}">
            <div id="galleryDisplayDiv" class="flex items-center space-x-4">
              <img src="${item.galleryMedia}" alt="${item.galleryTitle}" class="w-16 h-16 object-cover rounded">
            </div>

            <div>
              <h4 class="font-semibold">${item.galleryTitle}</h4>
              <p class="text-sm text-gray-600 font-semibold"><span>Posted: </span>${timePosted}</p>
              
            </div>

            <div class="flex space-x-2">
              <button id="deleteGallery" class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                <p class="hidden md:block">Delete</p>
                <i class="fas fa-trash md:hidden"></i>
              </button>
            </div>
          </div>
        `
      } else if (item.galleryType === "video") {
        
          content = `
          <div id="galleryIdDiv" class="flex items-center justify-between border rounded-lg shadow-md p-4" data-id="${deleteId}">
            <div id="galleryDisplayDiv" class="flex items-center space-x-4">
              <video controls class="w-16 h-16 object-cover rounded">
                <source src="${item.galleryMedia}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>

            <div>
              <h4 class="font-semibold">${item.galleryTitle}</h4>
              <p class="text-sm text-gray-600 font-semibold"><span>Posted: </span>${timePosted}</p>
              
            </div>

            <div class="flex space-x-2">
              <button id="deleteGallery" class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                <p class="hidden md:block">Delete</p>
                <i class="fas fa-trash md:hidden"></i>
              </button>
            </div>
          </div>
        `
          
      }

      container.innerHTML += content

      const deleteGallery = document.querySelectorAll('#deleteGallery')

      deleteGallery.forEach((eachDelete) => {
        eachDelete.addEventListener('click', (e) => {
          const galleryDeleteId = e.target.closest('#galleryIdDiv').dataset.id
          deleteGalleryFunc(galleryDeleteId)
        })
      })
      
    });
  } catch (err) {
    showAlert(alertFailure, "Unable to Fatch Gallery"); // Alert the error
  }
}

// Call the function to fetch and display the gallery

async function deleteGalleryFunc(galleryDeleteId) {
  try {
    const response = await fetch(`${config.apiUrl}/galleryDisplay/deleteGallery/${galleryDeleteId}`, {
      method: 'DELETE'
    })

    alert('Item deleted successfully')
    fetchGallery()
  } catch (error) {
    console.log(error);
    
  }
}




// Function to create a new daily menu
  const dailyMenuForm = document.getElementById('dailyMenuForm')

  dailyMenuForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let menuProductTarget = e.target;
    const dailyMenuSubmitBtn = dailyMenuForm.querySelector('button.upload')

    const formData = new FormData(menuProductTarget)
    try {

        putButtonInLoadingState(dailyMenuSubmitBtn)
        const response = await fetch(`${config.apiUrl}/dailyMenuDisplay/createDailyMenu`, {
            method: "POST",
            body: formData, // FormData should contain the image and price
        });

        if (!response.ok) {
          throw new Error("Unable to Add to Daily Menu")
        }
        // const data = await response.json();
        // console.log("Menu Created:", data);
        showAlertOrder(alertSuccess, 'Daily Menu Added Successfully');
        
      } catch (error) {
        console.error("Error creating daily menu:", error);
        showAlertOrder(alertFailure, 'Daily Menu Added Successfully');

    }
    finally{
      removeBtnFromLoadingState(dailyMenuSubmitBtn, 'Upload Product')
    }
  })

// Function to get all daily menus
async function getAllDailyMenus() {

  const dailyMenuProductList = document.getElementById('dailyMenuProductList')

        const response = await fetch(`${config.apiUrl}/dailyMenuDisplay/allDailyMenu`);
        const data = await response.json();

        dailyMenuProductList.innerHTML = ''
        data.forEach((eachData) => {

          const eachDailyMenuId = eachData._id

          const populateDailyMenu = `
            <div id="dailydisplayDivv" class="flex items-center justify-between border rounded-lg shadow-md p-4" data-id="${eachDailyMenuId}">
            <div class="flex items-center space-x-4">
              <img src="${eachData.menuImage}" alt="Chicken Suya" class="w-16 h-16 object-cover rounded">
              <div>
                <h4 class="font-semibold">${eachData.menuTitle}</h4>
                <p class="text-sm text-gray-600">₦${eachData.price}</p>
              </div>
            </div>
            
            <div class="flex space-x-2">
              <button id="updateDailydisplayDivv" class="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">
                <p class="hidden md:block">Edit</p>
                <i class="fas fa-pencil-alt md:hidden"></i>
              </button>
              <button id="deleteDailydisplayDivv" class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                <p class="hidden md:block">Delete</p>
                <i class="fas fa-trash md:hidden"></i>
              </button>
            </div>
          </div>
          `

          dailyMenuProductList.innerHTML += populateDailyMenu
          // dailydisplayDivv
          const deleteDailydisplayDivv = document.querySelectorAll('#deleteDailydisplayDivv')
          const updateDailydisplayDivv = document.querySelectorAll('#updateDailydisplayDivv')

          deleteDailydisplayDivv.forEach((eachDataDelete) => {
            eachDataDelete.addEventListener('click', (e) => {
              const deleteEachData = e.target.closest('#dailydisplayDivv').dataset.id;
              deleteDailyMenu(deleteEachData)
            })
          })
          

          updateDailydisplayDivv.forEach((eachDataEdit) => {
            eachDataEdit.addEventListener('click', (e) => {
              const editEachData = e.target.closest('#dailydisplayDivv').dataset.id
              getSingleDailyMenu(editEachData)
            })
          })
          

        })
}

// Function to get a single daily menu by ID
async function getSingleDailyMenu(editEachData) {
  const dailyMenuPopUpSection = document.getElementById('dailyMenuPopUpSection')
  dailyMenuPopUpSection.classList.remove('hidden')

  const dailyMenuPopUpDiv = document.getElementById('dailyMenuPopUpDiv')
  dailyMenuPopUpDiv.innerHTML = ''
    try {
        const response = await fetch(`${config.apiUrl}/dailyMenuDisplay/eachDailyMenu/${editEachData}`);
        const data = await response.json();
        console.log("Single Daily Menu:", data);

        const populateSingleDailyMenu = `
            <div id="closeDailyMenuPopUp" class="text-red-500 flex items-center font-bold">
          <div><i class="fas fa-times"></i></div>
          <p>close</p>
        </div>

        <h2 class="text-xl font-bold mb-4 text-center mt-[10px]">Edit Menu Products</h2>
  
        <form id="editDailyMenuForm" enctype="multipart/form-data" class="space-y-4 border-b pb-6 mb-6 text-black">
          <div class="eachEditMenuProductDiv">
            <label class="block text-sm font-medium ">Existing Daily Menu</label>
            <input
              type="text"
              name="menuTitle"
              value="${data.menuTitle}"
              class="mt-1 p-2 block w-full border border-gray-300 rounded"
              placeholder="Enter new product name"
            />
          </div>
      
          <div>
            <label class="block text-sm font-medium "> Existing Product Price (₦)</label>
            <input
              required
              type="number"
              name="price"
              value="${data.price}"
              class="mt-1 p-2 block w-full border border-gray-300 rounded"
              placeholder="Enter new product price"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Daily Menu Image</label>
            <input
              required
              type="file"
              name="menuImage"
              class="mt-1 p-2 block w-full border border-gray-300 rounded"
              accept="image/*"
            />
          </div>
      
          <button
            type="submit"
            class="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full"
          >
            Upload Product
          </button>
          
        </form>
        `

      dailyMenuPopUpDiv.innerHTML = populateSingleDailyMenu

        const closeMenuPopUp = document.getElementById('closeDailyMenuPopUp')
        closeMenuPopUp.addEventListener('click', () => {
          dailyMenuPopUpSection.classList.add('hidden')
        })

        const editDailyMenuForm = document.getElementById('editDailyMenuForm')
        editDailyMenuForm.addEventListener('submit', (e) => {
          e.preventDefault()
          let menuProductTarget = e.target
          const formData = new FormData(menuProductTarget)
          updateDailyMenu(editEachData, formData)
        })
    } catch (error) {
        console.error("Error fetching daily menu:", error);
    }
}

// Function to update a daily menu by ID
async function updateDailyMenu(editEachData, formData) {
    try {
        const response = await fetch(`${config.apiUrl}/dailyMenuDisplay/updateDailyMenu/${editEachData}`, {
            method: "PATCH",
            body: formData, // FormData should contain updated image and price
        });
        const data = await response.json();
        console.log("Menu Updated:", data);
        alert('Item updated successfully')
        getAllDailyMenus()
    } catch (error) {
        console.error("Error updating daily menu:", error);
    }
}

// Function to delete a daily menu by ID
async function deleteDailyMenu(deleteEachData) {
    try {
        const response = await fetch(`${config.apiUrl}/dailyMenuDisplay/deleteDailyMenu/${deleteEachData}`, {
            method: "DELETE",
        });
        const data = await response.json();
        console.log("Menu Deleted:", data);
        alert('Daily Menu Item Deleted Successfully')
        getAllDailyMenus()
    } catch (error) {
        console.error("Error deleting daily menu:", error);
    }
}

const bakeOrderList = document.getElementById('bakeOrderList')

const fetchAllUserBakeryBookings = async () => {
  bakeOrderList.innerHTML = ''
    const response = await fetch(`${config.apiUrl}/harolds/getAllBakery`)
    const data = await response.json()

    console.log('AllUserBakeryBookings', response);
    console.log('AllUserBakeryBookings', data);

    // const dataForech = data.AllUserBakeryBookings 

    data.forEach((eachData) => {
      const timePosted = formatTimeAgo(new Date(eachData.createdAt))
      const populateBakeryList = `
        <div  id="bakeOderListId" class="text-[12px] md:text-[14px] border rounded-lg shadow-md p-4 mt-[10px]">
              <div class="border rounded-lg shadow-md p-4">
                  <div class="flex items-center justify-between">
                    <div class="">
                        <h4 class="font-semibold">${eachData.userOrderName}</h4>
                        <div>
                          <a class="text-orange-600 underline" href="mailto:${eachData.userOrderEmail}">${eachData.userOrderEmail}</a>
                        </div>
                        
                        <div>
                          <p>${timePosted}</p>
                        </div>
                    </div>
        
                    <div class="">
                      <div>
                        <a class="text-blue-500 underline" href="tel:+234${eachData.userOrderContact}">0${eachData.userOrderContact}</a>
                      </div>
                      <div>
                        <a class="text-blue-500 underline" href="tel:+234${eachData.bakeContact}">${eachData.bakeContact}</a>
                      </div>
                    </div>
        
                    <div>
                      <p><span class="font-bold">Bake Type:</span> ${eachData.bakeType}</p>
                      <p><span class="font-bold">Bake Quantity:</span> ${eachData.bakeQuantity}</p>
                      <p><span class="font-bold">Other BakeType:</span> ${eachData.otherBakeType}</p>
                    </div>
                </div>

                <div class="text-center text-[10px] md:text-[12px]">
                  <p><span class="font-bold overflow-x-scroll">Bake Description:</span> ${eachData.bakeDescription}</p>
                </div>
              </div>
              
            </div>
      `

      bakeOrderList.innerHTML += populateBakeryList
    })
    
    

}

const formatTimeAgo = (timestamp) => {
  const now = new Date()
  const diff = Math.floor((now - timestamp)/1000)

  const intervals = [
    { label: 'year', seconds: 31536000},
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60},
    { label: 'second', seconds: 1}
  ]

  for(const interval of intervals) {
    const count = Math.floor(diff/interval.seconds)
    if (count >= 1) {
      return `posted ${count} ${interval.label}${count > 1 ? 's' : ''} ago`
    }
  }
  return 'just now'

}


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

const putButtonInLoadingState = (btn)=>{
          btn.innerHTML = `<span class="spinner-grow spinner-grow-sm">
          </span> Loading`
        btn.disabled = true
}

const removeBtnFromLoadingState = (btn, btn_text)=>{
  btn.innerHTML = btn_text;
  btn.disabled = false;
}