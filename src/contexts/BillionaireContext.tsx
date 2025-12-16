import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { billionaires } from '../data'

interface Billionaire {
  id: number
  firstName: string
  lastName: string
  networth: number
  imageUrl: string
  source: string
  description: string
  industries: string[]
}

interface BillionaireContextType {
  selectedBillionaire: Billionaire
  setSelectedBillionaire: (billionaire: Billionaire) => void
  clearBillionaire: () => void
  spentAmount: number
  setSpentAmount: (amount: number) => void
  remainingBalance: number
}

const BillionaireContext = createContext<BillionaireContextType | undefined>(undefined)

interface BillionaireProviderProps {
  children: ReactNode
}

export const BillionaireProvider = ({ children }: BillionaireProviderProps) => {
  const [selectedBillionaire, setSelectedBillionaireState] = useState(billionaires[0])
  const [spentAmount, setSpentAmountState] = useState(0)

  useEffect(() => {
    // Load selected billionaire from localStorage
    const stored = localStorage.getItem('selectedBillionaire')
    if (stored) {
      const parsed = JSON.parse(stored)
      const found = billionaires.find(b => b.id === parsed.id)
      if (found) {
        setSelectedBillionaireState(found)
      }
    }
    
    // Load spent amount from localStorage
    const storedSpent = localStorage.getItem('spentAmount')
    if (storedSpent) {
      setSpentAmountState(parseInt(storedSpent, 10))
    }
  }, [])

  const setSelectedBillionaire = (billionaire: Billionaire) => {
    setSelectedBillionaireState(billionaire)
    localStorage.setItem('selectedBillionaire', JSON.stringify(billionaire))
    // Reset spent amount when changing billionaire
    setSpentAmountState(0)
    localStorage.setItem('spentAmount', '0')
    localStorage.removeItem('purchasedItems')
  }

  const setSpentAmount = (amount: number) => {
    setSpentAmountState(amount)
    localStorage.setItem('spentAmount', amount.toString())
  }

  const clearBillionaire = () => {
    setSelectedBillionaireState(billionaires[0])
    setSpentAmountState(0)
    localStorage.removeItem('selectedBillionaire')
    localStorage.setItem('spentAmount', '0')
    localStorage.removeItem('purchasedItems')
  }

  const remainingBalance = selectedBillionaire.networth - spentAmount

  return (
    <BillionaireContext.Provider
      value={{
        selectedBillionaire,
        setSelectedBillionaire,
        clearBillionaire,
        spentAmount,
        setSpentAmount,
        remainingBalance
      }}
    >
      {children}
    </BillionaireContext.Provider>
  )
}

export const useBillionaire = () => {
  const context = useContext(BillionaireContext)
  if (context === undefined) {
    throw new Error('useBillionaire must be used within a BillionaireProvider')
  }
  return context
}
