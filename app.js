const express = require('express')
const app = express()
const port = 3000

var database = require('./database');


app.get('/', (req, res) => {
    res.send('Hello this is my services for app wedding')
})

app.get('/list', (req, res) => {

    var query = "select * from tbl_undangan";
    database.query(query, function (error, data) {
        if (error) {
            res.json({ message: "error", data: "Gagal mengambil data dari database." });
        } else {
            res.json({ message: "ok", data: data });
        }

    });
})

app.get('/edit/(:id)/(:keterangan)', (req, res, next) => {
    let id = req.params.id;
    var keterangan = req.params.keterangan;

    var query = `update tbl_undangan set keterangan="${keterangan}" where id=`+id
    database.query(query, function (error, data) {
        if (error) {
            res.json({ message: "error", data: "Gagal mengupdate data." });
        } else {
            res.json({ message: "ok", data: "Berhasil mengupdate data." });
        }

    });
})

app.get('/edit-marchendise/(:id)/(:isMarchendise)', (req, res, next) => {
    let id = req.params.id;
    var isMarchendise = req.params.isMarchendise;

    var query = `update tbl_undangan set isMarchendise="${isMarchendise}" where id=`+id
    console.log('majama', query)
    database.query(query, function (error, data) {
        if (error) {
            res.json({ message: "error", data: "Gagal mengupdate data." });
        } else {
            res.json({ message: "ok", data: "Berhasil mengupdate data." });
        }

    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
