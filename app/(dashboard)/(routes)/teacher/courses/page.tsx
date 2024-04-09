import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/lib/db";

async function getCourses() {

    const courses = await db.course.findMany({
        orderBy: {
            title: 'asc'
        }
    })

    return courses;
}

const CoursesPage = async () => {

    const courses = await getCourses();

    return (
        <div>
            <div className="p-6">
                <Link href="/teacher/create">
                    <Button>
                        New Course
                    </Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-4 p-6">
                {courses.map((course) => (
                    <Link
                        className="flex flex-col p-6 border border-slate-200 rounded-md hover:bg-slate-100 transition duration-500"
                        key={course.id}
                        href={`/teacher/courses/${course.id}`}
                    >
                        { course.title }
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CoursesPage;