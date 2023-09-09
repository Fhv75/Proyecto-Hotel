const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log(faker.phone.number())
    console.log(faker.internet.email())
    console.log(faker.internet.password())
    // Poblar la tabla cliente
    for (let i = 0; i < 30; i++) {
      await prisma.cliente.create({
        data: {
          email: faker.internet.email(),
          pass: faker.internet.password(),
          nombre: faker.person.firstName(),
          telefono: faker.phone.number(),
          rol: "user"
        },
      });
    }

    // Poblar la tabla habitacion
    for (let i = 0; i < 30; i++) {
      await prisma.habitacion.create({
        data: {
          numero: i + 1,
          piso: faker.number.int({ min: 1, max: 10 }),
          tipo: faker.helpers.arrayElement(['Individual', 'Doble', 'Suite']),
          descripcion: faker.lorem.sentence(),
          costodia: faker.finance.amount(50, 300, 2),
        },
      });
    }

    console.log('Datos de prueba insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();