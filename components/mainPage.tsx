"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ArrowUp, ArrowRight, ArrowDown } from 'lucide-react'

type Priority = "high" | "medium" | "low"

type Task = {
  id: string
  title: string
  description: string
  status: "new" | "ongoing" | "completed"
  priority: Priority
  date?: string
}

const PriorityIcon = ({ priority }: { priority: Priority }) => {
  switch (priority) {
    case "high":
      return <ArrowUp className="h-3 w-3 text-red-500" />
    case "medium":
      return <ArrowRight className="h-3 w-3 text-yellow-500" />
    case "low":
      return <ArrowDown className="h-3 w-3 text-green-500" />
  }
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "FYR-2993",
      title: "Setup user authentication flow",
      description: "Implement user registration, login, and password reset functionality",
      status: "new",
      priority: "high",
    },
    {
      id: "FYR-2981",
      title: "Implement error handling for API requests",
      description: "Create a global error handling mechanism for all API requests",
      status: "new",
      priority: "medium",
    },
    {
      id: "FYR-3022",
      title: "Design system implementation",
      description: "Create and implement a consistent design system across the application",
      status: "ongoing",
      priority: "high",
    },
    {
      id: "FYR-3011",
      title: "Mobile responsive layouts",
      description: "Ensure all pages are fully responsive on mobile devices",
      status: "ongoing",
      priority: "medium",
    },
    {
      id: "FYR-2957",
      title: "Performance optimization",
      description: "Identify and resolve performance bottlenecks in the application",
      date: "Nov 8",
      status: "ongoing",
      priority: "low",
    },
    {
      id: "FYR-3030",
      title: "User settings page",
      description: "Create a page for users to manage their account settings",
      status: "completed",
      priority: "medium",
    },
    {
      id: "FYR-2879",
      title: "Email notification system",
      description: "Implement a system for sending automated email notifications",
      status: "completed",
      priority: "low",
    },
  ])

  const onDragEnd = (result) => {
    const { source, destination } = result

    if (!destination) {
      return
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const newTasks = Array.from(tasks)
    const [reorderedItem] = newTasks.splice(source.index, 1)
    reorderedItem.status = destination.droppableId as Task['status']
    newTasks.splice(destination.index, 0, reorderedItem)

    setTasks(newTasks)
  }

  const columns = [
    { id: 'new', title: "New", tasks: tasks.filter(task => task.status === 'new') },
    { id: 'ongoing', title: "Ongoing", tasks: tasks.filter(task => task.status === 'ongoing') },
    { id: 'completed', title: "Completed", tasks: tasks.filter(task => task.status === 'completed') },
  ]

  return (
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
                    snapshot.isDraggingOver ? 'bg-[#1e1f23]' : 'bg-[#17181c]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-100">{column.title}</h2>
                    <span className="text-sm text-gray-300">{column.tasks.length}</span>
                  </div>
                  {column.tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-[#17181c] border-gray-600 shadow-md transition-shadow duration-200 ${
                            snapshot.isDragging ? 'shadow-lg' : ''
                          }`}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                        >
                          <CardHeader className="flex flex-row items-center justify-between py-2 px-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-300">{task.id}</span>
                              <div className="flex items-center gap-1 text-xs text-gray-300">
                                <PriorityIcon priority={task.priority} />
                                <span className="capitalize">{task.priority}</span>
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
                              <DropdownMenuContent align="end" className="bg-[#17181c] text-gray-100">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Move</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400">Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </CardHeader>
                          <CardContent className="py-2 px-3">
                            <h3 className="text-sm font-medium text-gray-100 mb-1">{task.title}</h3>
                            <p className="text-xs text-gray-400 mb-2">{task.description}</p>
                            <div className="flex items-center justify-between">
                              <Avatar className="h-5 w-5">
                                <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                              {task.date && (
                                <span className="text-xs text-gray-300">{task.date}</span>
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
    </DragDropContext>
  )
}

