var logoImage = document.querySelector("#imageLogo");
var bankCardImage = document.querySelector("#imageBankCard");
var twitterImage = document.querySelector("#imageTwitter");
var instagramImage = document.querySelector("#imageInstagram");

var registerForm = document.getElementById("registerForm");
var loginForm = document.getElementById("loginForm");
var transactionForm = document.getElementById("transactionForm");

//var balance = localStorage.setItem("balance", 250);
//var transactionHistory = JSON.parse(localStorage.getItem("transactionHistory"));


fetch("data.json")
    .then(response => response.json())

    .then(json => {
        // Images
        if(logoImage != null) {logoImage.src = json.image1;}
        if(bankCardImage != null) {bankCardImage.src = json.image2;}
        if(twitterImage != null) {twitterImage.src = json.image3;}
        if(instagramImage != null) {instagramImage.src = json.image4;}
        
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
            
            var array = JSON.parse(localStorage.getItem("transactionsHistory"));
            for(i in array){
                document.getElementById("transactions").innerHTML += array[i] + "<br>";
            }
            console.log(array);
            
            
            
            transactionForm.addEventListener("submit", e => {
                e.preventDefault();
                var pin = document.getElementById("pin").value;

                //right pin
                if(pin == localStorage.getItem("pin")){
                    //deposit
                    if(e.submitter.id == "deposit"){
                                        
                        if(document.getElementById("depositAmount").value != ""){
                            if(document.getElementById("depositAmount").value > 999999999) { // if Amount is too high
                                document.getElementById("depositAmount").value = "";
                                document.getElementById("depositAmount").placeholder = "Deposit a lower amount!";
                            }
                            else{
                                document.getElementById("depositAmount").placeholder = "00.00€";
                                localStorage.setItem("balance", Number(document.getElementById("depositAmount").value) + Number(document.getElementById("currentBalance").innerHTML)); // add Amount to Current Balance)
                                var testArray = [];
                                if(localStorage.getItem("transactionsHistory") != null){
                                    testArray = (JSON.parse(localStorage.getItem("transactionsHistory")));
                                }
                                testArray.push(document.getElementById("depositAmount").value + "€ deposited");
                                localStorage.setItem("transactionsHistory", JSON.stringify(testArray));

                                document.getElementById("transactions").innerHTML = "";
                                for(i in testArray){
                                    document.getElementById("transactions").innerHTML += testArray[i] + "<br>";
                                }

                                document.getElementById("currentBalance").innerHTML = localStorage.getItem("balance"); // update Current Balance
                                document.getElementById("depositAmount").value = ""; //clear field after transaction
                                console.log(testArray);
                            }
                        } 
                    }
                    //withdraw
                    if(e.submitter.id == "withdraw"){

                        if(document.getElementById("withdrawAmount").value != ""){
                            if(document.getElementById("withdrawAmount").value > 999999999){
                                document.getElementById("withdrawAmount").value = "";
                                document.getElementById("withdrawAmount").placeholder = "Withdraw a lower amount!"
                            }
                            if(Number(document.getElementById("currentBalance").innerHTML) - Number(document.getElementById("withdrawAmount").value) < 0){
                                document.getElementById("withdrawAmount").value = "";
                                document.getElementById("withdrawAmount").placeholder = "Not enough money!"
                            }
                            else{
                                document.getElementById("withdrawAmount").placeholder = "00.00€";
                                localStorage.setItem("balance",Number(document.getElementById("currentBalance").innerHTML) - Number(document.getElementById("withdrawAmount").value)); // add Amount to Current Balance)
                                var testArray = [];
                                if(localStorage.getItem("transactionsHistory") != null){
                                    testArray = (JSON.parse(localStorage.getItem("transactionsHistory")));
                                }
                                testArray.push(document.getElementById("withdrawAmount").value + "€ withdrawed");
                                localStorage.setItem("transactionsHistory", JSON.stringify(testArray));

                                document.getElementById("transactions").innerHTML = "";
                                for(i in testArray){
                                    document.getElementById("transactions").innerHTML += testArray[i] + "<br>";
                                }

                                document.getElementById("currentBalance").innerHTML = localStorage.getItem("balance"); // update Current Balance
                                document.getElementById("withdrawAmount").value = ""; //clear field after transaction
                                console.log(testArray);
                            }
                        }
                    }
                }
                //wrong pin
                else{
                    document.getElementById("pin").value = "";
                    document.getElementById("pin").placeholder = "Wrong PIN!"
                }
            })
        }
})




