const header = document.querySelector('header');

const animateHeaderDueToScrollPosition = ()=>{
    if(window.scrollY>10){
        header.classList.add('AtTop')
    }
    else{
        header.classList.remove('AtTop');
    }
}

document.addEventListener('DOMContentLoaded', animateHeaderDueToScrollPosition)

window.addEventListener('scroll', animateHeaderDueToScrollPosition)


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
    // const rect = chosenOptionElement.getBoundingClientRect();
    const rect = e.target.querySelector('div.chosen').getBoundingClientRect();
    const optionHolderElement = e.target.querySelector('ul');
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if(spaceAbove>chosenOptionElement.offsetHeight && spaceAbove>spaceBelow){
        // Display Above
        optionHolderElement.style.bottom = 'calc(100% + 3px)';
        optionHolderElement.style.top = 'unset';
    }
    else{
        // Display Below
        optionHolderElement.style.top = 'calc(100% + 3px)';
        optionHolderElement.style.bottom = 'unset';
    }
    console.log(e.target)
    e.target.classList.toggle('open');
    })
})



// Intersetion Observer for movind and appearing effects

const food_menu_element = document.querySelector('.food_menu');

const food_daily_menu_element = document.querySelector('.food_daily_menu');

const bakery_image_element = document.querySelector('.bakery_image');
const lounge_animation_element = document.querySelector('.lounge_animation_holder');
const about_text_element = document.querySelectorAll('.aboutText');
const about_image_element = document.querySelectorAll('.aboutImage');
const services_text_element = document.querySelectorAll('.ourServicesText');
const services_image_element = document.querySelectorAll('.servicesImage');

const observer = new IntersectionObserver ((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            if (entry.target.classList.contains('food_menu')||entry.target.classList.contains('bakery_image')){
                entry.target.classList.add('appear')
            }
            observer.unobserve(entry.target);

        }
    })
},
        {
            root:null,
            rootMargin: '0px 20px',
            threshold: 0.6
        }
);


const observer_food_daily_menu = new IntersectionObserver ((entries, observer)=>{
    entries.forEach(entry=>{        

        if(entry.isIntersecting){
            if (entry.target.classList.contains('food_daily_menu')){
                entry.target.classList.add('appear')
            }
            observer.unobserve(entry.target);

        }
    })
},
        {
            root:null,
            rootMargin: '0px 0px',
            threshold: 0.1
        }
);


const breadObserver = new IntersectionObserver ((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            if (entry.target.classList.contains('bakery_image')||entry.target.classList.contains('lounge_animation_holder')){
                entry.target.classList.add('appear')

            }
            observer.unobserve(entry.target);

        }
    })
},
        {
            root:null,
            rootMargin: '-10px 0px',
            threshold: 0.1
        }
);


const aboutObserver = new IntersectionObserver ((entries, observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            if (entry.target.classList.contains('aboutText')||entry.target.classList.contains('aboutImage')||entry.target.classList.contains('ourServicesText')||entry.target.classList.contains('servicesImage')){
                entry.target.classList.add('appear')
            }
            observer.unobserve(entry.target);

        }
    })
},
        {
            root:null,
            rootMargin: '0px',
            threshold: 0.3
        }
);


observer.observe(food_menu_element);


observer_food_daily_menu.observe(food_daily_menu_element);

breadObserver.observe(bakery_image_element);
breadObserver.observe(lounge_animation_element);


about_text_element.forEach((element)=>{
    aboutObserver.observe(element)
})

about_image_element.forEach((element)=>{
    aboutObserver.observe(element)
})


services_text_element.forEach((element)=>{
    aboutObserver.observe(element)
})

services_image_element.forEach((element)=>{
    aboutObserver.observe(element)
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


const menuMaximizerBtn = document.querySelector('button.menu_maximizer');

const menuMinimizerBtn = document.querySelector('button.menu_minimizer');

// Event Listeners to maximize the food menu
menuMaximizerBtn.addEventListener("click", (e)=>{
    document.querySelector(".maximizable_menu_section").classList.add('maximize'); 

})

// Event Listeners to minimize the food menu
menuMinimizerBtn.addEventListener("click", (e)=>{  
    const containingSection = e.target.closest('section.maximizable_menu_section');
    containingSection.classList.remove('maximize'); 
        

})

