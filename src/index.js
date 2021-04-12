import './sass/main.scss'
import superHeo from './components/part';

const user = {
    'name': 'David',
    'role': 'developer'
}

const additionalDesc = {
    ...user,
    'gender': 'male',
    'alias': superHeo(0)
}

console.log(user);
console.log(additionalDesc);