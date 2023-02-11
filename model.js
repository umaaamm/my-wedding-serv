const mongoose = require('mongoose');
const schema = mongoose.Schema;

const undangan = new schema({
    nama: {
        type: String,
    },
    keterangan: {
        type: String,
    },
    isMerchendise:{
        type: String
    },
    tanggal: {
        type: String,
    }
});

console.log('wl', undangan);

const undangans = mongoose.model('undangan', undangan);

module.exports = undangans;