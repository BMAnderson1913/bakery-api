export default (connection, sequelize) => connection.define('companies', {
  id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  companyName: { type: sequelize.STRING, allowNull: false },
}, {
  defaultScope: {
    attributes: { exclude: ['updatedAt', 'deletedAt', 'createdAt'] },
  },
}, {
  paranoid: true,
})
