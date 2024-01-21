const baseURL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg p")
console.log(dropdowns)

const obj={
    name:"abc",age:22
}


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode; 
        if(select.name==='from' && currCode==='USD'){
            newOption.selected=true;
        }else if(select.name==='to' && currCode==='INR'){
            newOption.selected=true;
        }

        select.appendChild(newOption)
    }

    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    })
}

const updateFlag=(element)=>{
   
    let currCode=element.value;
    
    let countrycode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}


btn.addEventListener("click",async (event)=>{
    event.preventDefault();
    let amount=document.querySelector(".amount input")
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1"
    }
   console.log(fromCurr.value)
    const url=`${baseURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response= await fetch(url);
    let data=await response.json();
    console.log(data)
    let rate=data[toCurr.value.toLowerCase()];
    console.log(rate)
    let finalamount=amtval*rate;
    msg.innerText=`${amtval} ${fromCurr.value} = ${finalamount} ${toCurr.value} `;
})