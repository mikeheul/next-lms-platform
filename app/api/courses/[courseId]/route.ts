import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string }} // courseId like folder name "courseId"
) {
    try {
        // Extracting userId from the auth object
        const { userId } = auth();
        // Extracting courseId from the params object
        const { courseId } = params;
        // Parsing JSON data from the request body
        const values = await req.json();

        // If userId is falsy, return Unauthorized response
        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // Updating the course in the database
        const course = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...values,
            }
        })

        // Returning JSON response with the updated course
        return NextResponse.json(course);

    } catch (error) {
        console.log("[COURSE_ID", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}