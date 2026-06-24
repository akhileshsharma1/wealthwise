import { getAllSettings } from "@/lib/site-actions"
import FooterClient from "./footer-client"

export default async function Footer() {
  const s = await getAllSettings()
  return (
    <FooterClient
      description={s.footer_description ?? "Trusted financial advisory and consulting firm."}
      phone={s.contact_phone ?? "+977 9843066123"}
      email={s.contact_email ?? "info@wealthwise.com.np"}
      address={s.contact_address ?? "Gyaneshwor-30, Kathmandu, Nepal"}
      facebookUrl={s.social_facebook ?? "#"}
      twitterUrl={s.social_twitter ?? "#"}
      linkedinUrl={s.social_linkedin ?? "#"}
      instagramUrl={s.social_instagram ?? "#"}
    />
  )
}