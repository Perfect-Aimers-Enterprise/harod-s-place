const config = {
  apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : `${window.location.protocol}//${window.location.hostname}`
};

const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const slidingNavbar = document.getElementById('slidingNavbar');

document.addEventListener('DOMContentLoaded', () => {
  activeNavBarFunc()
  getFlyer1Display()
  getFlyer2Display()
  getHeroImageDisplay()
  getMenuLandingFunc()
})

menuToggle.addEventListener('click', () => {
  slidingNavbar.classList.remove('translate-x-full');
});

closeMenu.addEventListener('click', () => {
  slidingNavbar.classList.add('translate-x-full');
});

// Optional: Close navbar when clicking outside
window.addEventListener('click', (e) => {
  if (!slidingNavbar.contains(e.target) && !menuToggle.contains(e.target)) {
    slidingNavbar.classList.add('translate-x-full');
  }
});


const activeNavBarFunc = () => {
  const currentPage = window.location.pathname.split('/').pop()
  const navLink = document.querySelectorAll('li a')
  
  console.log(navLink);
  
  navLink.forEach((link) => {
    let navColor = 'text-orange-400'
    if (link.getAttribute('href') === currentPage) {
      link.classList.add(navColor)
    }
  })
}


const getHeroImageDisplay = async () => {
  try {
    const response = await fetch(`${config.apiUrl}/harolds/getHeroImage`)
    const data = await response.json()
    

    data.forEach((eachData) => {

      const dynamicHeroImage = document.getElementById('dynamicHeroImage')

      const populateHeroImage = `
        <div class="relative bg-cover bg-center text-white h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[85vh]" style="background-image: url('${eachData.heroImage}');">
          <div class="hero-overlay absolute inset-0"></div>
          <div class="relative h-full flex flex-col justify-center items-center text-center">
            <h2 class="text-2xl md:text-5xl font-bold mb-4">${eachData.heroImageName}</h2>
            <p class="text-lg md:text-xl mb-6">${eachData.heroImageDes}</p>
            <a href="#menu" class="bg-orange-500 py-3 px-6 rounded-full hover:bg-orange-600">Explore Menu</a>
          </div>
        </div>
      `

      dynamicHeroImage.innerHTML = populateHeroImage

    })
    
    
  } catch (error) {
    console.log(error);
  }
}

const getFlyer1Display = async () => {
  try {
    const response = await fetch(`${config.apiUrl}/harolds/getFlyer1Schema`)

    const data = await response.json()
    
    data.forEach((eachData) => {
      const flyer1Section = document.getElementById('flyer1Section')

      const populateFlyer1 = `
        <a href="#" style="background-image: url('${eachData.flyer1Image}'); background-size: cover;" class=" grid items-center text-[25px] font-bold relative h-[200px] md:h-[40vh] lg:h-[50vh] xl:h-[60vh]">
          <div class="bg-black opacity-50 inset-0 absolute"></div>
          <div class="text-center relative">
            <h1>${eachData.flyer1Title} (Contact Us)</h1>
          </div>
        </a>
      `

      flyer1Section.innerHTML = populateFlyer1
    })
    
  } catch (error) {
    console.log(error);
    
  }
}

const getFlyer2Display = async () => {
  try {
    const response = await fetch(`${config.apiUrl}/harolds/getFlyer2Schema`)
    const data = await response.json()
    
    data.forEach((eachData) => {
      const flyer2Section = document.getElementById('flyer2Section')

      const populateFlyer2 = `
        <a href="#" style="background-image: url('${eachData.flyer2Image}'); background-size: cover;" class=" grid items-center text-[25px] font-bold relative h-[200px] md:h-[40vh] lg:h-[50vh] xl:h-[60vh]">
          <div class="bg-black opacity-50 inset-0 absolute"></div>
          <div class="text-center relative">
            <h1>${eachData.flyer2Title} (Contact Us)</h1>
          </div>
        </a>
      `

      flyer2Section.innerHTML = populateFlyer2
    })
    
  } catch (error) {
    console.log(error);
    
  }
}

const getMenuLandingFunc = async () => {
  try {
    const response = await fetch(`${config.apiUrl}/harolds/getAllMenuImage`)
    const data = await response.json()

    const menuDishCards = document.getElementById('menuDishCards')
    menuDishCards.innerHTML = ''

    data.forEach((eachData) => {

      const populateMenuLanding = `
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg">
          <img src="${eachData.menuLandingImage}" alt="Grilled Chicken" class="rounded-lg w-full h-40 object-cover">
          <h4 class="mt-4 text-xl font-semibold">${eachData.menuLandingName}</h4>
          <p class="mt-2 text-gray-600">${eachData.menuLandingDes}</p>
          
          <button class="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full menuOrderNow">View Menu</button>
        </div>
      `
      menuDishCards.innerHTML += populateMenuLanding

      const menuOrderNow = document.querySelectorAll('.menuOrderNow')
      menuOrderNow.forEach((eachMenuOrder) => {
        eachMenuOrder.addEventListener('click', () => {
          window.location.href = '../htmlFolder/menu2.html'
        })
      })

    })
  
    
  } catch (error) {
    
  }
}

const toggleRegCloseBtn = document.getElementById('toggleRegCloseBtn')


toggleRegCloseBtn.onclick = () => {
  document.getElementById('navigationPopUp').classList.add('hidden')
}


