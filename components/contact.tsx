import { getAllSettings } from "@/lib/site-actions"
import ContactClient from "./contact-client"

export default async function Contact() {
  const s = await getAllSettings()
  const hoursLines = (s.contact_hours ?? "Sunday - Friday: 9:00 AM - 6:00 PM|Saturday: 10:00 AM - 4:00 PM")
    .split("|")
    .map((l) => l.trim())
    .filter(Boolean)

  return (
    <ContactClient
      phone={s.contact_phone ?? "+977 9843066123"}
      email={s.contact_email ?? "info@wealthwise.com.np"}
      address={s.contact_address ?? "Gyaneshwor-30, Kathmandu, Nepal"}
      hoursLines={hoursLines}
    />
  )
}
