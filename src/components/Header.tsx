import { billionaire } from '../data/billionaire';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-4">
          <img 
            src={billionaire.avatar} 
            alt={billionaire.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Spend {billionaire.name}'s Money
            </h1>
            <p className="text-lg text-gray-600">
              Net Worth: ${billionaire.netWorth.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
