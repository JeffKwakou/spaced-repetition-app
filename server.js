const app = require('./index')

const port = 3000

// Launch server on port 3000
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})