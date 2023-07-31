// const { event } = require("jquery");

$('.portfolio').slick({
dots: true,
infinite: true,
speed: 300,
slidesToShow: 4,
slidesToScroll: 2,
centerMode:true,
autoplay: true,
responsive: [
{
breakpoint: 1024,
settings: {
slidesToShow: 2,
slidesToScroll: 2,
infinite: true,
dots: true
}
},
{
breakpoint: 600,
settings: {
slidesToShow: 2,
slidesToScroll:2
}
},
{
breakpoint: 480,
settings: {
slidesToShow: 1,
slidesToScroll: 1
}
}

]
});



// for the timetable

const jiuJitsu=document.querySelector("#jiu-jitsu");
const karate=document.querySelector("#karate");
const kids=document.querySelector("#kids");
const judo=document.querySelector("#judo");
const mauythai=document.querySelector("#mauythai");

//tables selector

function showTable(table) {
  const tables = document.querySelectorAll('table');
  const buttons = document.querySelectorAll('button');

  tables.forEach(element => {
      if (element.id === table) {
          element.classList.remove("d-none");
          element.classList.add("d-block");
      } else {
          element.classList.remove("d-block");
          element.classList.add("d-none");
      }
  });


}

//thank you message

const registrationForm=document.querySelector("#registrationForm");
const thankYouMessage=document.querySelector("#thankYouMessage");

registrationForm.addEventListener('submit',event=>{
 event.preventDefault();
 registrationForm.style.display = "none";
 thankYouMessage.style.display = "block";
})

