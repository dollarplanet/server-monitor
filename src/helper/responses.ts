import { NextResponse } from "next/server";

export const unauthorizedResponse = NextResponse.json({ message: "Machine not found" }, { status: 401 });
export const successResponse = NextResponse.json({ message: "Success" }, { status: 200 });
export const notValid = NextResponse.json({ message: "Data not valid" }, { status: 400 });