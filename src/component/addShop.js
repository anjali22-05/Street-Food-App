import React, { useState } from "react";
import axios from "axios";
import "./AddShop.css";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";

// function Home() {
//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>🏪 Shop Management System</h1>

//       <Link to="/add-shop">
//         <button>Add Shop</button>
//       </Link>
//     </div>
//   );
// }

function AddShop() {
    const navigate=useNavigate();
    const [shop, setShop] = useState({
        shopName: "",
        timing: "",
        price: "",
        popularDish: "",
        address: "",
        image: "null",
    });

    const handleChange = (e) => {
        setShop({
            ...shop,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response= await axios.post(
            "http://localhost:5001/shop/addShop",
            shop
        );

        console.log("Shop Details:", response.data);

        alert("✅ Shop Added Successfully!");

        setShop({
            shopName: "",
            timing: "",
            price: "",
            popularDish:"",
            address: "",
            image: "",
        });

    } catch (error) {
        console.error("Error:", error);
        alert("❌ Failed to add shop");
    }
};

    return (
        <div
            style={{
                width: "400px",
                margin: "40px auto",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
            }}
        >
            <h2>Add Shop</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="shopName"
                    placeholder="Shop Name"
                    value={shop.shopName}
                    onChange={handleChange}
                    required
                />
                <br /><br />
            <input
    type="text"
    name="popularDish"
    placeholder="Popular Dish"
    value={shop.popularDish}
    onChange={handleChange}
    required
/>
                <br /><br />

                <input
                    type="text"
                    name="timing"
                    placeholder="Opening Timing"
                    value={shop.timing}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="price"
                    placeholder="Average Price"
                    value={shop.price}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="address"
                    placeholder="Shop Address"
                    value={shop.address}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={shop.image}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Add Shop
                </button>
            </form>
            <button onClick={()=>{
                navigate("/home");
            }}>Home
            </button>
        </div>
    );
}
export default AddShop;