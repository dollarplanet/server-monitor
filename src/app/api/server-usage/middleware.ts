import { unauthorizedResponse } from "@/helper/responses";
import { MiddlewareBase } from "@/middleware-config/middleware-base";
import { prisma } from "@db/singleton";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export class ServerUsagePostMiddleware extends MiddlewareBase {
  protected readonly path: string = "/api/server-usage";

  protected async action() {
    // Get headers
    const header = await headers();
    const headerToken = header.get("token");
    const machine = header.get("machineId");

    // Cek header ada
    if (!headerToken || !machine) return unauthorizedResponse;

    // Get machine data dari db
    const machineData = await prisma.machine.findUnique({ where: { id: machine } })
    if (!machineData) return NextResponse.json({ message: "Machine not found" }, { status: 404 });

    // Throw kalo token salah
    if (headerToken !== machineData.token) return unauthorizedResponse;

    return undefined;
  }
}