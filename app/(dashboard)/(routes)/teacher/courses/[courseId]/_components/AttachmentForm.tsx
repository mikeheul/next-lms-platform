"use client";

// Importing Zod library for schema validation
import * as z from "zod";
// Importing Axios for making HTTP requests
import axios from "axios";
// Importing Button component for form buttons
import { Button } from "@/components/ui/button";
// Importing Pencil icon from lucide-react
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
// Importing useState hook for managing component state
import { useState } from "react";
// Importing toast for displaying notifications
import toast from "react-hot-toast";
// Importing useRouter hook from next/navigation for navigating within the application
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/FileUpload";

import Image from "next/image";

// Define props interface for DescriptionForm component
interface AttachmentFormProps {
    initialData: Course & { attachments: Attachment[] };
    courseId: string;
}

// Defining form schema using Zod
const formSchema = z.object({
    imageUrl : z.string().min(1, {
        message: "Image is required"
    })
});

// Define the DescriptionForm component
const AttachmentForm = ({
    initialData,
    courseId
}: AttachmentFormProps) => {

    // State variable for controlling editing mode
    const [isEditing, setIsEditing] = useState(false);

    // Function to toggle editing mode
    const toggleEdit = () => setIsEditing((current) => !current);

    // useRouter hook for navigation
    const router = useRouter();

    // Function to handle form submission
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Sending PATCH request to update course
            await axios.patch(`/api/courses/${courseId}`, values);
            // Displaying success notification
            toast.success("Image updated !");
            // Exiting edit mode
            toggleEdit();
            // Refreshing page
            router.refresh();
        } catch {
            // Displaying error notification
            toast.error("Something went wrong");
        }
    };

    // Rendering JSX for DescriptionForm component
    return ( 
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course attachments
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}

                    {!isEditing && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add a file
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image 
                            alt="Upload"
                            fill
                            className="object-cover rounded-md"
                            src={initialData.imageUrl}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload 
                        endpoint="courseImage"
                        onChange={(url) => {
                            if(url) {
                                onSubmit({ imageUrl: url })
                            }
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommanded
                    </div>
                </div>
            )}
        </div>
    );
}

// Export the DescriptionForm component as the default export
export default AttachmentForm;