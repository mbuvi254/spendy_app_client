interface BalanceProps {
  spentAmount: number;
  remainingBalance: number;
  onReset: () => void;
}

const Balance = ({ spentAmount, remainingBalance, onReset }: BalanceProps) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div className="text-center sm:text-left">
          <p className="text-sm text-gray-600 mb-1">Amount Spent</p>
          <p className="text-xl sm:text-2xl font-bold text-red-600">
            {formatCurrency(spentAmount)}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Remaining Balance</p>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            {formatCurrency(remainingBalance)}
          </p>
        </div>
        
        <div className="text-center sm:text-right">
          <button
            onClick={onReset}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Balance;
