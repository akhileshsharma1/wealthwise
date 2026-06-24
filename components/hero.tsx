import { getAllSettings } from "@/lib/site-actions"
import { Phone, Mail } from "lucide-react"
import HeroClient from "./hero-client"

export default async function Hero() {
  const s = await getAllSettings()
  return (
    <HeroClient
      headline={s.hero_headline ?? "Expert Financial"}
      headlineAccent={s.hero_headline_accent ?? "Advisory Services"}
      subtext={s.hero_subtext ?? "Wealthwise is a trusted financial advisory and consulting firm."}
      phone={s.hero_phone ?? "+977 9843066123"}
      email={s.hero_email ?? "info@wealthwise.com.np"}
      chairmanName={s.chairman_name ?? "CA Kinjal Puri"}
      chairmanTitle={s.chairman_title ?? "Chairman, WealthWise"}
      chairmanQuote={s.chairman_quote ?? ""}
      chairmanImage={s.chairman_image ?? "/images/chairman.jpg"}
    />
  )
}
