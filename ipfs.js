var fs = require('fs')
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// ipfs.files.add(['list.pdf'], (err, hash) => {
//     console.log('inside');
//     if(err){
//         console.log(err);
//     }
//     console.log(hash);
// });

// const hash = 'QmTxFmfEViHhcZySdYuVjuVDu3geXBoBXYKCYgbkwsPSWA';
const pdfHash = 'QmeRegn71KpdUMJs9pMrERDjhAjgP5AWF5qNGf1ZxTYzhw';
// ipfs.files.cat(pdfHash, (err, data) => {
//     if(err){
//         console.log(err);
//     }
//     var stream = fs.createWriteStream('outputFile.pdf');
//     stream.on('finish', () => {
//         console.log('file has beenn written...');
//     });
//     stream.write(data);
//     stream.end();
//     //console.log(data.toString('utf8'));
// });

// console.log(ipfs);

ipfs.object.stat(pdfHash, (err, data) => {
    if(err){
        console.log(err);
    }
    console.log(data);
});