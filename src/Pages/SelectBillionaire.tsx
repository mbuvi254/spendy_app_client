import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { billionaires } from '../data'
import Layout from './layout'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'

const SelectBillionaire = () => {
  const [selectedBillionaire, setSelectedBillionaire] = useState(billionaires[0])
  const navigate = useNavigate()

  useEffect(() => {
    // Load selected billionaire from localStorage
    const stored = localStorage.getItem('selectedBillionaire')
    if (stored) {
      const parsed = JSON.parse(stored)
      const found = billionaires.find(b => b.id === parsed.id)
      if (found) {
        setSelectedBillionaire(found)
      }
    }
  }, [])

  const handleSelectBillionaire = (billionaire: typeof billionaires[0]) => {
    setSelectedBillionaire(billionaire)
    localStorage.setItem('selectedBillionaire', JSON.stringify(billionaire))
    navigate('/spend/money')
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Choose a Billionaire to Spend Their Money
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {billionaires.map((billionaire) => (
            <Card 
              key={billionaire.id}
              className={`overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl ${
                selectedBillionaire.id === billionaire.id 
                  ? 'ring-4 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => handleSelectBillionaire(billionaire)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={billionaire.imageUrl}
                    alt={`${billionaire.firstName} ${billionaire.lastName}`}
                    className="w-full h-64 object-cover"
                  />
                  {selectedBillionaire.id === billionaire.id && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Selected
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {billionaire.firstName} {billionaire.lastName}
                  </h3>
                  
                  <p className="text-lg font-semibold text-green-600 mb-3">
                    Net Worth: {formatCurrency(billionaire.networth)}
                  </p>
                  
                  <p className="text-sm text-gray-600 mb-3">
                    {billionaire.source}
                  </p>
                  
                  <p className="text-sm text-gray-500 mb-4">
                    {billionaire.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {billionaire.industries.map((industry, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full"
                    variant={selectedBillionaire.id === billionaire.id ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelectBillionaire(billionaire)
                    }}
                  >
                    {selectedBillionaire.id === billionaire.id ? 'Continue Spending' : 'Select This Billionaire'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {selectedBillionaire && (
          <div className="text-center mt-8">
            <Button 
              onClick={() => navigate('/spend/money')}
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              Start Spending {selectedBillionaire.firstName}'s Money
            </Button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default SelectBillionaire
