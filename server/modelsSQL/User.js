const { STRING, ENUM } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    name:{
      type: STRING,
      allowNull: false
    },
    userName:{
      type: STRING,
      allowNull: false,
      unique: true
    },
    password:{
      type: STRING,
      allowNull: false,
    }, 
    userRole:{
      type: ENUM("Estudiante", "Moderador"),
      allowNull: false,
      defaultValue: "Estudiante"
    }
  });

  const encryptPassword = async function (user) {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  };
  
  User.prototype.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  User.beforeCreate(encryptPassword);
  User.beforeUpdate(encryptPassword);
  
  return User;
};

