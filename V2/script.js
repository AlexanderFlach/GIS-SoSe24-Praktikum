var logoImage = document.querySelector("#imageLogo");
var bankCardImage = document.querySelector("#imageBankCard")
var twitterImage = document.querySelector("#imageTwitter")
var instagramImage = document.querySelector("#imageInstagram")

var loginForm = document.getElementById("loginForm");
var transactionForm = document.getElementById("transactionForm");


fetch("data.json")
    .then(response => response.json())

    .then(json => {
        // Images
        if(logoImage != null) {logoImage.src = json.image1;}
        if(bankCardImage != null) {bankCardImage.src = json.image2;}
        if(twitterImage != null) {twitterImage.src = json.image3;}
        if(instagramImage != null) {instagramImage.src = json.image4;}
        
        if(loginForm != null){
            loginForm.addEventListener("submit", (e) => {
                var username = document.getElementById("username").value;
                var password = document.getElementById("password").value;
            
                if(username != json.accountData.username){
                    e.preventDefault();
                    document.getElementById("username").value = null;
                    document.getElementById("username").placeholder = "Wrong Username!";
                }
                if(password != json.accountData.password){
                    e.preventDefault();
                        document.getElementById("password").value = null;
                        document.getElementById("password").placeholder = "Wrong Password!";
                }
            })
        }

        if(transactionForm != null){
            transactionForm.addEventListener("submit", (e) => {
                e.preventDefault();
                var pin = document.getElementById("pin").value;

                if(pin == json.accountData.pin) {
                    console.log("PIN correct!");
                }
                
            })
        }
})




