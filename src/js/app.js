var fileResult;

App = {

    fileResult: null,
    fileName: null,
    web3Provider: null,
    contracts: {},
    account: '0x0',
    metaWallet: null,


    init: function () {
        $('#connection-error').hide();
        if (typeof web3 !== 'undefined') { // meta mask is connected
            if (web3.currentProvider.isMetaMask) {
                metaWallet = web3;
                var selectedAddress = ""
                var selectedNetwork = "";

                web3.version.getNetwork((err, netId) => {
                    console.log(netId);
                    switch (netId) {
                        case "1":
                            console.log('Mainnet')
                            selectedNetwork = 'Mainnet'
                            break
                        case "2":
                            console.log('This is the deprecated Morden test network.')
                            selectedNetwork = 'This is the deprecated Morden test network.'
                            break
                        case "3":
                            console.log('Ropsten');
                            selectedNetwork = 'Ropsten';
                            break
                        case "4":
                            console.log('Rinkeby');
                            selectedNetwork = 'Rinkeby';
                            break
                        case "42":
                            console.log('Kovan');
                            selectedNetwork = 'Kovan';
                            break
                        default:
                            console.log('Private');
                            selectedNetwork = 'Private';
                    }
                    $('.text-connected-network').text(selectedNetwork);
                });

                web3.eth.getAccounts((err, accts) => {
                    selectedAddress = accts[0];
                    account = accts[0];
                    $('.text-connected-address').text(selectedAddress);
                });

                $('.text-connected-client').text("Meta Mask");
            }
            //App.web3Provider = web3.currentProvider;
        } else {  //meta mask is not working. 
            metaWallet = null;
            $('#connection-error').text("Please check your Meta mask isn't working.");
            $('#connection-error').show();
            $('.text-connected-client').text("");
            $('.text-connected-network').text("");
            $('.text-connected-address').text("");
        }
    },

    captureFile: function (event) {
        $('#loading').show();
        const file = event.files[0]
        fileName = file.name;
        let reader = new window.FileReader()
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            console.log(file);
            $('#loading').hide();
            fileResult = reader.result;
        }
    },

    onSubmit: function (e) {
        $('#loading').show();        
        App.accountValidation(function () {
            var form_data = new FormData();
            form_data.append("content", fileResult);
            form_data.append("name", fileName);
            form_data.append("address", account);

            console.log(true);
            
            $.ajax({
                type: 'POST',
                async: false,
                cache: false,
                url: "http://localhost:3000/uploadToIpfs",
                data: form_data,
                processData: false,
                contentType: false, //'multipart/form-data',
                success: function (result) {                    
                    $('#loading').hide();
                    console.log(result);
                    alert('File has been uploaded to blockchain...');
                },
                error: function (err) {
                    $('#loading').hide();                    
                    console.log(err);
                }
            });
        });
    },

    accountValidation: function (success, failed) {
        web3.eth.getAccounts((err, accts) => {
            web3.eth.getBalance(accts[0], (err, balance) => {
                debugger;
                var bal = balance.toNumber();
                if (bal > 1) {
                    success();
                }
            });
        });
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
