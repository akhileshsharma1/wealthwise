import { getAllServices } from "@/lib/services-actions"
import ServicesClient from "./services-client"

export default async function Services() {
  const services = await getAllServices()
  return <ServicesClient services={services} />
}
