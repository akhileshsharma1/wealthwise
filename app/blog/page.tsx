import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogList from "@/components/blog-list"

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <BlogList />
      </div>
      <Footer />
    </main>
  )
}
