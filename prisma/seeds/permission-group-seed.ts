import { permissionGroupEnum } from "@/generated/prisma";
import { prisma } from "@db/singleton";

export async function permissionGroupSeed() {
  const labels = new Map<permissionGroupEnum, string>([
    [permissionGroupEnum.DASHBOARD, "Dashboard"],
  ]);

  for(const permissionGroup of Object.values(permissionGroupEnum)) {
    const label = labels.get(permissionGroup);
    if (label !== undefined) {
      await prisma.permissionGroup.upsert({
        where: {
          id: permissionGroup
        },
        update: {},
        create: {
          id: permissionGroup,
          label: label,
        }
      });
    }
  }
}