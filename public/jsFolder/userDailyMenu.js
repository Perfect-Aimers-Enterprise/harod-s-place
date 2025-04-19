const configuration = {
    apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000'
      : `${window.location.protocol}//${window.location.hostname}`
  };

document.addEventListener('DOMContentLoaded', () => {
    getAllDailyMenus()
})

// Function to get all daily menus
async function getAllDailyMenus() {

    const dailyMenuDishCards = document.getElementById('dailyMenuDishCards')
  
      try {
          const response = await fetch(`${configuration.apiUrl}/dailyMenuDisplay/allDailyMenu`);
          const data = await response.json();
  
          dailyMenuDishCards.innerHTML = ''
          data.forEach((eachData) => {
  
            const eachDailyMenuId = eachData._id

            const populateMenuDish = `
                <div id="dailyMenuEachData" class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg" data-id="${eachDailyMenuId}">
                    <img src="${eachData.menuImage}" alt="Grilled Chicken" class="rounded-lg w-full h-80 object-cover">
                    <h4 class="mt-4 text-xl font-semibold">${eachData.menuTitle}</h4>
                    <p class="mt-2 text-gray-600">₦${eachData.price}</p>
                    
                    <button class="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full dailyMenuDishOrder">Order Now</button>
                </div>
            `
  
            dailyMenuDishCards.innerHTML += populateMenuDish
  
            const dailyMenuDishOrder = document.querySelectorAll('.dailyMenuDishOrder')
  
            dailyMenuDishOrder.forEach((eachDailyMenuDishOrder) => {
                eachDailyMenuDishOrder.addEventListener('click', (e) => {
                const eachDailyMenuData = e.target.closest('#dailyMenuEachData').dataset.id
                getSingleDailyMenu(eachDailyMenuData)
              })
            })
            
  
          })
      } catch (error) {
          console.error("Error fetching daily menus:", error);
      }
  }

