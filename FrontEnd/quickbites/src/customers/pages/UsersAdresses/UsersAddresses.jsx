import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddressCard from "../../components/Address/AddressCard";
import NewAddressModal from "../../components/Address/NewAdressModal"; 

const UsersAddresses = () => {
  const { auth } = useSelector((state) => state);

  const [openModal, setOpenModal] = useState(false); // ✅ State to control modal

  return (
    <div className="flex flex-col items-center lg:px-10">
      <h1 className="text-xl text-center py-7 font-semibold">Addresses</h1>

      {/* Addresses List */}
      <div className="flex justify-center flex-wrap gap-3">
        {auth.user?.addresses.map((item, index) => (
          {item} ,
          <AddressCard key={index} item={item} />
        ))}

        {/*  Add New Address Button */}
        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
        >
          + Add New Address
        </button>
      </div>

      {/*  New Address Modal */}
      <NewAddressModal open={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  );
};

export default UsersAddresses;
