const JWT = require("jsonwebtoken");
const { db } = require("../db");
const dotenv = require("dotenv");
dotenv.config();

const verifyUserToken = async (token) => {
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        
        
        // Check if the user exists in the database
        const query = 'SELECT * FROM user_enroll  WHERE  id = ?';
        const params = [decoded.id];
        console.log(params);
        

        return new Promise((resolve, reject) => {
            db.query(query, params, (error, results) => {
                if (error) {
                    console.error('Error executing query:', error);
                    reject(error);
                    return;
                }

                if (!results || results.length === 0) {
                    console.error('User not found in the database !!');
                    resolve(null);
                    return;
                }

                const user = results[0]; // Assuming user data is in the first row
                // The user object contains the user information
                resolve(user);
            });
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }

   
};

module.exports = verifyUserToken;