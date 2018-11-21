var controller = require('./controller.js');

module.exports = function(app) {
    app.post('/uploadToIpfs', function(req, res, next) {                        
        controller.uploadFile(req, res);        
    });    
}