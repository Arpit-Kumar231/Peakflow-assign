"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  MoreHorizontal,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Plus,
} from "lucide-react";
import { Navbar } from "./navbar";

type Priority = "high" | "medium" | "low";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "new" | "ongoing" | "completed";
  priority: Priority;
  date?: string;
};

const PriorityIcon = ({ priority }: { priority: Priority }) => {
  switch (priority) {
    case "high":
      return <ArrowUp className="h-3 w-3 text-red-500" />;
    case "medium":
      return <ArrowRight className="h-3 w-3 text-yellow-500" />;
    case "low":
      return <ArrowDown className="h-3 w-3 text-green-500" />;
  }
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "FYR-2993",
      title: "Setup user authentication flow",
      description:
        "Implement user registration, login, and password reset functionality",
      status: "new",
      priority: "high",
      date: "2023-05-15",
    },
    {
      id: "FYR-2981",
      title: "Implement error handling for API requests",
      description:
        "Create a global error handling mechanism for all API requests",
      status: "new",
      priority: "medium",
      date: "2023-05-16",
    },
    {
      id: "FYR-3022",
      title: "Design system implementation",
      description:
        "Create and implement a consistent design system across the application",
      status: "ongoing",
      priority: "high",
      date: "2023-05-17",
    },
    {
      id: "FYR-3011",
      title: "Mobile responsive layouts",
      description: "Ensure all pages are fully responsive on mobile devices",
      status: "ongoing",
      priority: "medium",
      date: "2023-05-18",
    },
    {
      id: "FYR-2957",
      title: "Performance optimization",
      description:
        "Identify and resolve performance bottlenecks in the application",
      status: "ongoing",
      priority: "low",
      date: "2023-05-19",
    },
    {
      id: "FYR-3030",
      title: "User settings page",
      description: "Create a page for users to manage their account settings",
      status: "completed",
      priority: "medium",
      date: "2023-05-20",
    },
    {
      id: "FYR-2879",
      title: "Email notification system",
      description:
        "Implement a system for sending automated email notifications",
      status: "completed",
      priority: "low",
      date: "2023-05-21",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState<Task["status"]>("new");
  const [newTask, setNewTask] = useState<Omit<Task, "id" | "date">>({
    title: "",
    description: "",
    status: "new",
    priority: "medium",
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newTasks = Array.from(tasks);
    const [reorderedItem] = newTasks.splice(source.index, 1);
    reorderedItem.status = destination.droppableId as Task["status"];
    newTasks.splice(destination.index, 0, reorderedItem);

    setTasks(newTasks);
  };

  const handleNewTask = (status: Task["status"]) => {
    setNewTaskStatus(status);
    setIsDialogOpen(true);
  };

  const handleAddTask = () => {
    const newId = `FYR-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentDate = new Date().toISOString().split("T")[0];
    const taskToAdd: Task = {
      ...newTask,
      id: newId,
      date: currentDate,
      status: newTaskStatus,
    };
    setTasks([...tasks, taskToAdd]);
    setIsDialogOpen(false);
    setNewTask({
      title: "",
      description: "",
      status: "new",
      priority: "medium",
    });
  };

  const columns = [
    {
      id: "new",
      title: "New",
      tasks: tasks.filter((task) => task.status === "new"),
    },
    {
      id: "ongoing",
      title: "Ongoing",
      tasks: tasks.filter((task) => task.status === "ongoing"),
    },
    {
      id: "completed",
      title: "Completed",
      tasks: tasks.filter((task) => task.status === "completed"),
    },
  ];

  return (
    <div>
    <Navbar />
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-screen bg-[#0e0e0e] p-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex flex-col gap-3 p-4 rounded-lg ${
                    snapshot.isDraggingOver ? "bg-[#1e1f23]" : "bg-[#17181c]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold text-gray-100">
                        {column.title}
                      </h2>
                      <span className="text-sm text-gray-300">
                        {column.tasks.length}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-black border-gray-600"
                      onClick={() => handleNewTask(column.id as Task["status"])}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      New
                    </Button>
                  </div>
                  {column.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-[#17181c] border-gray-600 shadow-md transition-shadow duration-200 ${
                            snapshot.isDragging ? "shadow-lg" : ""
                          }`}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          <CardHeader className="flex flex-row items-center justify-between py-2 px-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-300">
                                {task.id}
                              </span>
                              <div className="flex items-center gap-1 text-xs text-gray-300">
                                <PriorityIcon priority={task.priority} />
                                <span className="capitalize">
                                  {task.priority}
                                </span>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-6 w-6 p-0 text-gray-300 hover:text-gray-100"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-[#17181c] text-gray-100"
                              >
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Move</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </CardHeader>
                          <CardContent className="py-2 px-3">
                            <h3 className="text-sm font-medium text-gray-100 mb-1">
                              {task.title}
                            </h3>
                            <p className="text-xs text-gray-400 mb-2">
                              {task.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Avatar className="h-5 w-5">
                                <AvatarImage
                                  src="/placeholder-user.jpg"
                                  alt="User avatar"
                                />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                              {task.date && (
                                <span className="text-xs text-gray-300">
                                  {task.date}
                                </span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#17181c] text-gray-100">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                className="col-span-3 bg-[#0e0e0e] border-gray-600 text-gray-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="col-span-3 bg-[#0e0e0e] border-gray-600 text-gray-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select
                value={newTask.priority}
                onValueChange={(value: Priority) =>
                  setNewTask({ ...newTask, priority: value })
                }
              >
                <SelectTrigger className="col-span-3 bg-[#0e0e0e] border-gray-600 text-gray-100">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-[#17181c] border-gray-600">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddTask}>
              Add Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DragDropContext>
    </div>
  );
}
