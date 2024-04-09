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
import { Pencil } from "lucide-react";
// Importing useState hook for managing component state
import { useState } from "react";
// Importing toast for displaying notifications
import toast from "react-hot-toast";
// Importing useRouter hook from next/navigation for navigating within the application
import { useRouter } from "next/navigation";
// Importing cn function from "@/lib/utils" for conditional classnames
import { cn } from "@/lib/utils";

import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";

// Define props interface for DescriptionForm component
interface CategoryFormProps {
    initialData: Course;
    courseId: string;
    options: { label: string; value: string; }[];
}

// Defining form schema using Zod
const formSchema = z.object({
    categoryId: z.string().min(1)
});

// Define the CategoryForm component
const CategoryForm = ({
    initialData,
    courseId,
    options
}: CategoryFormProps) => {

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
            categoryId: initialData?.categoryId || ""
        }
    });

    // Destructuring formState properties
    const { isSubmitting, isValid } = form.formState;

    // Function to handle form submission
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Sending PATCH request to update course
            await axios.patch(`/api/courses/${courseId}`, values);
            // Displaying success notification
            toast.success("Course updated !");
            // Exiting edit mode
            toggleEdit();
            // Refreshing page
            router.refresh();
        } catch {
            // Displaying error notification
            toast.error("Something went wrong");
        }
    };

    const selectedOption = options.find((option) => option.value === initialData.categoryId)

    // Rendering JSX for DescriptionForm component
    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course category
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit category
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.categoryId && "text-slate-500 italic"
                )}>
                    {selectedOption?.label || "No category"}
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
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                    <Combobox
                                        options={...options}
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormMessage />
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

// Export the DescriptionForm component as the default export
export default CategoryForm;