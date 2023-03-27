const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'expense_tracker_project','root','mysql123',{
    dialect : 'mysql',
    host: 'localhost'
  }
);

module.exports = sequelize;