import { permissionGroupSeed } from "./seeds/permission-group-seed"
import { permissionSeed } from "./seeds/permission-seed"
import { prisma } from "@db/singleton"

export async function main() {
  const seeds = [
    permissionGroupSeed,
    permissionSeed
  ]

  for (const seed of seeds) {
    await seed()
  }
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