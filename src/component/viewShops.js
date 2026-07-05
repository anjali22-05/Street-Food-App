import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
const ViewShops = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchShops();
  }, []);


  const fetchShops = async () => {
    try {
      const res = await axios.get("http://localhost:5001/shop/viewShops"); // Change port if needed
      setShops(res.data);
    } catch (error) {
      console.log(error);
      alert("Unable to fetch shops");
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (id) => {
   
    try {
       const check = window.confirm("Are You Sure Want To Delete this Shop");
    if (check) { 
      const result = await axios.delete(`http://localhost:5001/deleteShop/${id}`);
      alert("SHOP DELETED SUCCESSFULLY");
      setShops(shops.filter((shop) => shop._id !== id));
    }
  }
    catch (error) {
      console.log(error);
      alert("Unable to delete shop");
    }
  }
  

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Loading Shops...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "90%",
        margin: "30px auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        All Shops
      </h1>

      {shops.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>No Shops Available</h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "25px",
          }}
        >
          {shops.map((shop) => (
            <div
              key={shop._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
                background: "#fff",
              }}
            >
              <img
                src={
                  shop.image
                    ? shop.image
                    : "https://via.placeholder.com/400x220?text=No+Image"
                }
                alt={shop.shopName}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "18px" }}>
                <h2>{shop.shopName}</h2>

                <hr />

                <p>
                  <strong>🍽 Popular Dish:</strong> {shop.popularDish}
                </p>

                <p>
                  <strong>🕒 Timing:</strong> {shop.timing}
                </p>

                <p>
                  <strong>💰 Price:</strong> ₹{shop.price}
                </p>

                <p>
                  <strong>📍 Address:</strong> {shop.address}
                </p>
              </div>
              <button onClick={() => {
                navigate(`/editShop/${shop._id}`)

              }
              } >
                Edit
              </button>
              <br />
              <button onClick={() => handleSubmit(shop._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewShops;
