// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [mobile, setMobile] = useState({
    Brand: "",
    Model: "",
    StorageCapacity: "",
    Price: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMobile({ ...mobile, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/mobiles", mobile);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Add New Mobile</h1>
      <input
        type="text"
        placeholder="Brand"
        name="Brand"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Model"
        name="Model"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Storage Capacity"
        name="StorageCapacity"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price"
        name="Price"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="RAMSize"
        name="RAMSize"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="OperatingSystem"
        name="OperatingSystem"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Image URL"
        name="image"
        onChange={handleChange}
      />

      <button onClick={handleClick}>Add</button>
      {error && <p>Something went wrong!</p>}
      <Link to="/">See all Mobiles</Link>
    </div>
  );
};

export default Add;
