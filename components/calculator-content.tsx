"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalculatorIcon, PiggyBank, Receipt, TrendingUp, Shield, ChevronLeft, ChevronRight } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts"

interface EMIBreakdown {
  year: number
  month: number
  emi: number
  principal: number
  interest: number
  balance: number
  totalPaid: number
  loanPaidPercentage: number
}

export default function EnhancedEMICalculator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="m-6 w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <CalculatorIcon className="h-10 w-10" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tax and EMI Calculator</h1>
          <p className="text-xl text-sky-100 max-w-2xl mx-auto mb-8">
            Calculate your loan EMI with detailed monthly breakdown and interactive charts
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Shield className="h-4 w-4" />
              <span className="text-sm">Accurate Calculations</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">Detailed Breakdown</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="tax" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 bg-white shadow-lg h-14">
              <TabsTrigger value="tax" className="flex items-center gap-2 text-base">
                <Receipt className="h-5 w-5" />
                Tax Calculator
              </TabsTrigger>
              <TabsTrigger value="emi" className="flex items-center gap-2 text-base">
                <PiggyBank className="h-5 w-5" />
                EMI Calculator
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tax">
              <TaxCalculator />
            </TabsContent>

            <TabsContent value="emi">
              <EMICalculator />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function TaxCalculator() {
  const [salary, setSalary] = useState("")
  const [maritalStatus, setMaritalStatus] = useState("")
  const [ssfContribution, setSsfContribution] = useState("")
  const [citContribution, setCitContribution] = useState("")
  const [lifeInsurance, setLifeInsurance] = useState("")
  const [medicalExpense, setMedicalExpense] = useState("")
  const [result, setResult] = useState<any>(null)

  const calculateTax = () => {
    const annualSalary = Number.parseFloat(salary) * 12
    const ssf = Number.parseFloat(ssfContribution) || 0
    const cit = Number.parseFloat(citContribution) || 0
    const insurance = Number.parseFloat(lifeInsurance) || 0
    const medical = Number.parseFloat(medicalExpense) || 0

    // Nepal Tax Slabs for FY 2080/81 (2023/24)
    const taxSlabs =
      maritalStatus === "married"
        ? [
            { min: 0, max: 500000, rate: 0.01 },
            { min: 500000, max: 700000, rate: 0.1 },
            { min: 700000, max: 1000000, rate: 0.2 },
            { min: 1000000, max: 2000000, rate: 0.3 },
            { min: 2000000, max: Number.POSITIVE_INFINITY, rate: 0.36 },
          ]
        : [
            { min: 0, max: 450000, rate: 0.01 },
            { min: 450000, max: 650000, rate: 0.1 },
            { min: 650000, max: 1000000, rate: 0.2 },
            { min: 1000000, max: 2000000, rate: 0.3 },
            { min: 2000000, max: Number.POSITIVE_INFINITY, rate: 0.36 },
          ]

    // Calculate deductions
    const maxSsfDeduction = Math.min(ssf * 12, annualSalary * 0.11)
    const maxCitDeduction = Math.min(cit * 12, 300000)
    const maxInsuranceDeduction = Math.min(insurance, 40000)
    const maxMedicalDeduction = Math.min(medical, 15000)

    const totalDeductions = maxSsfDeduction + maxCitDeduction + maxInsuranceDeduction + maxMedicalDeduction
    const taxableIncome = Math.max(0, annualSalary - totalDeductions)

    // Calculate tax
    let totalTax = 0
    let remainingIncome = taxableIncome

    for (const slab of taxSlabs) {
      if (remainingIncome <= 0) break

      const taxableInThisSlab = Math.min(remainingIncome, slab.max - slab.min)
      const taxInThisSlab = taxableInThisSlab * slab.rate
      totalTax += taxInThisSlab
      remainingIncome -= taxableInThisSlab
    }

    const ssfTax = annualSalary * 0.01
    const totalTaxLiability = totalTax + ssfTax
    const monthlyTax = totalTaxLiability / 12
    const netMonthlySalary = Number.parseFloat(salary) - monthlyTax - (ssf || 0)

    setResult({
      annualSalary,
      totalDeductions,
      taxableIncome,
      incomeTax: totalTax,
      ssfTax,
      totalTaxLiability,
      monthlyTax,
      netMonthlySalary,
      effectiveTaxRate: (totalTaxLiability / annualSalary) * 100,
    })
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="shadow-xl border-0">
        <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Receipt className="h-6 w-6 text-sky-600" />
            Nepal Income Tax Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="space-y-2">
            <Label htmlFor="salary" className="text-base font-medium">
              Monthly Salary (Rs.)
            </Label>
            <Input
              id="salary"
              type="number"
              placeholder="Enter your monthly salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="marital-status" className="text-base font-medium">
              Marital Status
            </Label>
            <Select value={maritalStatus} onValueChange={setMaritalStatus}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ssf" className="text-base font-medium">
                Monthly SSF (Rs.)
              </Label>
              <Input
                id="ssf"
                type="number"
                placeholder="SSF contribution"
                value={ssfContribution}
                onChange={(e) => setSsfContribution(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cit" className="text-base font-medium">
                Monthly CIT (Rs.)
              </Label>
              <Input
                id="cit"
                type="number"
                placeholder="CIT contribution"
                value={citContribution}
                onChange={(e) => setCitContribution(e.target.value)}
                className="h-12"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="insurance" className="text-base font-medium">
                Annual Life Insurance (Rs.)
              </Label>
              <Input
                id="insurance"
                type="number"
                placeholder="Insurance premium"
                value={lifeInsurance}
                onChange={(e) => setLifeInsurance(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medical" className="text-base font-medium">
                Annual Medical (Rs.)
              </Label>
              <Input
                id="medical"
                type="number"
                placeholder="Medical expenses"
                value={medicalExpense}
                onChange={(e) => setMedicalExpense(e.target.value)}
                className="h-12"
              />
            </div>
          </div>

          <Button onClick={calculateTax} className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-lg">
            Calculate Tax
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="text-sky-600 text-xl">Tax Calculation Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="text-center bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-lg">
              <p className="text-gray-600 mb-2">Net Monthly Salary</p>
              <p className="text-3xl font-bold text-green-600">
                Rs. {result.netMonthlySalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Annual Salary</p>
                  <p className="font-semibold text-lg">Rs. {result.annualSalary.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Deductions</p>
                  <p className="font-semibold text-green-600 text-lg">Rs. {result.totalDeductions.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Taxable Income</p>
                  <p className="font-semibold text-lg">Rs. {result.taxableIncome.toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Income Tax</p>
                  <p className="font-semibold text-red-600 text-lg">Rs. {result.incomeTax.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">SSF Tax (1%)</p>
                  <p className="font-semibold text-red-600 text-lg">Rs. {result.ssfTax.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Monthly Tax</p>
                  <p className="font-semibold text-red-600 text-lg">Rs. {result.monthlyTax.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t text-center">
              <p className="text-gray-600 mb-2">Effective Tax Rate</p>
              <p className="text-2xl font-bold text-sky-600">{result.effectiveTaxRate.toFixed(2)}%</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState("1000000")
  const [interestRate, setInterestRate] = useState("12")
  const [loanTenure, setLoanTenure] = useState("5")
  const [tenureType, setTenureType] = useState("years")
  const [result, setResult] = useState<any>(null)
  const [breakdown, setBreakdown] = useState<EMIBreakdown[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [activeChart, setActiveChart] = useState("pie")
  const itemsPerPage = 12

  const calculateEMI = () => {
    const principal = Number.parseFloat(loanAmount)
    const rate = Number.parseFloat(interestRate) / 100 / 12
    const tenure = tenureType === "years" ? Number.parseFloat(loanTenure) * 12 : Number.parseFloat(loanTenure)

    if (principal && rate && tenure) {
      const emi = (principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1)
      const totalAmount = emi * tenure
      const totalInterest = totalAmount - principal

      // Generate monthly breakdown
      const monthlyBreakdown: EMIBreakdown[] = []
      let remainingBalance = principal
      let totalPaidSoFar = 0

      for (let month = 1; month <= tenure; month++) {
        const interestPayment = remainingBalance * rate
        const principalPayment = emi - interestPayment
        remainingBalance -= principalPayment
        totalPaidSoFar += emi

        monthlyBreakdown.push({
          year: Math.ceil(month / 12),
          month,
          emi,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, remainingBalance),
          totalPaid: totalPaidSoFar,
          loanPaidPercentage: (totalPaidSoFar / totalAmount) * 100,
        })
      }

      setBreakdown(monthlyBreakdown)
      setResult({
        emi,
        totalAmount,
        totalInterest,
        principal,
        tenure: tenureType === "years" ? Number.parseFloat(loanTenure) : Number.parseFloat(loanTenure) / 12,
        monthlyBreakdown,
      })
      setCurrentPage(1)
    }
  }

  const pieData = result
    ? [
        { name: "Principal", value: result.principal, color: "#0891b2" },
        { name: "Interest", value: result.totalInterest, color: "#f59e0b" },
      ]
    : []

  const yearlyData = result
    ? Array.from({ length: Math.ceil(result.tenure) }, (_, i) => {
        const year = i + 1
        const yearData = breakdown.filter((item) => item.year === year)
        const totalPrincipal = yearData.reduce((sum, item) => sum + item.principal, 0)
        const totalInterest = yearData.reduce((sum, item) => sum + item.interest, 0)
        return {
          year: `Year ${year}`,
          principal: totalPrincipal,
          interest: totalInterest,
          total: totalPrincipal + totalInterest,
        }
      })
    : []

  const balanceData = result
    ? breakdown
        .filter((_, index) => index % 6 === 0)
        .map((item) => ({
          month: `Month ${item.month}`,
          balance: item.balance,
          paid: result.principal - item.balance,
        }))
    : []

  const paginatedBreakdown = breakdown.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(breakdown.length / itemsPerPage)

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50">
            <CardTitle className="flex items-center gap-2 text-xl">
              <PiggyBank className="h-6 w-6 text-sky-600" />
              EMI Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <Label htmlFor="loan-amount" className="text-base font-medium">
                Loan Amount (Rs.)
              </Label>
              <Input
                id="loan-amount"
                type="number"
                placeholder="Enter loan amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interest-rate" className="text-base font-medium">
                Annual Interest Rate (%)
              </Label>
              <Input
                id="interest-rate"
                type="number"
                step="0.1"
                placeholder="Enter interest rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loan-tenure" className="text-base font-medium">
                  Loan Tenure
                </Label>
                <Input
                  id="loan-tenure"
                  type="number"
                  placeholder="Enter tenure"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenure-type" className="text-base font-medium">
                  Tenure Type
                </Label>
                <Select value={tenureType} onValueChange={setTenureType}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="years">Years</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={calculateEMI} className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-lg">
              Calculate EMI
            </Button>

            <div className="bg-sky-50 p-6 rounded-lg">
              <h4 className="font-semibold text-sky-800 mb-3">Popular Bank Rates in Nepal:</h4>
              <div className="text-sm space-y-2 text-sky-700">
                <p>• Home Loan: 8.5% - 12%</p>
                <p>• Personal Loan: 12% - 16%</p>
                <p>• Vehicle Loan: 10% - 14%</p>
                <p>• Business Loan: 9% - 15%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-sky-600 text-xl">EMI Calculation Result</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="text-center bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-lg">
                <p className="text-gray-600 mb-2">Loan EMI:</p>
                <p className="text-3xl font-bold text-sky-600">
                  Rs. {result.emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Interest Payable:</span>
                  <span className="font-semibold text-lg text-orange-600">
                    Rs. {result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Payment:</span>
                  <span className="font-semibold text-lg text-sky-600">
                    Rs. {result.totalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Loan Tenure:</span>
                  <span className="font-semibold text-lg">{result.tenure.toFixed(1)} years</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Loan Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Principal</span>
                    <span className="font-medium text-lg">
                      {((result.principal / result.totalAmount) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Interest</span>
                    <span className="font-medium text-lg">
                      {((result.totalInterest / result.totalAmount) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Charts Section */}
      {result && (
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50">
            <CardTitle className="text-sky-600 text-xl">Loan Analysis Charts</CardTitle>
            <div className="flex gap-2 mt-4">
              <Button
                variant={activeChart === "pie" ? "default" : "outline"}
                onClick={() => setActiveChart("pie")}
                className="text-sm"
              >
                Principal vs Interest
              </Button>
              <Button
                variant={activeChart === "yearly" ? "default" : "outline"}
                onClick={() => setActiveChart("yearly")}
                className="text-sm"
              >
                Yearly Breakdown
              </Button>
              <Button
                variant={activeChart === "balance" ? "default" : "outline"}
                onClick={() => setActiveChart("balance")}
                className="text-sm"
              >
                Balance Trend
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {activeChart === "pie" && (
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `Rs. ${value.toLocaleString()}`} />
                    <Legend />
                  </PieChart>
                )}
                {activeChart === "yearly" && (
                  <BarChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `Rs. ${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value: number) => `Rs. ${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="principal" fill="#0891b2" name="Principal" />
                    <Bar dataKey="interest" fill="#f59e0b" name="Interest" />
                  </BarChart>
                )}
                {activeChart === "balance" && (
                  <LineChart data={balanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `Rs. ${(value / 1000).toFixed(0)}K`} />
                    <Tooltip formatter={(value: number) => `Rs. ${value.toLocaleString()}`} />
                    <Legend />
                    <Line type="monotone" dataKey="balance" stroke="#ef4444" name="Remaining Balance" strokeWidth={2} />
                    <Line type="monotone" dataKey="paid" stroke="#22c55e" name="Amount Paid" strokeWidth={2} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monthly Breakdown Table */}
      {result && breakdown.length > 0 && (
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-sky-50 to-blue-50">
            <CardTitle className="text-sky-600 text-xl">
              Monthly breakdown of EMI in Principal and Interest components
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-sky-600 hover:bg-sky-600">
                    <TableHead className="text-white font-semibold">Year</TableHead>
                    <TableHead className="text-white font-semibold">Month</TableHead>
                    <TableHead className="text-white font-semibold">Principal (A)</TableHead>
                    <TableHead className="text-white font-semibold bg-yellow-500">Interest (B)</TableHead>
                    <TableHead className="text-white font-semibold">Total Payment (A+B)</TableHead>
                    <TableHead className="text-white font-semibold">Balance</TableHead>
                    <TableHead className="text-white font-semibold">Loan Paid To Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBreakdown.map((row, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{row.year}</TableCell>
                      <TableCell>{row.month}</TableCell>
                      <TableCell>Rs. {row.principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                      <TableCell className="bg-yellow-50">
                        Rs. {row.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </TableCell>
                      <TableCell>Rs. {row.emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                      <TableCell>Rs. {row.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
                      <TableCell>{row.loanPaidPercentage.toFixed(2)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 p-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
