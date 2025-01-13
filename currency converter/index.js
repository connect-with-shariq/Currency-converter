

const BaseUrl = "https://api.freecurrencyapi.com/v1";

const dropdowns = document.querySelectorAll(".dropdown select")

const btn = document.querySelector("form button")

const massage = document.querySelector(".msg")

const fromccr = document.querySelector(".from select");
const tocrr = document.querySelector(".to select");


for (let select of dropdowns) {
    for (let currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        }
        else if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);

    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target)
    })
}

const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsourceLink = `https://flagsapi.com/${countrycode}/flat/64.png`

    let image = element.parentElement.querySelector("img")
    image.src = newsourceLink;



}


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();//stop default behavior of the button 
    let amount = document.querySelector(".amount input")
    let amval = amount.value

    if (amval === "" || amval < 1) {
        amval = 1;
        amount.value = "1";
    }


    

    const Url = `${BaseUrl}/latest?apikey=fca_live_tbKTcEdzGhfe3C7dnjt6fjwzlA6hN9ZFOMOkfEZH&currencies=${tocrr.value.toUpperCase()}&base_currency=${fromccr.value.toUpperCase()}`;
    try {
        let response = await fetch(Url);
        let data = await response.json();
        let datas = data.data
        let rate = datas[tocrr.value.toUpperCase()]

        let finalAmount = amval * rate;

        massage.innerText = `${amval} ${fromccr.value.toUpperCase()} = ${finalAmount} ${tocrr.value.toUpperCase()}`
    }
    catch(err){
        console.error('Error fetching data:',err)
    }

   

})








