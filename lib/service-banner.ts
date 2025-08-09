export const serviceBanners: Record<string, string> = {
  "tax-planning-compliance":
    "https://finaccountants.com/wp-content/uploads/2023/09/Types-of-Tax-Planning-3-1-1-1-1-1-1-1-1-1.png",
  "accounting-services":
    "https://singaporeaccounting.com/wp-content/uploads/2016/03/Accounting-Services-Provider-Services.jpg",
  "payroll-management": "/images/payroll.jpg",
  "business-registration": "https://www.iedunote.com/img/23682/company-registration-scaled.jpg",
  "business-valuation":
    "https://www.propertypriceadvice.co.uk/wp-content/uploads/2022/01/How-long-does-a-mortgage-valuation-take-2048x1047.jpg",
  "compliance-services":
    "https://www.exportsolutionsinc.com/wp-content/uploads/2019/08/compliance-programs-us-government-agencies.jpg",
  "representation-services":
    "https://www.acelogicsolutions.com/wp-content/uploads/2020/01/Business-Representation-Slider-3.jpg",
  "deregistration-services": "https://imranassociates.com/wp-content/uploads/2023/12/deregistration.png",
  "mortgage-facilitation-servicesaustralia":
    "https://media.istockphoto.com/id/182470004/photo/approved-mortgage-application-form-with-a-calculator-and-pen.jpg?s=612x612&w=0&k=20&c=Qg1UtAJ4yCrK2n3xQRz7FBrnI0YUstBbyUS5E_UXLjw=",
  "income-tax-return-australia": "/images/australia.jpg"
}

// Helper function to get banner URL with fallback
export function getBannerUrl(slug: string): string {
  return (
    serviceBanners[slug] ||
    `/placeholder.svg?height=400&width=800&query=professional ${slug.replace("-", " ")} service banner`
  )
}
