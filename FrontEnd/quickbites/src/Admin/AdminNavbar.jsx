import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminNavbar = ({ handleOpenSideBar }) => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  return (
    <div className="lg:mx-8 rounded-md shadow-md px-5 z-50 py-3 bg-orange-400 flex justify-between items-center">
      {/* <button onClick={handleOpenSideBar} className="text-white text-2xl">
        ☰
      </button> */}
      <a href="/" className="text-white font-semibold text-xl">QuickBites</a>
      
    </div>
  );
};

export default AdminNavbar;
