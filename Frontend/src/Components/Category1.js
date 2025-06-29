
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import Dry from "./assets/dried.png";

import Review from "./review";

const Category = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://backend-iq9m.onrender.com';

    fetch(`${apiUrl}/api/flowers`)
      .then((res) => res.json())
      .then((data) => {
        const flowerIds = [
          "6838660f380b2d047adca72f",
          "6838660f380b2d047adca72f",
          "6838660f380b2d047adca72f",
          "6838660f380b2d047adca72f",
          "6838660f380b2d047adca72f",
"6838660f380b2d047adca72f",
"6838660f380b2d047adca72f",
"6838660f380b2d047adca72f",
"6838660f380b2d047adca72f",
"6838660f380b2d047adca72f",
"6838660f380b2d047adca72f",
"6838660f380b2d047adca72f",
"6838660f380b2d047adca72f",
"6838660f380b2d047adca72f",



          
        ];
        const freshFlowers = data.filter((flower) =>
          flowerIds.includes(flower._id)
        );
        setFlowers(freshFlowers);
      })
      .catch((error) => console.error("Error fetching flowers:", error));
  }, []);

  return (
    <div>
      <div className="cat-con-flower">
        <section className="category-container">
  <img src={Dry} alt="Fresh Flowers" className="category-image" />
  <div className="category-text">Dried Flowers</div>
</section>

        <section className="flowers-list">
          {flowers.length > 0 ? (
            flowers.map((flower) => (
              <Link
                to={`/product/${flower._id}`}
                key={flower._id}
                className="flower-card"
              >
                <img
                  src={`${process.env.REACT_APP_API_URL || 'https://backend-iq9m.onrender.com'}${flower.image}`}
                  alt={flower.name}
                  className="flower-image"
                />
              </Link>
            ))
          ) : (
            <p>Loading flowers...</p>
          )}
        </section>
      </div>
      <Review />
    </div>
  );
};

export default Category;





