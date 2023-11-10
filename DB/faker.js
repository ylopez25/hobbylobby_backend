import { faker } from '@faker-js/faker';
//const randomName = faker.person.fullName();

const numberofSeed = 25;

function randomEmailFunction(numberofSeed) {
    for(let i =0; i < numberofSeed;i++) {
        let randomEmail= faker.internet.email(); 
        return randomEmail
    }
}
module.exports = {randomEmailFunction}