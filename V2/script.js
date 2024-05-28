var logoImage = document.querySelector("#imageLogo");
var bankCardImage = document.querySelector("#imageBankCard");
var twitterImage = document.querySelector("#imageTwitter");
var instagramImage = document.querySelector("#imageInstagram");

var registerForm = document.getElementById("registerForm");
var loginForm = document.getElementById("loginForm");
var transactionForm = document.getElementById("transactionForm");

var balance = localStorage.setItem("balance", 250);


fetch("data.json")
    .then(response => response.json())

    .then(json => {
        // Images
        if(logoImage != null) {logoImage.src = json.image1;}
        if(bankCardImage != null) {bankCardImage.src = json.image2;}
        if(twitterImage != null) {twitterImage.src = json.image3;}
        if(instagramImage != null) {instagramImage.src = json.image4;}
        
        if(document.getElementById("currentBalance") != null) {
            document.getElementById("currentBalance").innerHTML += json.balance;
        }
        if(document.getElementById("thTitle") != null) {
            document.getElementById("thTitle").innerHTML = json.transHistory[0].title;
        }
        
        //Event Listener for Register
        if(registerForm != null){
            registerForm.addEventListener("submit", e => {
                if(document.getElementById("username").value != ""){
                    localStorage.setItem("username", document.getElementById("username").value);
                }
                else{
                    e.preventDefault();
                    document.getElementById("username").placeholder = "Enter username!"
                }
                if(document.getElementById("password").value != ""){
                    localStorage.setItem("password", document.getElementById("password").value);
                }
                else{
                    e.preventDefault();
                    document.getElementById("password").placeholder = "Enter password!";
                }
                if(document.getElementById("pin").value != ""){
                    localStorage.setItem("pin", document.getElementById("pin").value);
                }
                else{
                    e.preventDefault();
                    document.getElementById("pin").placeholder = "Enter PIN";
                }
            })
        }

        //Event Listener for login
        if(loginForm != null){
            console.log(localStorage.getItem("username"));
            console.log(localStorage.getItem("password"));
            loginForm.addEventListener("submit", e => {
                var username = document.getElementById("username").value;
                var password = document.getElementById("password").value;

                if(username != localStorage.getItem("username")){
                    e.preventDefault();
                    document.getElementById("username").value = null;
                    document.getElementById("username").placeholder = "Wrong Username!";
                    console.log(localStorage.getItem("username"));
                }
                if(password != localStorage.getItem("password")){
                    e.preventDefault();
                        document.getElementById("password").value = null;
                        document.getElementById("password").placeholder = "Wrong Password!";
                        console.log(localStorage.getItem("password"));

                }
            })
        }


        if(transactionForm != null){
            document.getElementById("currentBalance").innerHTML = localStorage.getItem("balance");
            transactionForm.addEventListener("submit", e => {
                e.preventDefault();
                var pin = document.getElementById("pin").value;
                //Deposit
                if(e.submitter.id == "deposit"){
                    console.log("deposit gedrückt");
                    if(document.getElementById("depositAmount").value != ""){
                        if(document.getElementById("depositAmount").value > 999999999) { // if Amount is too high
                            document.getElementById("depositAmount").value = "";
                            document.getElementById("depositAmount").placeholder = "Deposit a lower Amount!"
                            return;
                        }
                    }
                    if(pin == localStorage.getItem("pin")){
                        localStorage.setItem("balance", Number(document.getElementById("depositAmount").value) + Number(document.getElementById("currentBalance").innerHTML)); // add Amount to Current Balance)
                        document.getElementById("transactions").innerHTML = ""; // clear Transaction History
                        document.getElementById("currentBalance").innerHTML = localStorage.getItem("balance"); // update Current Balance
                    }
                }
            })
        }
        // Event Listener for deposit / withdraw
        if(transactionForm != null){
            transactionForm.addEventListener("submit", e => {
                e.preventDefault();
                var pin = document.getElementById("pin").value;
               /* 
                // Withdraw
                else if(document.getElementById("withdrawAmount").value != "") {
                        if(document.getElementById("withdrawAmount").value > 999999999) { // if Amount is too high
                            document.getElementById("withdrawAmount").value = "";
                            document.getElementById("withdrawAmount").placeholder = "Withdraw a lower Amount!"
                            return;
                        }
                    if(pin == json.accountData.pin) {
                        if(Number(document.getElementById("currentBalance").innerHTML) - Number(document.getElementById("withdrawAmount").value) >= 0){ // checks Current Balance - Withdrawel Amount
                            json.balance = Number(document.getElementById("currentBalance").innerHTML) - Number(document.getElementById("withdrawAmount").value); // subtract Amount of Current Balance

                            var jsonObj = json.transHistory;
                            jsonObj.push({"Withdrawed": document.getElementById("withdrawAmount").value})
                            document.getElementById("transactions").innerHTML = ""; // clear Transaction History
    
                            document.getElementById("currentBalance").innerHTML = json.balance; // update Current Balance
                            for (let i = 1; i < jsonObj.length; i++) {
                                document.getElementById("transactions").innerHTML += Object.keys(jsonObj[i]) + ": " +
                                Object.values(jsonObj[i]) + "<br>"; // add all values to Transaction History
                            }
                            document.getElementById("withdrawAmount").value = ""; // clear Money Amount Field
                        }
                        else{ // Current Balance - Withdrawel < 0
                            document.getElementById("withdrawAmount").value = "";
                            document.getElementById("withdrawAmount").placeholder = "Not enought Money!";
                        }
                    }
                }*/
            })
        }
})




