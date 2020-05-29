const companies = (connection, Sequelize) => {
  return connection.define('companies', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    companyName: { type: Sequelize.STRING, allowNull: false },
  })
}

module.exports = companies
