// Import MySQL connection.
const connection = require("../config/connection.js");

const printQuestionMarks = num => {
    let arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push(`?`);
    }
  
    return arr.toString();
}



const objToSql = ob => {

    let arr = [];
  
    for (let key in ob) {
      let value = ob[key];
      
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = `'${value}'`;
        }
        
        arr.push(`${key} = ${value}`);
      }
    }
  
    return arr.toString();

}


const orm = {

    all: (tableInput, cb) => {
      const queryString = `SELECT * FROM ${tableInput};`;
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

    create: (table, cols, vals, cb) => {
        let queryString = "INSERT INTO " + table;
    
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
    
        console.log(queryString);
    
        connection.query(queryString, vals, function(err, result) {
          if (err) {
            throw err;
          }
    
          cb(result);
        });
    },
    update: (table, objColVals, condition, cb) => {
        let queryString = `UPDATE ${table}`;

        queryString += ` SET `;
        queryString += objToSql(objColVals);
        queryString += ` WHERE `;
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, (err, result) => {
        if (err) {
            throw err;
        }

        cb(result);
        });
    },
    delete: (table, condition, cb) => {
      let queryString = "DELETE FROM " + table;
      queryString += " WHERE ";
      queryString += condition;
  
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    }

}

// Export the orm object for the model (cat.js).
module.exports = orm;