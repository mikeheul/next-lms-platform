import { Progress } from "./ui/progress";

interface CourseProgressProps {
    value: number;
    variant?: "default" | "success";
    size?: "default" | "sm"
}

const colorByVariant = {
    default: "text-sky-700",
    success: "text-emerald-700"
}

const sizeByVariant = {
    default: "text-sm",
    sm: "text-xs"
}

const CourseProgress = ({
    value,
    variant,
    size
}: CourseProgressProps) => {
    return (
        <div>
            <Progress 
                className="h-2"
                value={value}
            />
        </div>
    );
}

export default CourseProgress;