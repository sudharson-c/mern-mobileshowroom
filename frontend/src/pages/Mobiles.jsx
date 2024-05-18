// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Mobiles = () => {
  const [mobiles, setMobiles] = useState([]);

  useEffect(() => {
    const fetchMobiles = async () => {
      try {
        const res = await axios.get("http://localhost:8800/mobiles");
        console.log(res.data);
        setMobiles(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMobiles();
  }, [mobiles]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/mobiles/${id}`);
      setMobiles((prevMobiles) =>
        prevMobiles.filter((mobile) => mobile.MobileId !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Mobile Showroom</h1>
      <div className="books">
        {mobiles.map((mobile) => (
          <div key={mobile.MobileID} className="book">
            <img src={mobile.image} alt="" />
            <h2>{mobile.Model}</h2>
            <p>{mobile.Brand}</p>
            <p>{mobile.OperatingSystem}</p>
            <span>Rs {mobile.Price}</span>
            <button
              className="delete"
              onClick={() => handleDelete(mobile.MobileID)}
            >
              Delete
            </button>
            <button className="update">
              <Link
                to={`/update/${mobile.MobileID}`} // Pass the mobileId as a URL parameter
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>
      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add New Mobile
        </Link>
      </button>
    </div>
  );
};

export default Mobiles;
