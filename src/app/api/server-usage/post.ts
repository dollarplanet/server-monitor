import { InferInput, safeParseAsync } from "valibot";
import { serverUsagePostScheme } from "./scheme";
import { prisma } from "@db/singleton";
import { notValid, successResponse } from "@/helper/responses";

export async function POST(request: Request) {
  const data: InferInput<typeof serverUsagePostScheme> = await request.json();

  // check request
  const {success} = await safeParseAsync(serverUsagePostScheme, data);
  if(!success) return notValid;

  // simpan data ke db
  await prisma.usage.create({data: data});

  return successResponse;
}