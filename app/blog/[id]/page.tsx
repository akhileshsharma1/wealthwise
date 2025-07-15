import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogPost from "@/components/blog-post"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        <BlogPost postId={params.id} />
      </div>
      <Footer />
    </main>
  )
}
