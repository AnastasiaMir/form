import './style.css';
import validate from './validate.js';
import initView from './view.js';



const elements = {
    form: document.querySelector('form'),
    feedback: document.querySelector('.feedback'),
    button: document.querySelector('button'),
    inputs: {
        firstName: document.querySelector('#first-name'),
        lastName: document.querySelector('#last-name'),
        email: document.querySelector('#email'),
        password: document.querySelector('#password'),
        confirmPassword: document.querySelector('#password-confirm'),
        birthDay: document.querySelector('#birth-day'),
    }
}


const state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDay: '',
    errors: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDay: '',
    },
    formValid: null,
    maxDate: '',
    formState: 'filling',
}

const inputNames = Object.keys(elements.inputs)

const validateFields = (currentState) => {
    const validationResult = inputNames.map((input) => validate(currentState, input))
    .filter((data) => data!== true);
    return validationResult.length > 0 ? false : true;
}

  
const watchedState = initView(state, elements);

document.addEventListener('DOMContentLoaded', (e) => {
    const currentDate = new Date();
    const maxDateFormat = currentDate.toISOString().split('T')[0];
    watchedState.maxDate = maxDateFormat;
})

Object.values(elements.inputs).forEach((input) => {
    input.addEventListener('input', (e) => {
        e.preventDefault();
        watchedState[e.target.name] = e.target.value;
    })
})

Object.values(elements.inputs).forEach((input) => {
    const errors = Object.values(state.errors).join('').length;

    input.addEventListener('change', (e) => {
        e.preventDefault();
        e.target.addEventListener('input', (e) => {
            e.preventDefault();
            const result = validate(state, input.name);
            if (result !== true) {
                watchedState.errors[input.name] = result.message;
            } else {
                watchedState.errors[input.name] = '';
            }
            watchedState.formValid = validateFields(state);
        })
        const result = validate(state, input.name);
        if (result !== true) {
            watchedState.errors[input.name] = result.message;
        } else {
            watchedState.errors[input.name] = '';
        }
        watchedState.formValid = validateFields(state);
        
    })
})

elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.formState = "success";
})


