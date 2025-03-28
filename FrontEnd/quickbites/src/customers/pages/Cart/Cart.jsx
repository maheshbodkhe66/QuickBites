import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "../../components/Address/AddressCard";
import CartItemCard from "../../components/CartItem/CartItemCard";
import { createOrder } from "../../../State/Customers/Orders/Action";
import { findCart } from "../../../State/Customers/Cart/cart.action";
import { isValid } from "../../util/ValidToOrder";
import { cartTotal } from "./totalPay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, auth } = useSelector((store) => store);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  useEffect(() => {
    dispatch(findCart(localStorage.getItem("jwt")));
  }, []);

  const placeOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }
    const data = {
      token: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food.restaurant.id,
        deliveryAddress: selectedAddress,
      },
    };
    if (isValid(cart.cartItems)) {
      const response = await dispatch(createOrder(data));
      if (response?.payload?.paymentUrl) {
        window.location.href = response.payload.paymentUrl;
      } else {
        toast.success("Order placed successfully!");
      }
    } else {
      toast.error("Invalid order items");
    }
  };

  const handleAddAddress = () => {
    auth.user.addresses.push(newAddress);
    setShowAddressModal(false);
    setNewAddress({ streetAddress: "", city: "", state: "", postalCode: "", country: "India" });
    toast.success("Address added successfully!");
  };

  return (
    <div className="p-5 my-8">
      <ToastContainer />
      {cart.cartItems.length > 0 ? (
        <div className="mx-8 lg:flex justify-between">
          <section className="lg:w-1/3 space-y-6 lg:min-h-screen">
            {cart.cartItems.map((item, i) => (
              <CartItemCard key={i} item={item} />
            ))}
            <div className="border-t pt-5">
              <p className="text-lg font-semibold">Bill Details</p>
              <div className="text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <p>Item Total</p>
                  <p>₹{cartTotal(cart.cartItems)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Delivery Fee</p>
                  <p>₹21</p>
                </div>
                <div className="flex justify-between">
                  <p>Platform Fee</p>
                  <p>₹5</p>
                </div>
                <div className="flex justify-between">
                  <p>GST & Charges</p>
                  <p>₹33</p>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <p>Total Pay</p>
                  <p>₹{cartTotal(cart.cartItems) + 33}</p>
                </div>
              </div>
            </div>
            <button
              className="mt-5 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </section>
          <section className="lg:w-2/3 m-5 flex flex-col items-center ">
            <h1 className="text-center font-semibold text-2xl py-5">
              Choose Delivery Address
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {auth.user?.addresses.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedAddress === item}
                    onChange={() => setSelectedAddress(item)}
                    className="w-5 h-5"
                  />
                  <AddressCard item={item} />
                </div>
              ))}
            </div>
            <button
              className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowAddressModal(true)}
            >
              Add Address
            </button>
            
          </section>
        </div>
      ) : (
        <div className="flex h-screen justify-center items-center">
          <div className="text-center space-y-5">
            <p className="text-3xl font-bold">Your Cart Is Empty</p>
          </div>
        </div>
      )}

      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Address</h2>
            <input
              type="text"
              placeholder="Street Address"
              className="w-full p-2 border mb-2"
              value={newAddress.streetAddress}
              onChange={(e) => setNewAddress({ ...newAddress, streetAddress: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              className="w-full p-2 border mb-2"
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="State"
              className="w-full p-2 border mb-2"
              value={newAddress.state}
              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="w-full p-2 border mb-2"
              value={newAddress.postalCode}
              onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleAddAddress}>
              Save Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
