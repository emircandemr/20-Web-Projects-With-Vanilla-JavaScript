const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");


const showError = (input , message) => {

    const formControl = input.parentElement;
    formControl.className = "form-control error"
    formControl.childElement;
    const small = formControl.querySelector("small")
    small.innerText = message
}

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = "form-control success"
}

const validateEmail = (email) => {
    const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if(re.test(email.value.trim())){
        showSuccess(email)
    }
    else{
        showError(email,"Email is not valid")
    }

};

const checkRequired = (inputArr) => {
    inputArr.forEach(input => {
        const formControl = input.parentElement;
        const label = formControl.querySelector("label")
        if(input.value.trim() ==="") {
            showError(input, `${label.innerText} is required`)
        }
        else{
            showSuccess(input)
        }
    });

}

const checkPasswordMatch = (input1,input2) => {
    if(input1.value !== input2.value){
        showError(input2, "Password do not match")
    }
}


const checkLength = (input,min,max) => {
    const formControl = input.parentElement;
    const label = formControl.querySelector("label")
    if (input.value.length < min) {
        showError(input, `${label.innerText} must be at least ${min} characters `)
    }
    else if(input.value.length > max){
        showError(input, `${label.innerText} must be less than ${max} characters `)
    }
    else{
        showSuccess(input)
    }
}

form.addEventListener("submit" , (e) => {
    e.preventDefault();
    checkRequired([username,email,password,password2])
    checkLength(username,3,15);
    checkLength(password,6,25);
    validateEmail(email)
    checkPasswordMatch(password,password2)
})