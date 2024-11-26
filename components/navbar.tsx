import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="bg-[#17181c] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-100">
          Kanban Board
        </Link>
        <div className="space-x-4">
          <Button variant="ghost" className="text-gray-100">
            Dashboard
          </Button>
          <Button variant="ghost" className="text-gray-100">
            Projects
          </Button>
          <Button variant="ghost" className="text-gray-100">
            Team
          </Button>
          <Button variant="outline" className="text-gray-100 border-gray-600">
            Profile
          </Button>
        </div>
      </div>
    </nav>
  )
}
