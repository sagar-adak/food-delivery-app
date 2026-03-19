import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/foods');
      if (!response.ok) throw new Error('Failed to fetch foods');
      const data = await response.json();
      setFoods(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this food item?')) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const response = await fetch(`http://localhost:5000/api/admin/foods/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to delete food');
        
        // Remove from list
        setFoods(foods.filter((food) => food._id !== id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Manage Menu
          </h1>
          <p className="text-gray-500 mt-1">View, edit, or remove food items</p>
        </div>
        <Link
          to="/admin/add-food"
          className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-soft hover:shadow-hover transition-all"
        >
          <Plus size={20} /> Add Food
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-gray-600 text-sm border-b">
              <tr>
                <th className="px-6 py-4 font-semibold">ITEM</th>
                <th className="px-6 py-4 font-semibold">PRICE</th>
                <th className="px-6 py-4 font-semibold">CATEGORY</th>
                <th className="px-6 py-4 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {foods.map((food) => (
                <tr key={food._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="font-medium text-gray-900">{food.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">₹{food.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-orange-50 text-primary text-xs font-medium">
                      {food.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/edit-food/${food._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => deleteHandler(food._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {foods.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    No food items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
