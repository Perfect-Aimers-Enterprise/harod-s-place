document.addEventListener('DOMContentLoaded', ()=>{
    getHeroImageDisplay();
    getFlyer1Display();
    getFlyer2Display();
})



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
              <a href="#menu" class="bg-orange-500 py-3 px-6 mt-6 rounded-xl hover:bg-orange-600 text-sm animatedBtn1">EXPLORE MENU <span class="over bg-white text-orange-500"><span>EXPLORE MENU</span></span></a>
          </div>
        `
  
        dynamicHeroImage.innerHTML = populateHeroImage
  
      })
      
      
    } catch (error) {
      console.log(error);
    }
  } 

  
  const getFlyer1Display = async () => {
    const flyer1Section = document.getElementById('current_flyer_1 .uploaded_flyer');
    const loader = flyer1Section.parentElement.querySelector('.loader');
    const no_flyer = flyer1Section.parentElement.querySelector('.no_flyer_uploaded');
    const unable2Fetch = flyer1Section.parentElement.querySelector('.unable2Fetch');
    try {
      const response = await fetch(`${config.apiUrl}/haroldsLanding/getFlyer1Schema`);
      if (!response.ok) throw new Error('Unable to retrieve flyer 1')
      const data = await response.json()

      if(data.length===0){
        unable2Fetch.classList.add('hidden');
        flyer1Section.classList.add('hidden');
        return no_flyer.classList.remove('hidden');
      }
      
      data.forEach((eachData) => {

        const flyer1Holder = ` 
          <h3 class=' fs-5 font-bold mb-3 uppercase'>Uploaded 2nd Flyer Image</h3>
          <div class="img_holder mx-auto">
            <img src="${eachData.flyer1Image}" alt="${eachData.flyer1Title}" class=" object-contain rounded block mx-auto">
            <button data-id=${data._id} type='submit' class=" bg-red-500 hover:bg-red-700 text-white px-3 py-1 font-semibold rounded-lg mt-3 uppercase">Delete</button>
          </div>`;
        
  
        flyer1Section.innerHTML = flyer1Holder
      })
      
    } catch (error) {
      unable2Fetch.classList.remove('hidden');
      flyer1Section.classList.add('hidden');
      return no_flyer.classList.add('hidden');
      
    }
    finally{
      loader.classList.add('hidden');

    }
  }


  const getFlyer2Display = async () => {
    const flyer2Section = document.getElementById('current_flyer_2 .uploaded_flyer');
    const loader = flyer2Section.parentElement.querySelector('.loader');
    const no_flyer = flyer2Section.parentElement.querySelector('.no_flyer_uploaded');
    const unable2Fetch = flyer2Section.parentElement.querySelector('.unable2Fetch');
    try {
      const response = await fetch(`${config.apiUrl}/haroldsLanding/getFlyer2Schema`);
      if (!response.ok) throw new Error('Unable to retrieve flyer 2')
      const data = await response.json()

      if(data.length===0){
        unable2Fetch.classList.add('hidden');
        flyer2Section.classList.add('hidden');
        return no_flyer.classList.remove('hidden');
      }
      
      data.forEach((eachData) => {

        const flyer2Holder = ` 
          <h3 class=' fs-5 font-bold mb-3 uppercase'>Uploaded 2nd Flyer Image</h3>
          <div class="img_holder mx-auto">
            <img src="${eachData.flyer2Image}" alt="${eachData.flyer2Title}" class=" object-contain rounded block mx-auto">
            <button data-id=${data._id} type='submit' class=" bg-red-500 hover:bg-red-700 text-white px-3 py-1 font-semibold rounded-lg mt-3 uppercase">Delete</button>
          </div>`;
        
  
        flyer2Section.innerHTML = flyer2Holder
      })
      
    } catch (error) {
      unable2Fetch.classList.remove('hidden');
      flyer2Section.classList.add('hidden');
      return no_flyer.classList.add('hidden');
      
    }
    finally{
      loader.classList.add('hidden');

    }
  }

  const deleteFlyer1 = async (e)=>{
    const button = e.target;
    const id = button.dataset.id;
    const initialBtnText = button.innerHTML;
    putButtonInLoadingState(button);
    try{
      const response = await fetch('/haroldsLanding/deleteFlyer1Schema/:id', 'DELETE');
      if(!response.ok) return new error("Unable to Delete Flyer 1");
      showAlertOrder(alertSuccess, 'Flyer 1 Deleted Successfully')
    }
    catch(err){
      console.error(err)
      showAlertOrder(alertFailure, 'Unable to Delete Flyer 1')

    }
    finally{
      removeBtnFromLoadingState(button, initialBtnText);
    }
  }

  const deleteFlyer2 = async (e)=>{
    const button = e.target;
    const id = button.dataset.id;
    const initialBtnText = button.innerHTML;
    putButtonInLoadingState(button);
    try{
      const response = await fetch('/haroldsLanding/deleteFlyer2Schema/:id', 'DELETE');
      if(!response.ok) return new error("Unable to Delete Flyer 2");
      showAlertOrder(alertSuccess, 'Flyer 2 Deleted Successfully')
    }
    catch(err){
      console.error(err)
      showAlertOrder(alertFailure, 'Unable to Delete Flyer 2')

    }
    finally{
      removeBtnFromLoadingState(button, initialBtnText);
    }
  }