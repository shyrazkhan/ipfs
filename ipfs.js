var fs = require('fs')
var Blob = require('blob');
var TextEncoding = require('text-encoding');
const IPFS = require('ipfs-api');
var ab2str = require('arraybuffer-to-string')
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// ipfs.files.add(['main.jpg'], (err, hash) => {
//     console.log('inside');
//     if(err){
//         console.log(err);
//     }
//     console.log(hash);
// });

// const hash = 'QmTxFmfEViHhcZySdYuVjuVDu3geXBoBXYKCYgbkwsPSWA';
const pdfHash = 'QmeRegn71KpdUMJs9pMrERDjhAjgP5AWF5qNGf1ZxTYzhw';
const imgHash = 'QmSTMWj62RccuBypAbVdr9L9c1erSrCQuLR8rQPvhm1mD5';
const img2Hash = 'Qmch3ZFTW51HWcXoeLmFGhPttFJTw2XitK2G6tJLaPRM9y';

// ipfs.files.cat('QmQNCZ9RL3YUgQJitZQPcXvhgAvrGizFRLSgKnqWbhV26s', (err, data) => {
//     if (err) {
//         console.log(err);
//     }

//     console.log(data);

//     //var buffer = Buffer.from(data);
//     // var arraybuffer = Uint8Array.from(buffer).buffer;      

//     // var all = fs.createWriteStream("out." + "txt");
//     // for(var i = 0; i < data.length; i++){
//     //     var buffer = new Buffer(new Uint8Array(data[i]));
//     //     all.write(buffer);
//     // }
//     // all.end();

//     // fs.writeFile('m1.jpg', data.toString('binary'),'binary', function(err){
//     //     if (err) throw err
//     //     console.log('File saved.')
//     // })
//     // var dataNew = data.toString().replace(/^data:image\/\w+;base64,/, "")
//     // var buf = new Buffer(dataNew, 'base64');
//     // fs.writeFile('m1.jpg', buf, function(err) {
//     //      console.log('File saved.')
//     // });

//     // var stream = fs.createWriteStream('m1.jpg');
//     // stream.on('finish', () => {
//     //     console.log('file has been written...');
//     // });     
//     // stream.write(data.toString('binary'));
//     // stream.end();

//     //console.log(data.toString('utf8'));
// });

ipfs.files.get('QmQNCZ9RL3YUgQJitZQPcXvhgAvrGizFRLSgKnqWbhV26s', (err, data) => {
    if(err){
        console.log(err);
    }
    // var stream = fs.createWriteStream('ethereum.png');
    // stream.on('finish', () => {
    //     console.log('file has beenn written...');
    // });
    // stream.write(data[0].content);
    // stream.end();
    //console.log(data[0].content.toString('utf8'));
    console.log(data);
});



// console.log(ipfs);

// ipfs.object.stat(pdfHash, (err, data) => {
//     if(err){
//         console.log(err);
//     }
//     console.log(data);
// });   