const app = require('./app')
const DatabaseConnection = require('./src/database/database')
const port = process.env.PORT
DatabaseConnection()

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`)
})