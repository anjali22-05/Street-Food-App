import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const res = await axios.get("http://localhost:5001/viewShops"); // Change port if needed
      setShops(res.data);
    } catch (error) {
      console.log(error);
      alert("Unable to fetch shops");
    } finally {
      setLoading(false);
    }
  };

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewShops;