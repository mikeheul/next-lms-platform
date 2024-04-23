import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/lib/db";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// async function getCourses() {

//     const courses = await db.course.findMany({
//         orderBy: {
//             title: 'asc'
//         }
//     })

//     return courses;
// }

const CoursesPage = async () => {

    const { userId } = auth();

    if(!userId) return redirect("/")

    const courses = await db.course.findMany({
        where: {
            userId
        },
        orderBy: {
            isPublished: 'desc'
        }
    })

    return (
        <div>
            <div className="p-6">
                {/* <Link href="/teacher/create">
                    <Button>
                        New Course
                    </Button>
                </Link> */}

                <DataTable columns={columns} data={courses} />
            </div>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-4 p-6">
                {courses.map((course) => (
                    <Link
                        className="flex flex-col p-6 border border-slate-200 rounded-md hover:bg-slate-100 transition duration-500"
                        key={course.id}
                        href={`/teacher/courses/${course.id}`}
                    >
                        { course.title }
                    </Link>
                ))}
            </div> */}
        </div>
    );
}

export default CoursesPage;