import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useHistory for navigation
import { auth } from "../firebase"; // Directly import auth from firebase.js
import { signOut } from "firebase/auth"; // Import the signOut function

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate(); // For navigation after logout

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // Set user if logged in, else set null
    });

    // Cleanup on component unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <>
      <header>
        <nav className="bg-black text-white p-4 flex justify-between items-center">
          <Link to="/" className="text-white hover:text-gray-300 text-3xl">
            Records
          </Link>
          <div className="flex justify-center items-center gap-10">
            {currentUser ? (
              <>
                <span className="text-white">Hello, {currentUser.email}</span>
                <Link to={"/student"} className="text-white">Students</Link>
                <button
                  onClick={handleLogout}
                  className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to={"/"} className="text-white">
                  Login
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
