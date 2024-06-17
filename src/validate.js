const getAge =(dateString) => {
    let birth = new Date(dateString);
    let now = new Date();
    let beforeBirth = ((() => {birth.setDate(now.getDate());birth.setMonth(now.getMonth()); return birth.getTime()})() < birth.getTime()) ? 0 : 1;
    return now.getFullYear() - birth.getFullYear() - beforeBirth;
};

const validateFistName = (data) => ((/^([A-Za-z\-\']{2,15})|([А-Яа-я\-\']{2,15})$/).test(data.trim()) ? true : new Error('Имя должно содержать только буквы, символы \' и -, длина должна быть от 2 до 15 букв'));
const validateLastName = (data) => ((/^([A-Za-z\-\']{2,24})|([А-Яа-я\-\']{2,24})$/).test(data.trim()) ? true : new Error('Фамилия должна содержать только буквы, символы \' и -, длина должна быть от 2 до 24 букв'));
const validateEmail = (data) => ((/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i).test(data) ? true :  new Error ('Введите корректный email!'));
const validatePassword = (data) => ((/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).test(data) ? true :  new Error ('Минимальная длина пароля - 8 символов. Пароль должен содержать минимум одну цифру, по одной заглавной и строчную буквы и один символ'));
const validatePasswordConfirm = (confirmPassword, password) => (confirmPassword===password ? true : new Error('Пароли должны совпадать!'));
const validateAge = (data) =>{
    const result = (getAge(data) >= 18) ? true : new Error('Ваш возраст должен быть не менее 18 лет!');
    return result;
};

const validate = (state, inputName) => {
    switch (inputName) {
        case 'firstName':
            return validateFistName(state[inputName]);
        case 'lastName':
            return validateLastName(state[inputName]);
        case 'email':
            return validateEmail(state[inputName]);
        case 'password': 
            return validatePassword(state[inputName]);
        case 'confirmPassword': 
            return validatePasswordConfirm(state[inputName], state.password);
        case 'birthDay': 
            return validateAge(state[inputName]);
    }
}


export default validate;