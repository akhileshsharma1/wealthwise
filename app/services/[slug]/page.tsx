import { services } from "@/lib/services-data"
import { slugify } from "@/lib/utils"
import { notFound } from "next/navigation"
import ServiceDetailPageClient from "./ServiceDetailPageClient"

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: slugify(service.title),
  }))
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => slugify(s.title) === params.slug)

  if (!service) {
    notFound()
  }

  return <ServiceDetailPageClient params={params} />
}
