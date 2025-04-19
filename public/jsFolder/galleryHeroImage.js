

window.config = {
  apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : `${window.location.protocol}//${window.location.hostname}`
};



const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const slidingNavbar = document.getElementById('slidingNavbar');

document.addEventListener('DOMContentLoaded', () => {
  activeNavBarFunc()
  getHeroImageDisplay()
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
    const response = await fetch(`${config.apiUrl}/haroldsLanding/getHeroImage`)
    const data = await response.json()
    

    data.forEach((eachData) => {

      const dynamicHeroImage = document.getElementById('dynamicHeroImage')

      const populateHeroImage = `
        <div class="relative bg-cover bg-center text-white h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[85vh]" style="background-image: url('${eachData.heroImage}');">
          <div class="hero-overlay absolute inset-0"></div>
          <div class="relative h-full flex flex-col justify-center items-center text-center">
            <h2 class="text-2xl md:text-5xl font-bold mb-4">${eachData.heroImageName}</h2>
            <p class="text-lg md:text-xl mb-6">${eachData.heroImageDes}</p>
             <a href="#menu" class="bg-orange-500 py-3 px-6 mt-6 rounded-xl hover:bg-orange-600 text-sm animatedBtn1">EXPLORE GALLERY <span class="over bg-white text-orange-500"><span>EXPLORE GALLERY</span></span></a>
          </div>
        </div>
      `

      dynamicHeroImage.innerHTML = populateHeroImage

    })
    
    
  } catch (error) {
    console.log(error);
  }
}


