import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useBillionaire } from '../contexts/BillionaireContext'
import ConfirmDialog from './ConfirmDialog'

const Navigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { selectedBillionaire, clearBillionaire, spentAmount } = useBillionaire()
  const [showResetDialog, setShowResetDialog] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const handleClearBillionaire = () => {
    setShowResetDialog(true)
  }

  const confirmReset = () => {
    clearBillionaire()
    setShowResetDialog(false)
    navigate('/select-billionaire')
  }

  const cancelReset = () => {
    setShowResetDialog(false)
  }

  return (
    <>
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 
                className="text-xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => navigate('/')}
              >
                Spend Money App
              </h1>
              
              <div className="hidden md:flex space-x-6">
                <button
                  onClick={() => navigate('/')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/') 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Home
                </button>
                
                <button
                  onClick={() => navigate('/billionaires')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/billionaires') 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Billionaires
                </button>
                
                <button
                  onClick={() => navigate('/spend/money')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/spend/money') 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Spend Money
                </button>
                
                <button
                  onClick={() => navigate('/purchased-items')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/purchased-items') 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  My Purchases
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm text-gray-600">
                  Spending: {selectedBillionaire.firstName} {selectedBillionaire.lastName}
                </p>
                <p className="text-xs text-gray-500">
                  ${spentAmount.toLocaleString()} spent
                </p>
              </div>
              
              <button
                onClick={() => navigate('/select-billionaire')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Change
              </button>
              
              {spentAmount > 0 && (
                <button
                  onClick={handleClearBillionaire}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  title="Reset everything and start over"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <ConfirmDialog
        isOpen={showResetDialog}
        title="Reset Everything?"
        message="Are you sure you want to reset and select a new billionaire? This will clear all your purchases and spending history."
        confirmText="Reset"
        cancelText="Cancel"
        onConfirm={confirmReset}
        onCancel={cancelReset}
      />
    </>
  )
}

export default Navigation
