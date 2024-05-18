// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams ,useLocation,useNavigate,Link} from "react-router-dom";

const Update = () => {
  const { id } = useParams(); // Access the mobileId from the URL path
  const [mobile, setMobile] = useState({
    Brand: "",
    Model: "",
    StorageCapacity: "",
    Price: "",
    RAMSize:"",
    OperatingSystem:"",
    image:""
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMobile = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/mobiles/${id}`);
        setMobile(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMobile();
  }, [id]);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMobile((prevMobile) => ({
      ...prevMobile,
      [name]: value
    }));
  };  

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/mobiles/${id}`, mobile);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Mobile</h1>
      <input
        type="text"
        placeholder="Brand"
        name="Brand"
        value={mobile.Brand}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Model"
        name="Model"
        value={mobile.Model}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Storage Capacity"
        name="StorageCapacity"
        value={mobile.StorageCapacity}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price"
        name="Price"
        value={mobile.Price}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="RAMSize"
        name="RAMSize"
        value={mobile.RAMSize}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="OperatingSystem"
        name="OperatingSystem"
        value={mobile.OperatingSystem}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Image URL"
        name="image"
        value={mobile.image}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && <p>Something went wrong!</p>}
      <Link to="/">See all Mobiles</Link>
    </div>
  );
};

export default Update;
