import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { userId } = await auth();  // Destructure from auth()
        const { title } = await request.json();  // Destructure from JSON
    
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.create({
            data: {
                userId,
                title,
            }
        });

        return NextResponse.json(course);  // ← Return the created course

    } catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}