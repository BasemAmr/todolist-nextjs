import { PrismaClient } from '@prisma/client'
import {faker} from '@faker-js/faker'

const prisma = new PrismaClient()
async function main() {

  // for (let i = 0; i < 25; i++) {
  //   await prisma.user.upsert({
  //     where: { email: faker.internet.email() },
  //     update: {},
  //     create: {
  //       email: faker.internet.email() ,
  //       name: faker.internet.username(),
  //       posts: {
  //         create: {
  //           title: faker.book.title(),
  //           content: faker.lorem.paragraph(),
  //           published: true,
  //         },
  //       },
  //     },
  //   })
  // }

  await prisma.todo.createMany({
    data: Array.from({ length: 10 }, () => ({
      title: faker.lorem.words(),
      body: faker.lorem.paragraph(),
      completed: faker.datatype.boolean(),
    })),
  })

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })