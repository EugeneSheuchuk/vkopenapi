const express = require('express')
const app = express()

let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}

app.use(express.static('build'));

app.get('*', (req, res) => {
    //res.send('Hello World!')
    res.sendFile('./build/index.html');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})