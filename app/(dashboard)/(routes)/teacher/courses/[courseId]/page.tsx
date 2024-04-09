// Importing the IconBadge component from the "@/components/icon-badge" module
import { IconBadge } from "@/components/icon-badge";
// Importing the db object from the "@/lib/db" module
import { db } from "@/lib/db";
// Importing the auth object from the "@clerk/nextjs" module
import { auth } from "@clerk/nextjs";
// Importing the LayoutDashboard icon from the "lucide-react" module
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
// Importing the redirect function from the "next/navigation" module
import { redirect } from "next/navigation";
// Importing the TitleForm component from the "./_components/TitleForm" module
import TitleForm from "./_components/TitleForm";
// Importing the DescriptionForm component from the "./_components/DescriptionForm" module
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceForm";

// Define the CourseIdPage component as an async function
const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {

    // Extracting userId from the auth object
    const { userId } = auth();
    // If userId is falsy, redirect to the home page
    if(!userId) {
        return redirect("/")
    }

    // Finding the course with the given courseId from the database
    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        }
    });

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        },
    })

    // If course is not found, redirect to the home page
    if(!course) {
        return redirect("/")
    }

    // List of required fields for the course
    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
    ];

    // Calculating the total number of required fields and completed fields
    const totalFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length

    // Generating completion text
    const completionText = `(${completedFields}/${totalFields})`

    // Return JSX for the CourseIdPage component
    return ( 
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Course setup</h1>
                    <span className="text-sm text-slate-700">Complete all fields {completionText}</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                {/* 1st section */}
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge 
                            icon={LayoutDashboard}
                        />
                        <h2 className="text-xl">Customize your course</h2>
                    </div>
                    <TitleForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <DescriptionForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <ImageForm
                        initialData={course}
                        courseId={course.id}
                    />
                    <CategoryForm
                        initialData={course}
                        courseId={course.id}
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                        }))}
                    />
                </div>
                {/* 2nd section */}
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-xl">
                                Course chapters
                            </h2>
                        </div>
                        <div>
                            TODO: Chapters
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={CircleDollarSign} />
                            <h2 className="text-xl">
                                Sell your course
                            </h2>
                        </div>
                        <PriceForm 
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export the CourseIdPage component as the default export
export default CourseIdPage;