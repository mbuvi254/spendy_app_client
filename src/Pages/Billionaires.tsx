import { billionaires } from '../data'
import { Card, CardContent, CardFooter } from '../components/ui/card'
import { Button } from "../components/ui/button"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface BillionaireData {
  id: number
  firstName: string
  lastName: string
  age: number
  networth: number
  currency: string
  imageUrl: string
  source: string
  country: string
  rank: number
  industries: string[]
  description: string
}

export default function BillionairesPage() {
  const [selectedBillionaire, setSelectedBillionaire] =
    useState<BillionaireData | null>(null)

    const navigate = useNavigate()

  useEffect(() => {
    if (selectedBillionaire) {
      console.log(`Selected: ${selectedBillionaire.firstName}`)
    }
    navigate("/spend/money")
  }, [selectedBillionaire, navigate])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        World's Top Billionaires
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {billionaires.map((billionaire: BillionaireData) => (
          <Card
            key={billionaire.id}
            className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white"
          >
            <img
              src={billionaire.imageUrl}
              alt={`${billionaire.firstName} ${billionaire.lastName}`}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {billionaire.firstName} {billionaire.lastName}
              </h3>

              <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ${billionaire.networth}
              </p>
            </CardContent>

            <CardFooter className="p-4">
              <Button
                className="w-full"
                onClick={() => setSelectedBillionaire(billionaire)}
              >
                Choose
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
