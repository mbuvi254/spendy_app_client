import { useState, useEffect } from 'react'
import { expensiveThings } from '../data'
import type { Item } from '../types'
import type { PurchasedItem } from '../types/purchased'
import Layout from './layout'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import Toast from '../components/Toast'
import QuantitySelector from '../components/QuantitySelector'
import { useBillionaire } from '../contexts/BillionaireContext'

interface ItemQuantity {
  [key: number]: number
}

export default function SpendPage() {
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [itemQuantities, setItemQuantities] = useState<ItemQuantity>({})
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([])
  const { selectedBillionaire, spentAmount, setSpentAmount, remainingBalance } = useBillionaire()

  useEffect(() => {
    // Load saved data from localStorage
    const stored = localStorage.getItem('purchasedItems')
    
    if (stored) {
      const items = JSON.parse(stored)
      setPurchasedItems(items.map((item: PurchasedItem) => ({
        ...item,
        purchaseTime: new Date(item.purchaseTime)
      })))
    }
  }, [])

  const saveToLocalStorage = (items: PurchasedItem[]) => {
    localStorage.setItem('purchasedItems', JSON.stringify(items))
  }

  const getMaxAffordableQuantity = (itemPrice: number): number => {
    return Math.floor(remainingBalance / itemPrice)
  }

  const handleQuantityChange = (itemId: number, quantity: number) => {
    setItemQuantities(prev => ({
      ...prev,
      [itemId]: quantity
    }))
  }

  const handleBuyItem = (item: Item) => {
    const quantity = itemQuantities[item.id] || 1
    const totalCost = item.price * quantity
    
    if (remainingBalance >= totalCost) {
      const newSpentAmount = spentAmount + totalCost
      const purchasedItem: PurchasedItem = {
        id: `${item.id}-${Date.now()}`,
        item,
        quantity,
        totalCost,
        purchaseTime: new Date()
      }
      
      const newPurchasedItems = [...purchasedItems, purchasedItem]
      
      setSpentAmount(newSpentAmount)
      setPurchasedItems(newPurchasedItems)
      saveToLocalStorage(newPurchasedItems)
      
      const message = quantity === 1 
        ? `You bought ${item.itemName} for $${totalCost.toLocaleString()}!`
        : `You bought ${quantity} ${item.itemName}${quantity > 1 ? 's' : ''} for $${totalCost.toLocaleString()}!`
      setToastMessage(message)
      setShowToast(true)
      
      // Reset quantity after purchase
      setItemQuantities(prev => ({
        ...prev,
        [item.id]: 1
      }))
    }
  }

  const hideToast = () => setShowToast(false)

  return (
    <>
      <Layout>
        <div className="p-6 bg-gray-50 min-h-screen">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Spend {selectedBillionaire.firstName} {selectedBillionaire.lastName}'s Money
            </h1>
            <p className="text-xl font-semibold text-green-600">
              Remaining: ${remainingBalance.toLocaleString()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {expensiveThings.map(item => {
              const quantity = itemQuantities[item.id] || 1
              const maxQuantity = getMaxAffordableQuantity(item.price)
              const totalCost = item.price * quantity
              const canAfford = remainingBalance >= totalCost
              
              return (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <img
                      src={item.imageUrl}
                      alt={item.itemName}
                      className="w-full h-48 object-cover"
                    />
                  </CardContent>

                  <CardContent className="p-4 flex flex-col">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {item.itemName}
                    </h3>

                    <div className="mb-4">
                      <p className="text-lg font-bold text-green-600">
                        ${item.price.toLocaleString()} each
                      </p>
                      {quantity > 1 && (
                        <p className="text-sm font-semibold text-blue-600">
                          Total: ${totalCost.toLocaleString()}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Quantity:</p>
                      <QuantitySelector
                        quantity={quantity}
                        onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
                        maxQuantity={maxQuantity}
                      />
                      {maxQuantity === 0 && (
                        <p className="text-xs text-red-600 mt-1">Cannot afford</p>
                      )}
                    </div>

                    <Button
                      onClick={() => handleBuyItem(item)}
                      disabled={!canAfford || maxQuantity === 0}
                      className="mt-auto"
                      title={!canAfford ? "Insufficient funds" : `Buy ${quantity} ${item.itemName}${quantity > 1 ? 's' : ''}`}
                    >
                      {!canAfford || maxQuantity === 0 ? "Insufficient Funds" : `Buy ${quantity > 1 ? `${quantity} ` : ''}for $${totalCost.toLocaleString()}`}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </Layout>
      <Toast message={toastMessage} isVisible={showToast} onHide={hideToast} />
    </>
  )
}
