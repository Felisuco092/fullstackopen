const app = require('./app')
const config = require('./utils/config')
const { info, error } = require('./utils/logger')

const PORT = config.PORT
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})