document.addEventListener('DOMContentLoaded', ()=>{
    getHeroImageDisplay();
    getFlyer1DisplayAdmin();
    getFlyer2DisplayAdmin();
})


  
  const getHeroImageDisplay = async () => {
    const heroImageSection = document.querySelector('#current_hero_image .uploaded_hero');
    const loader = heroImageSection.parentElement.querySelector('.loader');
    const no_hero_image = heroImageSection.parentElement.querySelector('.no_hero_uploaded');
    const unable2Fetch = heroImageSection.parentElement.querySelector('.unable2Fetch');
    try {
      const response = await fetch(`${config.apiUrl}/haroldsLanding/getHeroImage`);
      if (!response.ok) throw new Error('Unable to retrieve hero image')
      const data = await response.json()

      if(data.length===0){
        unable2Fetch.classList.add('hidden');
        heroImageSection.classList.add('hidden');
        return no_hero_image.classList.remove('hidden');
      }
      unable2Fetch.classList.add('hidden');
      heroImageSection.classList.remove('hidden');
      no_hero_image.classList.add('hidden');
      
      data.forEach((eachData) => {

        const heroImageHolder = ` 
        <div class=" uploaded_hero text-center ">
        <div class="img_holder mx-auto">
        <img src="${eachData.heroImage}" alt="${eachData.heroImageName}" class=" object-contain rounded block mx-auto">
        <p class=" text-center fs-5 mt-2"><span class=" font-semibold">${eachData.heroImageName}</span> <br>
        ${eachData.heroImageDes}
        </p>
        <button data-id=${eachData._id} type='submit' class=" bg-red-500 hover:bg-red-700 text-white px-3 py-1 font-semibold rounded-lg mt-3 uppercase" onclick=deleteHeroImage(event)>Delete</button>
        </div>`;
        
  
        heroImageSection.innerHTML = heroImageHolder
      })
      
    } catch (error) {
      unable2Fetch.classList.remove('hidden');
      heroImageSection.classList.add('hidden');
      return no_hero_image.classList.add('hidden');
      
    }
    finally{
      loader.classList.add('hidden');

    }
  }


  const getFlyer1DisplayAdmin = async () => {
    const flyer1Section = document.querySelector('#current_flyer_1 .uploaded_flyer');
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

      unable2Fetch.classList.add('hidden');
      flyer1Section.classList.remove('hidden');
      no_flyer.classList.add('hidden');
      
      data.forEach((eachData) => {

        const flyer1Holder = ` 
          <div class="img_holder mx-auto">
            <img src="${eachData.flyer1Image}" alt="${eachData.flyer1Title}" class=" object-contain rounded block mx-auto">
            <p class=" text-center fs-5 mt-2">${eachData.flyer1Title}</p>
            <button data-id=${eachData._id} type='button' class=" bg-red-500 hover:bg-red-700 text-white px-3 py-1 font-semibold rounded-lg mt-3 uppercase" onclick="deleteFlyer1(event)">Delete</button>
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

  const getFlyer2DisplayAdmin = async () => {
    const flyer2Section = document.querySelector('#current_flyer_2 .uploaded_flyer');
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
      unable2Fetch.classList.add('hidden');
      flyer2Section.classList.remove('hidden');
      no_flyer.classList.add('hidden');
      
      data.forEach((eachData) => {

        const flyer2Holder = ` 
          <div class="img_holder mx-auto">
            <img src="${eachData.flyer2Image}" alt="${eachData.flyer2Title}" class=" object-contain rounded block mx-auto">
            <p class=" text-center fs-5 mt-2">${eachData.flyer2Title}</p>
            <button data-id=${eachData._id} type='button' class=" bg-red-500 hover:bg-red-700 text-white px-3 py-1 font-semibold rounded-lg mt-3 uppercase" onclick="deleteFlyer2(event)">Delete</button>
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
      const response = await fetch(`/haroldsLanding/deleteFlyer1Schema/${id}`, {
        method:'DELETE'
      }
      );
      if(!response.ok) return new Error("Unable to Delete Flyer 1");


      button.closest('.uploaded_flyer').classList.add('hidden');
      button.closest('#current_flyer_1').querySelector('.no_flyer_uploaded').classList.remove('hidden');
      
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
      const response = await fetch(`/haroldsLanding/deleteFlyer2Schema/${id}`, {
        method:'DELETE'
      }
      );
      if(!response.ok) return new Error("Unable to Delete Flyer 2");

      button.closest('.uploaded_flyer').classList.add('hidden');
      button.closest('#current_flyer_2').querySelector('.no_flyer_uploaded').classList.remove('hidden');

      showAlertOrder(alertSuccess, 'Flyer 2 Deleted Successfully');
    }
    catch(err){
      console.error(err)
      showAlertOrder(alertFailure, 'Unable to Delete Flyer 2')

    }
    finally{
      removeBtnFromLoadingState(button, initialBtnText);
    }
  }

  const deleteHeroImage = async (e)=>{
    const button = e.target;
    const id = button.dataset.id;
    const initialBtnText = button.innerHTML;
    putButtonInLoadingState(button);
    try{
      const response = await fetch(`/haroldsLanding/deleteHeroImage/${id}`, {
        method:'DELETE'
      }
      );
      if(!response.ok) return new error("Unable to Delete Hero Image");
      
      button.closest('.uploaded_hero').classList.add('hidden');
      button.closest('#current_hero_image').querySelector('.no_hero_uploaded').classList.remove('hidden');

      showAlertOrder(alertSuccess, 'Hero Image Deleted Successfully')
    }
    catch(err){
      console.error(err)
      showAlertOrder(alertFailure, 'Unable to Delete Hero Image. Try Again Later')

    }
    finally{
      removeBtnFromLoadingState(button, initialBtnText);
    }
  }
