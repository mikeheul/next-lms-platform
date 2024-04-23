// Importing the db object from the "@/lib/db" module
import { db } from "@/lib/db";
// Importing the auth object from the "@clerk/nextjs" module
import { auth } from "@clerk/nextjs";
// Importing the NextResponse object from the "next/server" module
import { NextResponse } from "next/server";

import Mux from "@mux/mux-node";

import { isTeacher } from "@/lib/teacher";

const { video } = new Mux({
    tokenId: process.env.MUX_TOKEN_ID, 
    tokenSecret: process.env.MUX_TOKEN_SECRET
});

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string }} // courseId like folder name "courseId"
) {
    try {
        const { userId } = auth();
        
        if(!userId || !isTeacher(userId)) { return new NextResponse("Unauthorized", { status: 401 }) }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            },
            include: {
                chapters: {
                    include: {
                        muxData: true
                    }
                }
            }
        })

        if(!course) { return new NextResponse("Course not found", { status: 404 }) }

        for(const chapter of course.chapters) {
            if(chapter.muxData?.assetId) {
                await video.assets.delete(chapter.muxData.assetId)
            }
        }

        const deletedCourse = await db.course.delete({
            where: {
                id: params.courseId
            }
        })

        return NextResponse.json(deletedCourse)
    
    } catch (error) {
        console.log("[COURSE_ID_DELETE", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

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
        if(!userId || !isTeacher(userId)) {
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