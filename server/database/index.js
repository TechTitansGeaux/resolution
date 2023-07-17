const { Sequelize, DataTypes } = require('sequelize');

// Create sequelize connection to mysql database
const sequelize = new Sequelize({
  host: '127.0.0.1',
  dialect: 'mysql',
  username: 'root',
  password: '',
  database: 'resolution'
});

// Declare our schema. This is the shape of our data
const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: DataTypes.STRING(100),
  points: DataTypes.INTEGER,
  trophy: DataTypes.STRING(100),
}, { timestamps: true });

const Messages = sequelize.define('Messages', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
    }
  },
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  img: {
    type: DataTypes.STRING(100)
  }
}, { timestamps: true });

const Void = sequelize.define('Void', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  text: {
    type: DataTypes.TEXT
  }
}, {timestamps: true});

module.exports = {
  db: sequelize,
  Users,
  Messages,
  Void
};
