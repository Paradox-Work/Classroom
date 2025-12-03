import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // ADDED: Missing import

export async function PATCH(
    req: Request,
    {params}: {params: {courseId: string}} // FIXED: Added missing closing brace
) {
    try{
        const {userId} = auth();
        const {courseId} = params;
        const values = await req.json();

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }
        const course = await db.course.update({
            where:{
                id: courseId,
                userId,
            },
            data:{ // FIXED: Changed 'date' to 'data'
                ...values
            },
        });
        return NextResponse.json(course);
    }
    catch(error){
        console.log("[COURSE_ID]", error); // ADDED: Brackets for consistency
        return new NextResponse("Internal error", { status: 500});
    }
}