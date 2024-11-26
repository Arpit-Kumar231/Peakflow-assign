"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, LinkIcon, Paperclip } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function TaskDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState(
    "Bug related to not being able to change text after selecting a pre written prompt"
  );
  const [description, setDescription] = useState("Add description...");
  const [comment, setComment] = useState("");

  return (
    <div className="min-h-screen bg-[#0e0e0e]">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          className="mb-6 text-gray-400 hover:text-gray-300"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Board
        </Button>

        <div className="space-y-6">
          <div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-4xl font-bold bg-transparent border-0 p-0 focus-visible:ring-0 text-gray-100"
            />
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
              <span>{params.id}</span>
              <span>•</span>
            </div>
          </div>

          <Card className="bg-[#17181c] border-gray-600">
            <div className="p-4">
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px] bg-transparent border-0 p-0 focus-visible:ring-0 text-gray-300"
              />
            </div>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-100">Activity</h3>

            <div className="flex items-start gap-3 pt-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Leave a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px] bg-[#17181c] border-gray-600 text-gray-100"
                />
                <div className="mt-2 flex justify-end">
                  <Button>Comment</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
