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
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

// Importing Button component for form buttons
import { Button } from "@/components/ui/button";
// Importing Pencil icon from lucide-react
import { Pencil } from "lucide-react";
// Importing useState hook for managing component state
import { useState } from "react";
// Importing toast for displaying notifications
import toast from "react-hot-toast";
// Importing useRouter hook from next/navigation for navigating within the application
import { useRouter } from "next/navigation";
// Importing cn function from "@/lib/utils" for conditional classnames
import { cn } from "@/lib/utils";
import Editor from "@/components/Editor";

import { Chapter } from "@prisma/client";
import Preview from "@/components/Preview";

import { Checkbox } from "@/components/ui/checkbox";

// Define props interface for ChapterAccessForm component
interface ChapterAccessFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
}

// Defining form schema using Zod
// Zod is designed to be as developer-friendly as possible. The goal is to eliminate duplicative type declarations. With Zod, you declare a validator once and Zod will automatically infer the static TypeScript type. It's easy to compose simpler types into complex data structures.
const formSchema = z.object({
    isFree: z.boolean().default(false)
});

// Define the ChapterAccessForm component
const ChapterAccessForm = ({
    initialData,
    courseId,
    chapterId
}: ChapterAccessFormProps) => {

    // State variable for controlling editing mode
    const [isEditing, setIsEditing] = useState(false);

    // Function to toggle editing mode
    const toggleEdit = () => setIsEditing((current) => !current);

    // useRouter hook for navigation
    const router = useRouter();

    // useForm hook for managing form state
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isFree: !!initialData.isFree
        }
    });

    // Destructuring formState properties
    const { isSubmitting, isValid } = form.formState;

    // Function to handle form submission
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Sending PATCH request to update course
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            // Displaying success notification
            toast.success("Chapter updated !");
            // Exiting edit mode
            toggleEdit();
            // Refreshing page
            router.refresh();
        } catch {
            // Displaying error notification
            toast.error("Something went wrong");
        }
    };

    // Rendering JSX for ChapterAccessForm component
    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter access
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit access
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.isFree && "text-slate-500 italic"
                )}>
                    {initialData.isFree ? (
                        <>This chapter is free for preview</>
                    ) : (
                        <>This chapter is not free</>
                    )}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField 
                            control={form.control}
                            name="isFree"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox 
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormDescription>
                                            Check this box if you want to make this chapter free for preview
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}

// Export the ChapterAccessForm component as the default export
export default ChapterAccessForm;