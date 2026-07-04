import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditShop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [shop, setShop] = useState({
    shopName: "",
    timing: "",
    popularDish: "",
    price: "",
    address: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getShop();
  }, []);

  const getShop = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/shop/viewShop/${id}`
      );

      setShop(res.data);
    } catch (error) {
      console.log(error);
      alert("Unable to fetch shop");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setShop({
      ...shop,
      [e.target.name]: e.target.value,
    });
  };

  const updateShop = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5001/shop/updateShop/${id}`,
        shop
      );

      alert("Shop Updated Successfully");

      navigate("/viewShops");
    } catch (error) {
      console.log(error);
      alert("Unable to update shop");
    }
  };

  if (loading) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        width: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px lightgray",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Update Shop
      </h1>

      <form onSubmit={updateShop}>

        <label>Shop Name</label>
        <input
          type="text"
          name="shopName"
          value={shop.shopName}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Timing</label>
        <input
          type="text"
          name="timing"
          value={shop.timing}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Popular Dish</label>
        <input
          type="text"
          name="popularDish"
          value={shop.popularDish}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={shop.price}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Address</label>
        <input
          type="text"
          name="address"
          value={shop.address}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Image URL</label>
        <input
          type="text"
          name="image"
          value={shop.image}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            borderRadius: "5px",
          }}
        >
          Update Shop
        </button>

      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  marginTop: "5px",
  fontSize: "16px",
};

export default EditShop;