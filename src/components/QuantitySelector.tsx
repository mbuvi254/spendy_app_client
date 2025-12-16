interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity: number;
}

const QuantitySelector = ({ quantity, onQuantityChange, maxQuantity }: QuantitySelectorProps) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleDecrease}
        disabled={quantity <= 1}
        className="w-8 h-8 rounded-l bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center"
      >
        -
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        min="1"
        max={maxQuantity}
        className="w-16 text-center border-t border-b border-gray-200 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleIncrease}
        disabled={quantity >= maxQuantity}
        className="w-8 h-8 rounded-r bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
