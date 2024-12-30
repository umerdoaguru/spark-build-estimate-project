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
  
      const getQuery = `SELECT * FROM subcategories WHERE subcategory_id  = ?`;
  
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
        subcategory_id , subcategory_name,item_name,	description,	unit_price
    } = req.body;
    const sql = `INSERT INTO items (subcategory_id , subcategory_name,item_name,	description,	unit_price) VALUES (?,?,?,?,?)`;
    db.query(
      sql,
      [
        subcategory_id , subcategory_name,item_name,	description,	unit_price
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
  
      const getQuery = `SELECT * FROM items WHERE item_id  = ?`;
  
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
        subcategory_id , subcategory_name,item_name,	description,	unit_price
      } = req.body;
  
      // Construct SQL query to update the item
      const sql = `UPDATE items 
                   SET  subcategory_id = ?  , subcategory_name = ? ,item_name = ? ,	description = ? ,	unit_price = ?
                   WHERE item_id  = ?`;
  
      // Execute the update query asynchronously
      await new Promise((resolve, reject) => {
        db.query(
          sql,
          [
            subcategory_id, subcategory_name, item_name,	description,	unit_price, item_id
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
   
  };
  