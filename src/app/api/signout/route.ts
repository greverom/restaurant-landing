import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {

    const cookiesHandler = await cookies();
    cookiesHandler.delete("isLogged");
    cookiesHandler.delete("user");

    return NextResponse.json({ success: true });
}