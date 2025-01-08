const { db } = require("../db");







const createUser = (req, res) => {
    const {
        user_id,name,email,plot_size,project_type,budgest
    } = req.body;
    console.log(user_id,name,email,plot_size,project_type,budgest);
    
    const sql = `INSERT INTO user_profile (user_id,name,email,plot_size,project_type,budgest) VALUES (?,?,?,?,?,?)`;
    db.query(
      sql,
      [
        user_id,name,email,plot_size,project_type,budgest
      ],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error inserting data" });
        } else {
          res
            .status(201)
            .json({ success: true, message: "user_profile data successfully submitted" });
        }
      }
    );
  };

  const getuser_profilebyid = (req, res) => {
    try {
      const { id } = req.params;
  
      const getQuery = `SELECT * FROM user_profile WHERE user_id  = ?`;
  
      db.query(getQuery, [id], (error, result) => {
        if (error) {
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json(result);
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
 
  
  const getuser_profile = (req, res) => {
    const sql = "SELECT * FROM user_profile"; 
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error fetching data" });
      } else {
        res.status(200).json(results);
      }
    });
  };
  
  
  const updateuser_profile = async (req, res) => {
    try {
      const { id  } = req.params;
      const {
        name,email,plot_size,project_type,budgest
      } = req.body;
  
      // Construct SQL query to update the item
      const sql = `UPDATE user_profile 
                   SET     name = ?,email = ?,plot_size = ?,project_type = ?,budgest = ?
                   WHERE user_id  = ?`;
  
      // Execute the update query asynchronously
      await new Promise((resolve, reject) => {
        db.query(
          sql,
          [
          name,email,plot_size,project_type,budgest,id
          ],
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });
  
      res.status(200).json({ message: "user_profile updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const deleteuser_profile = (req, res) => {
    const { id  } = req.params;
  
    // Validate the id 
    if (!id ) {
      return res.status(400).json({ error: " ID is required" });
    }
  
    // SQL query to delete the User Profile
    const sqlDeleteCategory = `DELETE FROM user_profile WHERE user_id  = ?`;
  
    db.query(sqlDeleteCategory, [id], (err, results) => {
      if (err) {
        console.error("Error deleting User:", err);
        return res.status(500).json({ error: "Error deleting the User" });
      }
  
      if (results.affectedRows === 0) {
        // No rows affected means the id  does not exist
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Item successfully deleted",
      });
    });
  };
  

  
  

  module.exports = {

  createUser,
  getuser_profilebyid,
  getuser_profile,
  updateuser_profile,
  deleteuser_profile,

   
  };
  