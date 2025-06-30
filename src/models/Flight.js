import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Flight = sequelize.define('Flight', {
  startTime: { type: DataTypes.DATE, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false },
  pilotName: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false }
});

export default Flight;