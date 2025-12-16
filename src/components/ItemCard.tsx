import type { Item } from '../data/items';

interface ItemCardProps {
  item: Item;
  onBuy: (item: Item) => void;
  disabled: boolean;
}

const ItemCard = ({ item, onBuy, disabled }: ItemCardProps) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
          <p className="text-sm text-gray-500 mb-3">{item.category}</p>
          <p className="text-xl font-bold text-blue-600 mb-4">
            {formatCurrency(item.price)}
          </p>
        </div>
        
        <button
          onClick={() => onBuy(item)}
          disabled={disabled}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            disabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {disabled ? 'Insufficient Funds' : 'Buy'}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
