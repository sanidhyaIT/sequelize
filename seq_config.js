let { Sequelize, DataTypes } = require("sequelize");

let sequelize = new Sequelize("newtask", 
"root", 
"", 
{
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Not connected", err);
  });

const Empl = sequelize.define("employee", {
  empid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  empname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  mobile_no: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Empl.sync()
  .then(() => {
    console.log("Table is created");
  })
  .catch(() => {
    console.log("Table not created");
  });

module.exports = Empl;