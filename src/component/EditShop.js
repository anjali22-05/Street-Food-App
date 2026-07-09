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
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:Arial, Helvetica, sans-serif;
        }

        body{
          background:linear-gradient(135deg,#ffecd2,#fcb69f);
        }

        .page{
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          padding:40px 20px;
        }

        .card{
          width:100%;
          max-width:550px;
          background:white;
          padding:35px;
          border-radius:20px;
          box-shadow:0 15px 40px rgba(0,0,0,.15);
          animation:fade .6s ease;
        }

        h1{
          text-align:center;
          color:#333;
          margin-bottom:25px;
        }

        .group{
          margin-bottom:18px;
        }

        label{
          display:block;
          margin-bottom:8px;
          color:#555;
          font-weight:bold;
        }

        input{
          width:100%;
          padding:14px;
          border:1px solid #ddd;
          border-radius:10px;
          font-size:16px;
          outline:none;
          transition:.3s;
        }

        input:focus{
          border-color:#ff6b35;
          box-shadow:0 0 8px rgba(255,107,53,.3);
        }

        .preview{
          width:100%;
          height:220px;
          object-fit:cover;
          border-radius:10px;
          margin:15px 0;
          border:2px solid #eee;
        }

        button{
          width:100%;
          padding:15px;
          background:linear-gradient(135deg,#ff6b35,#ff9f43);
          color:white;
          border:none;
          border-radius:10px;
          font-size:18px;
          cursor:pointer;
          transition:.3s;
          font-weight:bold;
        }

        button:hover{
          transform:translateY(-3px);
          box-shadow:0 10px 25px rgba(255,107,53,.35);
        }

        .loading{
          text-align:center;
          margin-top:100px;
        }

        @keyframes fade{
          from{
            opacity:0;
            transform:translateY(30px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        @media(max-width:600px){
          .card{
            padding:25px;
          }

          h1{
            font-size:24px;
          }

          button{
            font-size:16px;
          }
        }
      `}</style>

      <div className="page">
        <div className="card">
          <h1>🍽️ Update Shop</h1>

          <form onSubmit={updateShop}>

            <div className="group">
              <label>Shop Name</label>
              <input
                type="text"
                name="shopName"
                value={shop.shopName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <label>Timing</label>
              <input
                type="text"
                name="timing"
                value={shop.timing}
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <label>Popular Dish</label>
              <input
                type="text"
                name="popularDish"
                value={shop.popularDish}
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                value={shop.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={shop.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={shop.image}
                onChange={handleChange}
              />
            </div>

            {shop.image && (
              <img
                src={shop.image}
                alt="Shop"
                className="preview"
              />
            )}

            <button type="submit">
              🚀 Update Shop
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default EditShop;