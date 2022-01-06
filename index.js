const express = require('express')
const app = express()
const port = 3000

app.use(express.static('build'));

app.get('/', (req, res) => {
    //res.send('Hello World!')
    res.sendFile('./build/index.html');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})