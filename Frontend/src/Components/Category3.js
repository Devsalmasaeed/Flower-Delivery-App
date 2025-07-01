// import Aroma from "./assets/aroma.png";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Category.css";
import Aroma from "./assets/aroma.png";

import Review from "./review";

const Category = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://backend-iq9m.onrender.com';

    fetch(`${apiUrl}/api/flowers`)
      .then((res) => res.json())
      .then((data) => {
        const flowerIds = [
          "6863d9471e3d179531db02cb",
          "6863d8f41e3d179531db02c9",
          "6863d9801e3d179531db02cd",
          "6863d9c31e3d179531db02cf",
          "6863da371e3d179531db02d1",
          "6863da7a1e3d179531db02d3",
          "6863ddd41e3d179531db02d6",
          "6863de1c1e3d179531db02d8",
          "6863de5d1e3d179531db02da",
          "6863deaa1e3d179531db02dc",
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
          <img src={Aroma} alt="Fresh Flowers" className="category-image" />
          <div className="category-text">Aroma Candles</div>

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
                    src={flower.image}
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
