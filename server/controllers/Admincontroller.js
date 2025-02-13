const { db } = require("../db");



const createcategories = (req, res) => {
    const {
        category_name
    } = req.body;
    const sql = `INSERT INTO categories (category_name) VALUES (?)`;
    db.query(
      sql,
      [
        category_name
      ],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error inserting data" });
        } else {
          res
            .status(201)
            .json({ success: true, message: "categories data successfully submitted" });
        }
      }
    );
  };

  const getcategoriesbyid = (req, res) => {
    try {
      const { id } = req.params;
  
      const getQuery = `SELECT * FROM categories WHERE category_id = ?`;
  
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
 
  
  const getcategories = (req, res) => {
    const sql = "SELECT * FROM categories"; 
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error fetching data" });
      } else {
        res.status(200).json(results);
      }
    });
  };
  
  
  const updatecategories = async (req, res) => {
    try {
      const { category_id } = req.params;
      const {
        category_name
      } = req.body;
  
      // Construct SQL query to update the lead
      const sql = `UPDATE categories 
                   SET category_name = ? 
                   WHERE category_id = ?`;
  
      // Execute the update query asynchronously
      await new Promise((resolve, reject) => {
        db.query(
          sql,
          [
           category_name,
           category_id
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
  
      res.status(200).json({ message: "categories updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const deletecategories = (req, res) => {
    const { category_id } = req.params;
  
    // Validate the category_id
    if (!category_id) {
      return res.status(400).json({ error: "Category ID is required" });
    }
  
    // SQL query to delete the category
    const sqlDeleteCategory = `DELETE FROM categories WHERE category_id = ?`;
  
    db.query(sqlDeleteCategory, [category_id], (err, results) => {
      if (err) {
        console.error("Error deleting category:", err);
        return res.status(500).json({ error: "Error deleting the category" });
      }
  
      if (results.affectedRows === 0) {
        // No rows affected means the category_id does not exist
        return res.status(404).json({ error: "Category not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Category successfully deleted",
      });
    });
  };
  
const createsubcategories = (req, res) => {
    const {
        category_id , category_name,subcategory_name
    } = req.body;
    const sql = `INSERT INTO subcategories (category_id , category_name,subcategory_name) VALUES (?,?,?)`;
    db.query(
      sql,
      [
        category_id , category_name,subcategory_name
      ],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error inserting data" });
        } else {
          res
            .status(201)
            .json({ success: true, message: "subcategories data successfully submitted" });
        }
      }
    );
  };

  const getsubcategoriesbyid = (req, res) => {
    try {
      const { id } = req.params;
  
      const getQuery = `SELECT * FROM subcategories WHERE category_id  = ?`;
  
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
 
  
  const getsubcategories = (req, res) => {
    const sql = "SELECT * FROM subcategories"; 
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error fetching data" });
      } else {
        res.status(200).json(results);
      }
    });
  };
  
  
  const updatesubcategories = async (req, res) => {
    try {
      const { subcategory_id  } = req.params;
      const {
        category_id , category_name,subcategory_name
      } = req.body;
  
      // Construct SQL query to update the lead
      const sql = `UPDATE subcategories 
                   SET category_id = ?,category_name = ?,subcategory_name=? 
                   WHERE subcategory_id  = ?`;
  
      // Execute the update query asynchronously
      await new Promise((resolve, reject) => {
        db.query(
          sql,
          [
            category_id,category_name,subcategory_name,subcategory_id
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
  
      res.status(200).json({ message: "subcategories updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const deletesubcategories = (req, res) => {
    const { subcategory_id  } = req.params;
  
    // Validate the subcategory_id 
    if (!subcategory_id ) {
      return res.status(400).json({ error: "Sub Category ID is required" });
    }
  
    // SQL query to delete the Sub Category
    const sqlDeleteCategory = `DELETE FROM subcategories WHERE subcategory_id  = ?`;
  
    db.query(sqlDeleteCategory, [subcategory_id], (err, results) => {
      if (err) {
        console.error("Error deleting Sub Category:", err);
        return res.status(500).json({ error: "Error deleting the Sub Category" });
      }
  
      if (results.affectedRows === 0) {
        // No rows affected means the subcategory_id  does not exist
        return res.status(404).json({ error: "Sub Category not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Sub Category successfully deleted",
      });
    });
  };

const createitems = (req, res) => {
    const {
        subcategory_id , subcategory_name,item_name,	description,	unit_price,unit_price_type,recommendation_description,sq_fit_range
    } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }
    
    const { filename } = req.file; // Extract file details from multer
    console.log(subcategory_id , subcategory_name,item_name,	description,	unit_price,unit_price_type,filename,recommendation_description,sq_fit_range);
    const ItemImagePath = "http://localhost:9000/uploads/" + filename;
    console.log(ItemImagePath);
    
    const sql = `
    INSERT INTO items (
      subcategory_id, 
      subcategory_name, 
      item_name, 
      description, 
      unit_price, 
      image_items, 
      unit_price_type,recommendation_description,sq_fit_range
    ) VALUES (?, ?, ?, ?, ?, ?, ? , ? , ?)
  `;

  // Execute the query
  db.query(
    sql,
    [
      subcategory_id,
      subcategory_name,
      item_name,
      description,
      unit_price,
      ItemImagePath,
      unit_price_type,
      recommendation_description,sq_fit_range
    ],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: "Error inserting data" });
        } else {
          res
            .status(201)
            .json({ success: true, message: "items data successfully submitted" });
        }
      }
    );
  };

  const getitemsbyid = (req, res) => {
    try {
      const { id } = req.params;
  
      const getQuery = `SELECT * FROM items WHERE subcategory_id  = ?`;
  
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
 
  
  const getitems = (req, res) => {
    const sql = "SELECT * FROM items"; 
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error fetching data" });
      } else {
        res.status(200).json(results);
      }
    });
  };
  
  
  const updateitems = async (req, res) => {
    try {
      const { item_id  } = req.params;
      const {
        subcategory_id , subcategory_name,item_name,	description,	unit_price,unit_price_type,recommendation_description,sq_fit_range
      } = req.body;

      let ItemImagePath = req.body.image_items; // Retain existing image if no new image uploaded

console.log(ItemImagePath);

      if (req.file) {
        const { filename } = req.file; // Get new file details if provided
        ItemImagePath = `http://localhost:9000/uploads/${filename}`;
      }
      console.log(ItemImagePath);
      
      
  
      // Construct SQL query to update the item
      const sql = `UPDATE items 
                   SET  subcategory_id = ?  , subcategory_name = ? ,item_name = ? ,	description = ? ,	unit_price = ?, image_items = ?, unit_price_type = ?,recommendation_description = ? ,sq_fit_range = ?
                   WHERE item_id  = ?`;
  
      // Execute the update query asynchronously
      await new Promise((resolve, reject) => {
        db.query(
          sql,
          [
            subcategory_id, subcategory_name, item_name,	description,	unit_price,ItemImagePath,unit_price_type,recommendation_description,sq_fit_range, item_id
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
  
      res.status(200).json({ message: "items updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const deleteitems = (req, res) => {
    const { item_id  } = req.params;
  
    // Validate the item_id 
    if (!item_id ) {
      return res.status(400).json({ error: "Item ID is required" });
    }
  
    // SQL query to delete the Item
    const sqlDeleteCategory = `DELETE FROM items WHERE item_id  = ?`;
  
    db.query(sqlDeleteCategory, [item_id], (err, results) => {
      if (err) {
        console.error("Error deleting Item:", err);
        return res.status(500).json({ error: "Error deleting the Item" });
      }
  
      if (results.affectedRows === 0) {
        // No rows affected means the item_id  does not exist
        return res.status(404).json({ error: "Item not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "Item successfully deleted",
      });
    });
  };
  

  const user_register = async (req, res) => {
    try {
      const { name, email, password, roles, phone_no } = req.body;
  
      // Assign default value to phone_no if not provided
      const finalPhoneNo = phone_no || "NULL";
  
      // Validate required fields
      if (!name || !email || !password || !roles) {
        return res.status(400).json({ message: "Name, email, password, and roles are required." });
      }
  
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(password, saltRounds);
  
      // Check if the user already exists
      const checkUserQuery = "SELECT * FROM user_enroll WHERE email = ?";
      db.query(checkUserQuery, [email], (err, result) => {
        if (err) {
          console.error("Error checking user in MySQL:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
  
        if (result.length > 0) {
          return res.status(400).json({ message: "User already exists." });
        }
  
        // User not found, proceed with registration
        const insertUserQuery = `
          INSERT INTO user_enroll (user_name, email, password, roles, phone_no) 
          VALUES (?, ?, ?, ?, ?)`;
        const insertUserParams = [name, email, hashedPassword, roles, finalPhoneNo];
  
        db.query(insertUserQuery, insertUserParams, (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error inserting user:", insertErr);
            return res.status(500).json({ message: "Internal server error" });
          }
  
          console.log("User registered successfully");
          return res.status(201).json({
            success: true,
            message: "User registered successfully",
          });
        });
      });
    } catch (error) {
      console.error("Error in registration:", error);
      return res.status(500).json({
        success: false,
        message: "Error in registration",
        error: error.message,
      });
    }
  };

  const getuserbyid = (req, res) => {
    try {
      const { id } = req.params;
  
      const getQuery = `SELECT * FROM user_enroll WHERE id  = ?`;
  
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
 
  
  const getuser = (req, res) => {
    const sql = "SELECT * FROM user_enroll"; 
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error fetching data" });
      } else {
        res.status(200).json(results);
      }
    });
  };
  
  
  const updateuser = async (req, res) => {
    try {
      const { id  } = req.params;
      const {
        user_name, email, phone_no
      } = req.body;
  console.log(user_name,email,phone_no);
  
      // Construct SQL query to update the item
      const sql = `UPDATE user_enroll 
                   SET  user_name = ? , email = ?, phone_no = ?
                   WHERE id  = ?`;
  
      // Execute the update query asynchronously
      await new Promise((resolve, reject) => {
        db.query(
          sql,
          [
            user_name, email, phone_no ,id
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
  
      res.status(200).json({ message: "user updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const deleteuser = (req, res) => {
    const { id  } = req.params;
  
    // Validate the id 
    if (!id ) {
      return res.status(400).json({ error: "ID is required" });
    }
  
    // SQL query to delete the User
    const sqlDeleteCategory = `DELETE FROM user_enroll WHERE id  = ?`;
  
    db.query(sqlDeleteCategory, [id], (err, results) => {
      if (err) {
        console.error("Error deleting User:", err);
        return res.status(500).json({ error: "Error deleting the User" });
      }
  
      if (results.affectedRows === 0) {
        // No rows affected means the User_id  does not exist
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({
        success: true,
        message: "User successfully deleted",
      });
    });
  };

  
const createDiscount = (req, res) => {
  const {
    value,conditions,offer
  } = req.body;
  console.log(value,conditions,offer);
    // Extract numeric value from `plot_area`
  
  const sql = `INSERT INTO discount (value,conditions,offer) VALUES (?,?,?)`;
  db.query(
    sql,
    [
      value,conditions,offer
    ],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Error inserting data" });
      } else {
        res
          .status(201)
          .json({ success: true, message: "discount data successfully submitted" });
      }
    }
  );
};

const getDiscountbyid = (req, res) => {
  try {
    const { id } = req.params;

    const getQuery = `SELECT * FROM discount WHERE id  = ?`;

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


const getDiscount = (req, res) => {
  const sql = "SELECT * FROM discount"; 
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error fetching data" });
    } else {
      res.status(200).json(results);
    }
  });
};


const updateDiscount = async (req, res) => {
  try {
    const { id  } = req.params;
    const {
      value,conditions,offer
    } = req.body;
console.log( value,conditions,offer,id);

  
    // Construct SQL query to update the item
    const sql = `UPDATE discount 
                 SET    value = ? ,conditions = ?,offer = ?
                 WHERE id  = ?`;

    // Execute the update query asynchronously
    await new Promise((resolve, reject) => {
      db.query(
        sql,
        [
          value,conditions,offer,id
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

    res.status(200).json({ message: "discount updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteDiscount = (req, res) => {
  const { id  } = req.params;

  // Validate the id 
  if (!id ) {
    return res.status(400).json({ error: " ID is required" });
  }

  // SQL query to delete the Discount 
  const sqlDeleteCategory = `DELETE FROM discount WHERE id  = ?`;

  db.query(sqlDeleteCategory, [id], (err, results) => {
    if (err) {
      console.error("Error deleting Discount:", err);
      return res.status(500).json({ error: "Error deleting the Discount" });
    }

    if (results.affectedRows === 0) {
      // No rows affected means the id  does not exist
      return res.status(404).json({ error: "Discount not found" });
    }

    res.status(200).json({
      success: true,
      message: "Discount successfully deleted",
    });
  });
};


  
  
  

  module.exports = {
 
  createcategories,
  getcategoriesbyid,
  getcategories,
  updatecategories,
  deletecategories,
  createsubcategories,
  getsubcategoriesbyid,
  getsubcategories,
  updatesubcategories,
  deletesubcategories,
  createitems,
  getitemsbyid,
  getitems,
  updateitems,
  deleteitems,
  getuserbyid,
  getuser,
  updateuser,
  deleteuser,
  createDiscount,getDiscountbyid,getDiscount,updateDiscount,deleteDiscount
  };
  