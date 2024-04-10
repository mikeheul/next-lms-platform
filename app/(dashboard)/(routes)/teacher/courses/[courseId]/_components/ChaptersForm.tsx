"use client";

// Importing Zod library for schema validation
import * as z from "zod";
// Importing Axios for making HTTP requests
import axios from "axios";
// Importing zodResolver from "@hookform/resolvers/zod" for integrating Zod schema validation with React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";
// Importing React Hook Form for managing form state
import { useForm } from "react-hook-form";

// Importing UI components for form styling
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

// Importing Button component for form buttons
import { Button } from "@/components/ui/button";
// Importing Pencil icon from lucide-react
import { PlusCircle, Loader2 } from "lucide-react";
// Importing useState hook for managing component state
import { useState } from "react";
// Importing toast for displaying notifications
import toast from "react-hot-toast";
// Importing useRouter hook from next/navigation for navigating within the application
import { useRouter } from "next/navigation";
// Importing cn function from "@/lib/utils" for conditional classnames
import { cn } from "@/lib/utils";

import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import ChaptersList from "./ChaptersList";

// Define props interface for ChaptersForm component
interface ChaptersFormProps {
    initialData: Course & { chapters: Chapter[] };
    courseId: string;
}

// Defining form schema using Zod
const formSchema = z.object({
    title: z.string().min(1),
});

// Define the ChaptersForm component
const ChaptersForm = ({
    initialData,
    courseId
}: ChaptersFormProps) => {

    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // Function to toggle editing mode
    const toggleCreating = () => setIsCreating((current) => !current);

    // useRouter hook for navigation
    const router = useRouter();

    // useForm hook for managing form state
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    });

    // Destructuring formState properties
    const { isSubmitting, isValid } = form.formState;

    // Function to handle form submission
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Sending PATCH request to update course
            await axios.post(`/api/courses/${courseId}/chapters`, values);
            // Displaying success notification
            toast.success("Chapter created !");
            // Exiting edit mode
            toggleCreating();
            // Refreshing page
            router.refresh();
        } catch {
            // Displaying error notification
            toast.error("Something went wrong");
        }
    };

    const onReorder = async (updateData: { id: string; position: number; }[]) => {
        try {
            setIsUpdating(true);
            await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
                list: updateData
            })
            toast.success("Chapters reordered successfully")
            router.refresh();
        } catch (error) {   
            toast.error("Something went wrong")
        } finally {
            setIsUpdating(false);
        }
    }

    const onEdit = (id: string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`);
    }

    // Rendering JSX for ChaptersForm component
    return ( 
        <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
            {isUpdating && (
                <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
                    <Loader2 
                        className="animate-spin h-6 w-6 text-sky-700"
                    />
                </div>
            )}
            <div className="font-medium flex items-center justify-between">
                Course chapters
                <Button onClick={toggleCreating} variant="ghost">
                    {isCreating ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add a chapter
                        </>
                    )}
                </Button>
            </div>
            {isCreating && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField 
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Introduction to the course'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                        >
                            Create
                        </Button>    
                    </form>
                </Form>
            )}
            {!isCreating && (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.chapters.length && "text-slate-500 italic"
                )}>
                    {!initialData.chapters.length && "No chapters"}
                    <ChaptersList 
                        onEdit={onEdit}
                        onReorder={onReorder}
                        items={initialData.chapters || []}
                    />
                </div>
            )}
            {!isCreating && (
                <p className="text-xs text-muted-foreground mt-4">
                    Drag and drop to reorder the chapters
                </p>
            )}

        </div>
    );
}

// Export the ChaptersForm component as the default export
export default ChaptersForm;