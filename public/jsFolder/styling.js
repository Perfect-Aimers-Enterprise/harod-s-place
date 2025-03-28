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

const customSelectElements = document.querySelectorAll('div.custom-select div.chosen');

customSelectElements.forEach((element)=>{
    element.addEventListener('click', ()=>{
        element.focus();        
    })
})


const chosenOptionElement = document.querySelector('.custom-select div.chosen');
const optionHolderElement = document.querySelector('.custom-select ul')
const customSelectElement = document.querySelector('div.custom-select')


let optionsFocused;

chosenOptionElement.addEventListener('focus', (e)=>{

    if(optionsFocused==true) {
        console.log(optionsFocused)
        return null
    };
    console.log(optionsFocused)
    const rect = chosenOptionElement.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if(spaceAbove>chosenOptionElement.offsetHeight && spaceAbove>spaceBelow){
        // Display Above
        optionHolderElement.style.bottom = 'calc(100% + 3px)';
        alert('Display Above')
    }
    else{
        // Display Below
        alert('Display below')
        optionHolderElement.style.top = 'calc(100% + 3px)';
    }
    const parentCustomSelect = e.target.closest('div.custom-select');
    parentCustomSelect.classList.add('open')
    optionsFocused = !optionsFocused;
    console.log('Flipped')
    console.log(optionsFocused)
})


chosenOptionElement.addEventListener('blur', ()=>{


    optionsFocused = false;
})




// Intersetion Observer for movind and appearing effects

const food_menu_element = document.querySelector('.food_menu');

const food_daily_menu_element = document.querySelector('.food_daily_menu');

const bakery_image_element = document.querySelector('.bakery_image');
const lounge_animation_element = document.querySelector('.lounge_animation_holder');

const observer = new IntersectionObserver ((entries, observer)=>{
    entries.forEach(entry=>{
        // console.log(entry.target.classList)
        if(entry.isIntersecting){
            console.log(entry.target.classList)

            if (entry.target.classList.contains('food_menu')||entry.target.classList.contains('bakery_image')){
                entry.target.classList.add('appear')
                // console.log(entry.target.classList)

            }
            observer.unobserve(entry.target);

        }
    })
},
        {
            root:null,
            rootMargin: '0px',
            threshold: 0.7
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
            rootMargin: '-190px',
            threshold: 0.1
        }
);


const breadObserver = new IntersectionObserver ((entries, observer)=>{
    entries.forEach(entry=>{
        // console.log(entry.target.classList)
        if(entry.isIntersecting){
            console.log(entry.target.classList)

            if (entry.target.classList.contains('bakery_image')||entry.target.classList.contains('lounge_animation_holder')){
                entry.target.classList.add('appear')
                // console.log(entry.target.classList)

            }
            observer.unobserve(entry.target);

        }
    })
},
        {
            root:null,
            rootMargin: '0px',
            threshold: 0.1
        }
);



observer.observe(food_menu_element);


observer_food_daily_menu.observe(food_daily_menu_element);

breadObserver.observe(bakery_image_element);
breadObserver.observe(lounge_animation_element);
