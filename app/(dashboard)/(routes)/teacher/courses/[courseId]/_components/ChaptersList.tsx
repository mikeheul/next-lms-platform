// Indicates the use of the Prisma client for database operations
"use client";

// Importing the Chapter type from the Prisma client
import { Chapter } from "@prisma/client";

// Importing useState and useEffect hooks from React
import { useState, useEffect } from "react";

// Importing drag and drop components from the "@hello-pangea/dnd" library
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult
} from "@hello-pangea/dnd";

// Importing the "cn" utility function from the utils module
import { cn } from "@/lib/utils";

// Importing Grip and Pencil icons from the "lucide-react" library
import { Grip, Pencil } from "lucide-react";

// Importing the Badge component from the ui module
import { Badge } from "@/components/ui/badge";

// Defining an interface for the props of the ChaptersList component
interface ChaptersListProps {
    // Declaring a prop named "items" which is an array of Chapter objects
    items: Chapter[];
    // Declaring a prop named "onReorder" which is a function to handle reordering
    onReorder: (updateDate: { id: string; position: number }[]) => void;
    // Declaring a prop named "onEdit" which is a function to handle editing
    onEdit: (id: string) => void;
}

// Declaring the ChaptersList component and destructuring its props
const ChaptersList = ({
    items,
    onReorder,
    onEdit
}: ChaptersListProps) => {

    // Declaring a state variable "isMounted" using the useState hook
    const [isMounted, setIsMounted] = useState(false);

    // Declaring a state variable "chapters" using the useState hook
    const [chapters, setChapters] = useState(items);

    // because drag n drop feature is not optimized for server-side rendering (hydration errors)
    useEffect(() => {
        // Effect hook to set isMounted to true when component mounts
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Effect hook to update chapters state when items prop changes
        setChapters(items);
    }, [items]);

    const onDragEnd = (result: DropResult) => {
        // Function to handle drag and drop end event
        if (!result.destination) return;

        const items = Array.from(chapters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updatedChapters = items.slice(startIndex, endIndex + 1);

        setChapters(items);
        
        const bulkUpdateData = updatedChapters.map((chapter) => ({
            // Mapping through updated chapters to generate bulk update data
            id: chapter.id,
            position: items.findIndex((item) => item.id === chapter.id)
        }));

        // Calling the onReorder function with the bulk update data
        onReorder(bulkUpdateData);
    };

    if (!isMounted) {
        // If the component is not yet mounted, return null
        return null;
    }

    return ( 
        // Returning JSX for rendering the ChaptersList component
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index) => (
                            <Draggable 
                                key={chapter.id} 
                                draggableId={chapter.id} 
                                index={index}>
                                    {(provided) => (
                                        <div className={cn("flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm", chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700")}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        >
                                            <div className={cn(
                                                "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                                                chapter.isPublished  && "border-r-sky-200 hover:bg-sky-200"
                                            )}
                                            {...provided.dragHandleProps}
                                            >
                                                <Grip 
                                                    className="h-5 w-5"
                                                />
                                            </div>
                                            {chapter.title}
                                            <div className="ml-auto pr-2 flex items-center gap-x-2">
                                                {chapter.isFree && (
                                                    <Badge className="text-slate-800 font-semibold bg-green-300 hover:bg-green-400">
                                                        Free
                                                    </Badge>
                                                )}
                                                <Badge className={cn(
                                                    "bg-slate-500",
                                                    chapter.isPublished && "bg-sky-700"
                                                )}>
                                                    {chapter.isPublished ? "Published" : "Draft"}
                                                </Badge>
                                                <Pencil 
                                                    onClick={() => onEdit(chapter.id)}
                                                    className="w-4 h-4 cursor-pointer hover:opacity-75"
                                                />
                                            </div>
                                        </div>
                                    )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ChaptersList; // Exporting the ChaptersList component as the default export
