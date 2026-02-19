import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/ingredients')({
  component: RouteComponent,
});

const colors = ['bdede0', 'bbdbd1', 'b6b8d6', '7e78d2', '6f58c9'];
class Ingredient {
  name: string;
  amount: number;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
}
const ingredients = [
  new Ingredient('Flour', 181.25),
  new Ingredient('Sugar', 232),
  new Ingredient('Baking Soda', 2.32),
  new Ingredient('Salt', 3.48),
  new Ingredient('Cinnamon', 2.32),
  new Ingredient('Pecans', 35),
];

function RouteComponent() {
  // Sort ingredients by amount (descending)
  const sortedIngredients = [...ingredients].sort(
    (a, b) => b.amount - a.amount,
  );
  const maxAmount = sortedIngredients[0]?.amount || 1; // Get the largest amount
  // w-screen -mx-4 px-4
  return (
    <div className="w-screen min-w-64 md:max-w-192 -mx-4 px-4">
      <div className="max-w-6xl mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">Ingredient Ratios</h1>
      </div>
      <div className="space-y-4">
        {sortedIngredients.map((ingredient, index) => {
          const widthPercentage = (ingredient.amount / maxAmount) * 100;

          return (
            <div key={ingredient.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{ingredient.name}</span>
                <span className="text-gray-600">
                  {ingredient.amount}g (
                  {((ingredient.amount / maxAmount) * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="h-8 rounded-md overflow-hidden bg-gray-200">
                <div
                  className="h-full flex items-center justify-end pr-2 text-white font-medium text-sm"
                  style={{
                    backgroundColor: `#${colors[index % colors.length]}`,
                    width: `${widthPercentage}%`,
                    minWidth: 'max-content',
                    transition: 'width 0.3s ease',
                  }}
                >
                  {ingredient.amount}g
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
