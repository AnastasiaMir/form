import onChange from 'on-change';

const renderField = (state, elements, inputName) => {
    const errorsEntries = Object.entries(state.errors);
    if (state.errors[inputName].trim().length > 0) {
        elements.inputs[inputName].classList.remove('valid');
        elements.inputs[inputName].classList.add('invalid');
        elements.feedback.textContent = state.errors[inputName];
    } else {
        elements.feedback.textContent = '';
        elements.inputs[inputName].classList.remove('invalid');
        elements.inputs[inputName].classList.add('valid');
        errorsEntries.reverse().map(([input, value]) => {
            if (value.length > 0) {
                elements.feedback.textContent = state.errors[input];
            }
        })
    }
}
 

const initView = (state, elements) => onChange(state, (path, value) => {

    if (path.startsWith('errors.')) {
        const inputName = path.split('.')[1];
        renderField(state, elements, inputName);
        return;
    } 
    switch (path) {
        case 'formState':
            if (value === 'success') {
                const p = document.createElement('p');
                p.textContent = 'Ваши данные отправлены!';
                document.querySelector('.form-container').replaceChildren(p);
            }
            break;
        case 'formValid':
            if(value) {
                elements.button.removeAttribute('disabled');
            } else {
                elements.button.setAttribute('disabled', 'disabled');
            }
            break;
        case 'maxDate': 
            elements.inputs.birthDay.setAttribute('max', state.maxDate);
            break;
        default:
            renderField(state, elements, path);
    }
});


export default initView;