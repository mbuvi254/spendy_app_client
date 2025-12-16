import { useState, useEffect } from 'react'
import type { PurchasedItem } from '../types/purchased'
import Layout from './layout'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { useBillionaire } from '../contexts/BillionaireContext'
import { useNavigate } from 'react-router-dom'

const PurchasedItemsPage = () => {
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([])
  const [spentAmount, setSpentAmount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    // Load purchased items from localStorage
    const stored = localStorage.getItem('purchasedItems')
    const storedSpent = localStorage.getItem('spentAmount')
    
    if (stored) {
      const items = JSON.parse(stored)
      setPurchasedItems(items.map((item: PurchasedItem) => ({
        ...item,
        purchaseTime: new Date(item.purchaseTime)
      })))
    }
    
    if (storedSpent) {
      setSpentAmount(parseInt(storedSpent, 10))
    }
  }, [])

  const handleClearAll = () => {
    localStorage.removeItem('purchasedItems')
    localStorage.removeItem('spentAmount')
    setPurchasedItems([])
    setSpentAmount(0)
  }

  const getTotalItems = () => {
    return purchasedItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date)
  }

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Purchased Items
            </h1>
            <p className="text-lg text-gray-600">
              {getTotalItems()} items purchased • Total spent: {formatCurrency(spentAmount)}
            </p>
          </div>
          
          {purchasedItems.length > 0 && (
            <Button 
              onClick={handleClearAll}
              variant="destructive"
            >
              Clear All
            </Button>
          )}
        </div>

        {purchasedItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 mb-4">
              You haven't purchased anything yet!
            </p>
            <Button onClick={() => navigate('/spend/money')}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {purchasedItems
              .sort((a, b) => b.purchaseTime.getTime() - a.purchaseTime.getTime())
              .map((purchasedItem) => (
                <Card key={purchasedItem.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={purchasedItem.item.imageUrl}
                        alt={purchasedItem.item.itemName}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {purchasedItem.item.itemName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {purchasedItem.item.category}
                        </p>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-blue-600">
                            Quantity: {purchasedItem.quantity}
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            {formatCurrency(purchasedItem.item.price)} each
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            Total: {formatCurrency(purchasedItem.totalCost)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Purchased: {formatDate(purchasedItem.purchaseTime)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default PurchasedItemsPage
