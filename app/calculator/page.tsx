import Header from "@/components/header"
import Footer from "@/components/footer"
import CalculatorContent from "@/components/calculator-content"

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <CalculatorContent />
      <Footer />
    </>
  )
}

export const metadata = {
  title: "Tax & EMI Calculator - Wealthwise Consulting",
  description:
    "Calculate your income tax and loan EMI for Nepal with our comprehensive calculators. Free tools for financial planning.",
  keywords: "Nepal tax calculator, EMI calculator, income tax Nepal, loan calculator, financial planning",
}
