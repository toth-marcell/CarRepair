import { faker } from "@faker-js/faker";
import { CarModel, Customer, Job } from "./models.js";

const customers = [];

for (let i = 0; i < 10; i++) {
  customers.push(
    await Customer.create({
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      birthDate: faker.date.birthdate(),
      phone: faker.phone.number(),
    })
  );
}

const carModels = [];

for (let i = 0; i < 10; i++) {
  carModels.push(
    await CarModel.create({
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      year: faker.date.past({ years: 20 }).getFullYear(),
      type: faker.vehicle.type(),
    })
  );
}

for (let i = 0; i < 10; i++) {
  Job.create({
    description: "broken " + faker.word.noun(),
    price: faker.number.int({ min: 1, max: 1000 }),
    licensePlate: faker.vehicle.vrm(),
    deadline: faker.date.future(),
    CustomerId: faker.helpers.arrayElement(customers).id,
    CarModelId: faker.helpers.arrayElement(carModels).id,
  });
}
