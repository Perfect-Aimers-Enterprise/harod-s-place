const configreg = {
    apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000'
      : `${window.location.protocol}//${window.location.hostname}`
  };
  

// const registrationSection = document.getElementById('registrationSection')
const loginSection = document.getElementById('loginSection')
const existingUser = document.getElementById('existingUser')
const newUser = document.getElementById('newUser')
const exploreApp = document.getElementById('exploreApp')
const generalSection = document.getElementById('generalSection')
const loginForm = document.getElementById('loginForm')
const registrationForm = document.getElementById('registrationForm')
const submitButton = document.getElementById('submitButton')
const ForgottenPasswordSection = document.getElementById('4gottenPasswordSection')
const ForgottenPassword = document.getElementById('4gottenPassword')


    const steps = document.querySelectorAll('.step');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    let currentStep = 0;

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('hidden', index !== stepIndex && index !== stepIndex + 1);
        });
        prevButton.classList.toggle('hidden', stepIndex === 0);
        if (stepIndex + 2 >= steps.length) {
            nextButton.classList.add('hidden')
            submitButton.classList.remove('hidden')
        }
        // nextButton.textContent = stepIndex + 2 >= steps.length ? 'Submit' : 'Next';
        // nextButton.type = stepIndex + 2 >= steps.length ? 'submit' : 'button';
    }

    nextButton.addEventListener('click', () => {
        const inputs = Array.from(steps).slice(currentStep, currentStep + 2);
        if (inputs.some(input => !input.querySelector('input').value.trim())) {
            alert('Please fill out all fields before proceeding.');
            return;
        }
        if (currentStep + 2 >= steps.length) {
            document.getElementById('registrationForm').submit();
        } else {
            currentStep += 2;
            showStep(currentStep);
        }
    });

    prevButton.addEventListener('click', () => {
        currentStep -= 2;
        showStep(currentStep);
    });

    showStep(currentStep);
    

existingUser.onclick = () => {
    generalSection.classList.add('hidden')
    loginSection.classList.remove('hidden')
}

newUser.onclick = () => {
    generalSection.classList.add('hidden')
    registrationSection.classList.remove('hidden')
}

exploreApp.onclick = () => {
    generalSection.classList.add('hidden')

        // localStorage.removeItem('token')

    window.location.href = '../htmlFolder/perpetualTaste.html'
}

ForgottenPassword.onclick = () => {
    generalSection.classList.add('hidden')
    ForgottenPasswordSection.classList.remove('hidden')
}



    nextButton.addEventListener('click', async (e) => {
        e.preventDefault()
        if (nextButton.textContent === 'Submit') {

        
        
        
    }
 })

 const userName = document.getElementById('userName')
 const userEmail = document.getElementById('userEmail')
 const userPhone = document.getElementById('userPhone')
 const userNationality = document.getElementById('userNationality')
 const userState = document.getElementById('userState')
 const userPassword = document.getElementById('userPassword')

//  LoginDetails
const userLoginEmail = document.getElementById('userLoginEmail')
const userLoginPassword = document.getElementById('userLoginPassword')


// 

registrationForm.addEventListener('submit', async (e) => { 
    e.preventDefault()
    
    

    try {
        const registrationResponse = await fetch(`${configreg.apiUrl}/doveeysKitchen/api/registerUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName.value, 
                userEmail: userEmail.value, 
                userNationality: userNationality.value, 
                userState: userState.value, 
                userPassword: userPassword.value, 
                userPhone: userPhone.value
            })
        })

        
        if (!registrationResponse.ok) {
            const errorData = await registrationResponse.json();
            alert(errorData.message || "An error occurred during registration.");
            return;
        }
        
    
        const data = await registrationResponse.json()

        if (data.token) {
            
            // localStorage.setItem('token', data.token)
            localStorage.setItem('userName', data.user.userName),
            localStorage.setItem('userEmail', data.user.userEmail),
            localStorage.setItem('userPhone', data.user.userPhone)
            // window.location.href = '../htmlFolder/perpetualTaste.html'
            alert("Verification link sent to your email, verify to continue.");
        }

    } catch (error) {
        console.log(error);
        
    }

})

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        const loginResponse = await fetch(`${configreg.apiUrl}/doveeysKitchen/api/loginUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userEmail: userLoginEmail.value,
                userPassword: userLoginPassword.value
            })
        })

        console.log(userLoginEmail, userLoginPassword);
        
        console.log(loginResponse);

        if (!loginResponse.ok) {
            const errorData = await loginResponse.json();
            alert(errorData.message || "An error occurred during Sign In.");
            return;
        }
        
        const data = await loginResponse.json()
        console.log(data);

        if (data.user.isVerified === false) {
            alert('Please verify your email before logging in.');
            return;
        }
        
        if (data.token) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('userName', data.user.userName),
            localStorage.setItem('userEmail', data.user.userEmail)
            localStorage.setItem('userPhone', data.user.userPhone)
            window.location.href = '../htmlFolder/perpetualTaste.html'
        }
        
    } catch (error) {
        console.log(error);
        
    }
})



const forgottenPassForm = document.getElementById('forgottenPassForm')
const userRecoveryEmail = document.getElementById('userRecoveryEmail')
forgottenPassForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        const response = await fetch(`${configreg.apiUrl}/doveeysKitchen/api/4gotten-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ userEmail: userRecoveryEmail.value })
        })

        console.log(userRecoveryEmail.value);
        
        console.log(response);
        
    } catch (error) {
        console.log(error);
        // perfectaimersenterprise@gmail.com
    }
})