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
            <div className="grid grid-cols-3 gap-x-2 gap-y-4 p-6">
                {courses.map((course) => (
                    <Link
                        className="flex flex-col p-6 border border-slate-200 rounded-md"
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