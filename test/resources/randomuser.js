import { faker } from '@faker-js/faker';

class RandomUser {

    username = faker.internet.userName();
    password = faker.internet.password();
    zipcode = faker.location.zipCode();
    firstname = faker.person.firstName();
    lastname = faker.person.lastName();
}

export default RandomUser;