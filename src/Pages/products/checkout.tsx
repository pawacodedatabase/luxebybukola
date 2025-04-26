import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { FaTrashAlt } from "react-icons/fa";
import CheckoutForm from "./CheckoutForm";

interface CartItem {
  productId: number;
  quantity: number;
}

const deliveryFees = [
  { state: "West (W)", fee: 2500 },
  { state: "North (N)", fee: 3500 },
  { state: "East (E)", fee: 3500 },
  { state: "South (S)", fee: 35500 },
];

const Checkout: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<any[]>([]); // Storing products fetched from JSONbin
  const [selectedDeliveryState, setSelectedDeliveryState] = useState<string>("");
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    // Fetch products from JSONbin
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.jsonbin.io/v3/b/680c93278a456b796691bca7/latest",
          {
            headers: {
              "X-Master-Key":
                "$2a$10$qrNF.b6EVU4HN2N8Dvegaez/mp2L7ZO9EjET5ujsIiWNSfuOyB.mu",
            },
          }
        );
        const data = await response.json();
        if (data.record.products) {
          console.log(setBillingInfo)
          setProducts(data.record.products);
        } else {
          setProducts(data.record); // fallback if products are not nested
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const totalPrice = cart.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (product) {
      return total + item.quantity * product.price;
    }
    return total;
  }, 0);

  const handleDeliveryStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const state = event.target.value;
    setSelectedDeliveryState(state);
    const selectedFee = deliveryFees.find((fee) => fee.state === state);
    if (selectedFee) {
      setDeliveryFee(selectedFee.fee);
    }
  };

  const handlePlaceOrder = () => {
    if (!billingInfo.name || !billingInfo.email || !billingInfo.address || !billingInfo.paymentMethod) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create the order data
    const order = {
      orderId,
      date: new Date().toISOString(),
      products: cart.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? { ...product, quantity: item.quantity } : null;
      }).filter(Boolean),
      totalPrice: totalPrice + deliveryFee,  // Add delivery fee to total price
      billingInfo,
    };

    // Save the order to local storage
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory") || "[]");
    orderHistory.push(order);
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

    // Clear the cart and navigate to order confirmation page
    localStorage.removeItem("cart");
    navigate("/confirmation", { state: { orderId } });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      <h1 className="text-2xl font-semibold mb-6" style={{ color: "#1a2d42" }}>
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="border p-4 rounded-lg shadow-md" style={{ backgroundColor: "#f9f9f9" }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: "#234156" }}>Order Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">Image</th>
                  <th className="border p-2 text-left">Product</th>
                  <th className="border p-2 text-left">Quantity</th>
                  <th className="border p-2 text-left">Price</th>
                  <th className="border p-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => {
                  const product = products.find((product) => product.id === item.productId);
                  return product ? (
                    <tr key={item.productId} className="hover:bg-gray-100">
                      <td className="border p-2">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-16 w-16 object-cover rounded"
                        />
                      </td>
                      <td className="border p-2" style={{ color: "#234156" }}>
                        {product.name}
                      </td>
                      <td className="border p-2" style={{ color: "#234156" }}>
                        {item.quantity}
                      </td>
                      <td className="border p-2" style={{ color: "#234156" }}>
                        ₦{product.price.toFixed(2)}
                      </td>
                      <td className="border p-2" style={{ color: "#234156" }}>
                        ₦{(item.quantity * product.price).toFixed(2)}
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <label
              htmlFor="deliveryState"
              className="block text-sm font-medium text-gray-700"
            >
              Select Delivery Cardinal Point
            </label>
            <select
              id="deliveryState"
              name="deliveryState"
              value={selectedDeliveryState}
              onChange={handleDeliveryStateChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select</option>
              {deliveryFees.map((stateFee) => (
                <option key={stateFee.state} value={stateFee.state}>
                  {stateFee.state}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 text-right">
            <h3 className="text-xl font-semibold" style={{ color: "#1a2d42" }}>
              Delivery Fee: ₦{deliveryFee}
            </h3>
          </div>

          <div className="mt-4 text-right">
            <h3 className="text-xl font-semibold mb-2" style={{ color: "#1a2d42" }}>
              Total: ₦{(totalPrice + deliveryFee).toFixed(2)}
            </h3>
            <hr />
            <p className="text-sm text-center mt-6 mb-4 font-bold">
              Click the button below to confirm your order
            </p>
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-[#1a2d42] text-white font-medium rounded-md hover:bg-white hover:border-black hover:border-2 hover:text-[#1a2d42] focus:outline-none focus:ring-2 focus:ring-[#1a2d42]"
            >
              Confirm Order
            </button>
          </div>
        </div>

        {/* Checkout Form */}
       <CheckoutForm/>
      </div>
    </div>
  );
};

export default Checkout;
