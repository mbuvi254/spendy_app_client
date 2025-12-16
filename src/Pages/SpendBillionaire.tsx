import { useState } from 'react';
import { billionaire } from '../data/billionaire';
import { items } from '../data/items';
import Balance from '../components/Balance';
import ItemCard from '../components/ItemCard';
import type { Item } from '../data/items';
import Layout from './layout';

const SpendBillionaire = () => {
  const [spentAmount, setSpentAmount] = useState(0);
  const remainingBalance = billionaire.netWorth - spentAmount;

  const handleBuyItem = (item: Item) => {
    if (remainingBalance >= item.price) {
      setSpentAmount(prev => prev + item.price);
    }
  };

  const handleReset = () => {
    setSpentAmount(0);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Spend {billionaire.name}'s Money
        </h1>
        
        <Balance
          spentAmount={spentAmount}
          remainingBalance={remainingBalance}
          onReset={handleReset}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onBuy={handleBuyItem}
              disabled={remainingBalance < item.price}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SpendBillionaire;
