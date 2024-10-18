const Base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropbox = document.querySelectorAll(".dropbox select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".output");




for (let select of dropbox) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    })
}

const updateExchamgeRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtvalue = amount.value;
    if (amtvalue === "" || amtvalue < 1) {
        amtvalue = 1;
        amount.value = "1";
    }
    // console.log(fromCurr.value , toCurr.value);
    const URL = fetch(`${Base_url}/${fromCurr.value.toLowerCase()}.json`)
    let response = await (URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmt = (amtvalue*rate).toFixed(2);
    msg.innerText = `${amtvalue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
}


const updateflag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click",  (evt) => {
    evt.preventDefault();
    updateExchamgeRate();
    
});


window.addEventListener("load",()=>{
    updateExchamgeRate();
})




// json = fetchJSON(`/currencies/{fromCurrency}/{toCurrency}`)
// rate = json[toCurrency]

// json = fetchJSON(`/currencies/{fromCurrency}`)
// rate = json[fromCurrency][toCurrency]