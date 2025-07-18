import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Users } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto shadow-xl border-0">
          <CardContent className="p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <Users className="h-12 w-12 text-white" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">Team Member Not Found</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {
                "Sorry, we couldn't find the team member you're looking for. They may have been moved or the link might be incorrect."
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#team">
                <Button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Team
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Go to Homepage</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
