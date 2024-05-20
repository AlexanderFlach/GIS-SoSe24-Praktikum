var logoImage = document.querySelector("#imageLogo");
var bankCardImage = document.querySelector("#imageBankCard")
var twitterImage = document.querySelector("#imageTwitter")
var instagramImage = document.querySelector("#imageInstagram")


fetch("data.json")
    .then(response => response.json())

    .then(json => {
        console.log(json);

        // Images
        logoImage.src = json.image1;
        bankCardImage.src = json.image2;
        twitterImage.src = json.image3;
        instagramImage.src = json.image4;
})