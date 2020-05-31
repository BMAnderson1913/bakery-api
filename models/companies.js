
const companies = (connection, sequelize) => {
  return connection.define('companies', {
    id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    companyName: { type: sequelize.STRING, allowNull: false }
  }, {
    defaultScope: {
      attributes: { exclude: ['updatedAt', 'deletedAt', 'createdAt'] }
    }
  }, {
    paranoid: true,
  })
}

module.exports = companies
