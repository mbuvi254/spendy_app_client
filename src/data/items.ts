export interface Item {
  id: number;
  name: string;
  price: number;
  category: string;
}

export const items: Item[] = [
  // Food items
  { id: 1, name: "Coffee", price: 5, category: "Food" },
  { id: 2, name: "Pizza", price: 15, category: "Food" },
  { id: 3, name: "Fancy Dinner", price: 200, category: "Food" },
  { id: 4, name: "Groceries for a month", price: 500, category: "Food" },
  { id: 5, name: "Personal chef for a year", price: 50000, category: "Food" },
  
  // Electronics
  { id: 6, name: "Smartphone", price: 1000, category: "Electronics" },
  { id: 7, name: "Laptop", price: 2000, category: "Electronics" },
  { id: 8, name: "Gaming PC", price: 3000, category: "Electronics" },
  { id: 9, name: "Home theater system", price: 10000, category: "Electronics" },
  { id: 10, name: "Smart home setup", price: 25000, category: "Electronics" },
  
  // Cars
  { id: 11, name: "Used Honda Civic", price: 15000, category: "Cars" },
  { id: 12, name: "Tesla Model 3", price: 45000, category: "Cars" },
  { id: 13, name: "BMW M3", price: 75000, category: "Cars" },
  { id: 14, name: "Porsche 911", price: 150000, category: "Cars" },
  { id: 15, name: "Ferrari", price: 300000, category: "Cars" },
  { id: 16, name: "Bugatti Chiron", price: 3000000, category: "Cars" },
  
  // Real Estate
  { id: 17, name: "Designer watch", price: 10000, category: "Luxury" },
  { id: 18, name: "Luxury vacation", price: 25000, category: "Luxury" },
  { id: 19, name: "Small apartment", price: 200000, category: "Real Estate" },
  { id: 20, name: "Nice house", price: 500000, category: "Real Estate" },
  { id: 21, name: "Mansion", price: 5000000, category: "Real Estate" },
  { id: 22, name: "Penthouse in NYC", price: 25000000, category: "Real Estate" },
  
  // Private jets
  { id: 23, name: "Private jet flight", price: 100000, category: "Aviation" },
  { id: 24, name: "Small private jet", price: 2000000, category: "Aviation" },
  { id: 25, name: "Luxury private jet", price: 20000000, category: "Aviation" },
  { id: 26, name: "Private jet fleet", price: 100000000, category: "Aviation" },
  
  // Infrastructure
  { id: 27, name: "Yacht", price: 5000000, category: "Luxury" },
  { id: 28, name: "Superyacht", price: 50000000, category: "Luxury" },
  { id: 29, name: "Private island", price: 100000000, category: "Real Estate" },
  { id: 30, name: "Football stadium", price: 500000000, category: "Infrastructure" },
  { id: 31, name: "Skyscraper", price: 1000000000, category: "Infrastructure" },
  { id: 32, name: "Space station", price: 10000000000, category: "Infrastructure" },
  { id: 33, name: "Small city", price: 50000000000, category: "Infrastructure" },
  
  // Experiences
  { id: 34, name: "Concert tickets", price: 200, category: "Experiences" },
  { id: 35, name: "World tour", price: 50000, category: "Experiences" },
  { id: 36, name: "Space flight", price: 250000, category: "Experiences" },
  { id: 37, name: "Formula 1 team", price: 1000000000, category: "Business" },
  { id: 38, name: "NFL team", price: 4000000000, category: "Business" },
  { id: 39, name: "Tech startup", price: 100000000, category: "Business" },
  { id: 40, name: "Bank", price: 10000000000, category: "Business" }
];
