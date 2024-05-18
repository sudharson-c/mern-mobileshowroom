import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mobileshowroom",
});


app.get('/',(req,res)=>{
  res.redirect("/mobiles")
})
// Retrieve all mobiles
app.get("/mobiles", (req, res) => {
  const q = "SELECT * FROM mobiles";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});
app.get("/mobiles/:id",(req,res)=>{
  const id= req.params.id;
  const query = "SELECT * from mobiles where mobileId = ?"
  db.query(query,[id],(err,result)=> {
    if(err) throw err;
    res.send(result[0]);
  })

})
// Add a new mobile
app.post("/mobiles", (req, res) => {
  const q = "INSERT INTO mobiles (`Brand`, `Model`, `StorageCapacity`, `Price`,`OperatingSystem`,`RAMSize`,`image`) VALUES (?, ?, ?, ?,?,?,?)";

  const values = [
    req.body.Brand,
    req.body.Model,
    req.body.StorageCapacity,
    req.body.Price,
    req.body.OperatingSystem,
    req.body.RAMSize,
    req.body.image
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Delete a mobile by ID
app.delete("/mobiles/:id", (req, res) => {
  const mobileId = req.params.id;
  const q = "DELETE FROM mobiles WHERE MobileID = ?";

  db.query(q, [mobileId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

// Update a mobile by ID
app.put("/mobiles/:id", (req, res) => {
  const mobileId = req.params.id;
  const q = "UPDATE mobiles SET `Brand` = ?, `Model` = ?, `StorageCapacity` = ?, `Price` = ?, `OperatingSystem`=?,`RAMSize`=?,`image`=? WHERE MobileID = ?";

  const values = [
    req.body.Brand,
    req.body.Model,
    req.body.StorageCapacity,
    req.body.Price,
    req.body.OperatingSystem,
    req.body.RAMSize,
    req.body.image,
    mobileId, 
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


app.listen(8800, () => {
  console.log("Connected to backend.");
});
