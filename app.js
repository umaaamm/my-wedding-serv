const express = require('express')
const mongose = require('mongoose')
const serverless = require('serverless-http')
const app = express()
const port = 3000
const undanganSch = require('./model');
// var database = require('./database');


const uri = 'mongodb://wedding:weddingPassword@ac-hnk0d31-shard-00-00.g3sbyor.mongodb.net:27017,ac-hnk0d31-shard-00-01.g3sbyor.mongodb.net:27017,ac-hnk0d31-shard-00-02.g3sbyor.mongodb.net:27017/?ssl=true&replicaSet=atlas-12gnvk-shard-0&authSource=admin&retryWrites=true&w=majority';
async function connect() {
    try {
        await mongose.connect(uri, {
            dbName: 'myWedding',
        });
    } catch (error) {
        console.log(error)
    }
}

connect()


app.get('/', (req, res) => {
    res.send('Hello this is my services for app wedding')
    const wedding = new undanganSch({
        nama: 'Dhimas',
        keterangan: 'Hadir',
        isMerchendise: '1',
        tanggal: Date.now()
    });

    wedding.save().then((result) => {
        console.log('blok', result);

    }).catch((error) => {
        console.log(error);
    });
})

app.get('/summary', async (req, res) => {
    var isMarchendiseCount = await undanganSch.find({ isMerchendise: "1" }).count();
    var keteranganCount = await undanganSch.find({ keterangan: "Hadir" }).count();
    var totalCount = await undanganSch.find().count();

    res.json({ message: "ok", data: {"isMarchendiseCount": isMarchendiseCount,  "keteranganCount": keteranganCount ,"totalCount": totalCount} });
})

app.get('/list', (req, res) => {
    undanganSch.find().then((result) => {
        res.json({ message: "ok", data: result });
    }).catch((error) => {
        res.json({ message: "error", data: "Gagal mengambil data dari database." });
    });


    // var query = "select * from tbl_undangan";
    // database.query(query, function (error, data) {
    //     if (error) {
    //         res.json({ message: "error", data: "Gagal mengambil data dari database." });
    //     } else {
    //         res.json({ message: "ok", data: data });
    //     }
    // });
})

app.get('/edit/(:id)/(:keterangan)', (req, res, next) => {
    let id = req.params.id;
    // var keterangan = req.params.keterangan;
    let updates={}
    updates["keterangan"] = req.params.keterangan;

    undanganSch.findByIdAndUpdate(id, updates).then((result)=> {
        res.json({ message: "ok", data: "Berhasil mengupdate data." });
    }).catch((error)=>{
        res.json({ message: "error", data: "Gagal mengupdate data." });
    })

    // var query = `update tbl_undangan set keterangan="${keterangan}" where id=` + id
    // database.query(query, function (error, data) {
    //     if (error) {
    //         res.json({ message: "error", data: "Gagal mengupdate data." });
    //     } else {
    //         res.json({ message: "ok", data: "Berhasil mengupdate data." });
    //     }

    // });
})

app.get('/edit-marchendise/(:id)/(:isMarchendise)', (req, res, next) => {
    let id = req.params.id;
    // var isMarchendise = req.params.isMarchendise;

    // var query = `update tbl_undangan set isMarchendise="${isMarchendise}" where id=` + id
    // console.log('majama', query)
    // database.query(query, function (error, data) {
    //     if (error) {
    //         res.json({ message: "error", data: "Gagal mengupdate data." });
    //     } else {
    //         res.json({ message: "ok", data: "Berhasil mengupdate data." });
    //     }

    // });


    // let id = req.params.id;
    // var keterangan = req.params.keterangan;
    let updates={}
    updates["isMerchendise"] = req.params.isMarchendise;

    undanganSch.findByIdAndUpdate(id, updates).then((result)=> {
        res.json({ message: "ok", data: "Berhasil mengupdate data." });
    }).catch((error)=>{
        res.json({ message: "error", data: "Gagal mengupdate data." });
    })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// app.use('/.netlify/functions/app')
// module.exports.handler = serverless(app);
