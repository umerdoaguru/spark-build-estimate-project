const { db } = require("../db");







const createUser = (req, res) => {
    const {
        user_id,name,email,plot_area,project_type,construction_area,no_floor,tower,balcony,total_construction_area,budgest
    } = req.body;
    console.log(user_id,name,email,plot_area,project_type,construction_area,no_floor,tower,balcony,total_construction_area,budgest);
      // Extract numeric value from `plot_area`
  
      // Calculate per square foot budget
      const per_sq_fit = Math.floor(budgest / total_construction_area); 
      console.log(`Per square foot budget: ${per_sq_fit}`);
  
    
    const sql = `INSERT INTO user_profile (user_id,name,email,plot_area,project_type,construction_area,no_floor,tower,balcony,total_construction_area,per_sq_fit,budgest) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
    db.query(
      sql,
      [
        user_id,name,email,plot_area,project_type,construction_area,no_floor,tower,balcony,total_construction_area,per_sq_fit,budgest
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
        name,email,plot_area,project_type,construction_area,no_floor,tower,balcony,total_construction_area,budgest
      } = req.body;
console.log( name,email,plot_area,project_type,construction_area,no_floor,tower,balcony,total_construction_area,budgest,id);

      const per_sq_fit = Math.floor(budgest / total_construction_area); 
      console.log(`Per square foot budget: ${per_sq_fit}`);
  
      // Construct SQL query to update the item
      const sql = `UPDATE user_profile 
                   SET     name = ?,email = ?,plot_area = ?,project_type = ?,construction_area = ?,no_floor = ?,tower = ?,balcony = ?,total_construction_area = ?, budgest = ?,per_sq_fit=?
                   WHERE user_id  = ?`;
  
      // Execute the update query asynchronously
      await new Promise((resolve, reject) => {
        db.query(
          sql,
          [
           name,email,plot_area,project_type,construction_area,no_floor,tower,balcony,total_construction_area,budgest,per_sq_fit,id
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

  

const createUserSelection = (req, res) => {
    const {
       user_id, item_id, category_name, subcategory_name, item_name,description,image_items, quantity, total_price
    } = req.body;
    console.log(user_id, item_id, category_name, subcategory_name, item_name,description, image_items, quantity, total_price);

   
    const sql = `
    INSERT INTO user_selections 
    (user_id, item_id, category_name, subcategory_name, item_name,description, image_items, quantity, total_price) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)
  `;
    db.query(
      sql,
      [
       user_id, item_id, category_name, subcategory_name, item_name,description,image_items, quantity, total_price
      ],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error inserting data" });
        } else {
          res
            .status(201)
            .json({ success: true, message: "user selection data successfully submitted" });
        }
      }
    );
  };
  const getSelectionbyid = (req, res) => {
    try {
      const { id } = req.params; // Extract `id` from URL params
      const { category_name } = req.query; // Extract `category_name` from query params
      console.log(category_name,id);
      
  
      const getQuery = `SELECT * FROM user_selections WHERE user_id = ? AND category_name = ?`;
  
      db.query(getQuery, [id, category_name], (error, result) => {
        if (error) {
          console.error('Database query error:', error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json(result); // Send the result back to the client
        }
      });
    } catch (error) {
      console.error('Unexpected server error:', error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  const getuser_Selection = (req, res) => {
    const sql = "SELECT * FROM user_selections"; 
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error fetching data" });
      } else {
        res.status(200).json(results);
      }
    });
  };
  
  
  const updateuser_Selection = async (req, res) => {
    try {
      const { id  } = req.params;
      const {
        user_id, item_id, category_name, subcategory_name, item_name, quantity, total_price
      } = req.body;
  
      // Construct SQL query to update the item
      const sql = `UPDATE user_selections 
                   SET     user_id = ?, item_id = ?, category_name = ?, subcategory_name = ?, item_name = ?, quantity = ?, total_price = ?
                   WHERE user_id  = ?`;
  
      // Execute the update query asynchronously
      await new Promise((resolve, reject) => {
        db.query(
          sql,
          [
            user_id, item_id, category_name, subcategory_name, item_name, quantity, total_price
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
  
      res.status(200).json({ message: "user_selections updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const deleteuser_Selection = (req, res) => {
    const { id  } = req.params;
  
    // Validate the id 
    if (!id ) {
      return res.status(400).json({ error: " ID is required" });
    }
  
    // SQL query to delete the User Profile
    const sqlDeleteCategory = `DELETE FROM user_selections WHERE  selection_id = ?`;
  
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

  
  const getUserRecommendationById = (req, res) => {
    try {
        const { id } = req.params;
        const { subcategory_name } = req.query;

        // Query to fetch user profile data
        const getUserProfileQuery = `SELECT * FROM user_profile WHERE user_id = ?`;

        db.query(getUserProfileQuery, [id], (error, userProfileResult) => {
            if (error) {
                return res.status(500).json({ error: "Internal Server Error while fetching user profile" });
            }

            if (userProfileResult.length === 0) {
                return res.status(404).json({ error: "User profile not found" });
            }

            const { per_sq_fit } = userProfileResult[0];

            // Query to fetch recommendations based on per_sq_fit
            const getItemsQuery = `
                SELECT *
                FROM items
                WHERE ? BETWEEN 
                    CAST(SUBSTRING_INDEX(sq_fit_range, '-', 1) AS UNSIGNED) AND 
                    CAST(SUBSTRING_INDEX(sq_fit_range, '-', -1) AS UNSIGNED) AND subcategory_name = ?
            `;

            db.query(getItemsQuery, [per_sq_fit,subcategory_name], (err, itemsResult) => {
                if (err) {
                    return res.status(500).json({ error: "Error fetching recommendations" });
                }

                // Respond with combined user profile and recommendations
                res.status(200).json({
                    userProfile: userProfileResult[0],
                    recommendations: itemsResult
                });
            });
        });
    } catch (error) {
        console.error("Error in getUserRecommendationById:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const updateOnlyUserFianlAmount = async (req, res) => {
  try {
    const { id } = req.params;
    const { after_selection_amount	 } = req.body;

    console.log(after_selection_amount, id);

    const sql = `UPDATE user_profile SET 
    after_selection_amount = ?
    
    WHERE user_id = ?`;

    await new Promise((resolve, reject) => {
      db.query(sql, [after_selection_amount	, id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    res.status(200).json({ message: "after_selection_amount	 Status updated successfully" });
  } catch (error) {
    console.error("Database update error:", error);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};


  
  

  module.exports = {

  createUser,
  getuser_profilebyid,
  getuser_profile,
  updateuser_profile,
  deleteuser_profile,
  createUserSelection,
  getSelectionbyid,
  getuser_Selection,
  updateuser_Selection,
  deleteuser_Selection,
  getUserRecommendationById,updateOnlyUserFianlAmount

   
  };
  