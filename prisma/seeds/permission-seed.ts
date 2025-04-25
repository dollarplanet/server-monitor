import { permissionEnum, permissionGroupEnum } from "@/generated/prisma";
import { prisma } from "@db/singleton";

export async function permissionSeed() {
  const meta = new Map<permissionEnum, {label: string, group: permissionGroupEnum}>([
    [permissionEnum.DASHBOARD_VIEW, {
      label: "View",
      group: permissionGroupEnum.DASHBOARD
    }],
  ]);

  for(const permission of Object.values(permissionEnum)) {
    const data = meta.get(permission);
    if (data !== undefined) {
      await prisma.permission.upsert({
        where: {
          id: permission
        },
        update: {},
        create: {
          id: permission,
          label: data.label,
          permissionGroupId: data.group
        }
      });
    }
  }
}