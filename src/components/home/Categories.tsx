
import React, { useState } from 'react';

const categories = [
  'House Plants',
  'Potter Plants',
  'Seeds',
  'Small Plants',
  'Big Plants',
  'Succulents',
];

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li
            key={category}
            className={`cursor-pointer p-2 rounded ${
              activeCategory === index
                ? 'bg-green-600 text-white'
                : 'hover:bg-green-50'
            }`}
            onClick={() => setActiveCategory(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
