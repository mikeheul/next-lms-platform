import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import CoursesList from "@/components/CoursesList";
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Dashboard() {

  const { userId } = auth();

  if(!userId) return redirect("/")

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId)

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          {/* info card */}
        </div>
        <div>
          {/* info card */}
        </div>
      </div>
      <CoursesList 
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  );
}
