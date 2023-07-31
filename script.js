const { event } = require("jquery");

let h=document.querySelector("#h1");
btn=document.querySelector(".btn")

btn.addEventListener('click',event=>{
    h.classList.add(".hello");
})