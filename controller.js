var formidable = require('formidable');
var fs = require('fs');
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

module.exports = (function () {
    return {

        uploadFile: function (req, res) {
            if (req.method === 'POST') {
                var form = new formidable.IncomingForm();
                form.parse(req, function (err, fields, files) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    }
                    else {
                        const buffer = Buffer.from(fields.content);                        
                        console.log(buffer);                        
                        let files = [
                            {
                                path: fields.name,
                                content: buffer
                            }
                        ]
                        ipfs.files.add(files, (err, hash) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(hash)
                            }
                        });
                        res.send('File Received...');
                    }
                });
                // let body = '';
                // req.on('data', chunk => {
                //     console.log(chunk);
                //     body += chunk.toString(); // convert Buffer to string
                // });
                // req.on('end', () => {
                //     console.log(body);                    
                // });
            }
        }
    }
})();