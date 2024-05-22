var logoImage = document.querySelector("#imageLogo");
var bankCardImage = document.querySelector("#imageBankCard")
var twitterImage = document.querySelector("#imageTwitter")
var instagramImage = document.querySelector("#imageInstagram")

var loginForm = document.getElementById("loginForm");
var transactionForm = document.getElementById("transactionForm");

function add(a, b){
    return a + b;
}

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
        
        //Event Listener for login
        if(loginForm != null){
            console.log("dakogjdogj");
            loginForm.addEventListener("submit", e => {
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

        // Event Listener for deposit / withdraw
        if(transactionForm != null){
            transactionForm.addEventListener("submit", e => {
                e.preventDefault();
                var pin = document.getElementById("pin").value;
                // Deposit
                if(e.submitter.id == "deposit") {
                    if(document.getElementById("depositAmount").value != ""){
                        if(document.getElementById("depositAmount").value > 999999999) { // if Amount is too high
                            document.getElementById("depositAmount").value = "";
                            document.getElementById("depositAmount").placeholder = "Deposit a lower Amount!"
                            return;
                        }
                        if(pin == json.accountData.pin) {
                            json.balance = Number(document.getElementById("depositAmount").value) + Number(document.getElementById("currentBalance").innerHTML); // add Amount to Current Balance
                            
                            var jsonObj = json.transHistory;
                            jsonObj.push({"Deposited": document.getElementById("depositAmount").value})
                            document.getElementById("transactions").innerHTML = ""; // clear Transaction History
                            
                            document.getElementById("currentBalance").innerHTML = json.balance; // update Current Balance
                            for (let i = 1; i < jsonObj.length; i++) {
                                document.getElementById("transactions").innerHTML += i + ") " + Object.keys(jsonObj[i]) + ": " +
                                Object.values(jsonObj[i]) + "<br>"; // add all values to Transaction History
                            }
                            document.getElementById("depositAmount").value = ""; // clear Money Amount Field
                        }
                    }
                }
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
                }
            })
        }
})




