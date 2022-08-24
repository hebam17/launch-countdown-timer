const card = document.getElementsByClassName("card");
const daysCard = document.getElementById("days");
const hoursCard = document.getElementById("hours");
const minutesCard = document.getElementById("minutes");
const secCard = document.getElementById("sec");

let days = 08;
let hours = 23;
let minutes = 55;
let seconds = 41;
const countDown = () => {
  if (days !== 00) {
    if (hours === 00) {
      days -= 1;
      hours = 23;
      minutes = 59;
      seconds = 59;
    } else if (hours !== 00) {
      if (minutes === 00) {
        hours -= 1;
        minutes = 59;
        seconds = 59;
      } else if (minutes !== 00) {
        if (seconds === 00) {
          minutes -= 1;
          seconds = 59;
        } else if (seconds !== 00) {
          seconds -= 1;
        }
      }
    }
  }
};

// ADD LEADING ZERO TO THE NUMBER
const leadZero = (num) => {
  return num.toString().length === 1 ? `0${num.toString()}` : num.toString();
};

// FLIP CARD FUNCTIONALITY
// THIS FUNCTION IS FROM (web dev simplified) channel
const flipCard = (cardToFlip, newValue) => {
  // GET THE MAIN TOP AND BOTTOM CARD ELEMENTS
  const cardUpBack = cardToFlip.querySelector(".card-up-back");
  const cardDownBack = cardToFlip.querySelector(".card-down-back");
  //  GET THE OLD VALUE TO COMPARE
  let oldValue = parseInt(cardUpBack.textContent);
  if (parseInt(oldValue) === newValue) return;
  // CREATE THE TOP AND BOTTOM FLIP CARD ELEMENTS
  const cardUpFront = document.createElement("div");
  cardUpFront.classList.add("card-up-front");
  const cardDownFront = document.createElement("div");
  cardDownFront.classList.add("card-down-front");
  // initial value when start

  cardUpFront.textContent = leadZero(oldValue);
  cardDownFront.textContent = leadZero(newValue);

  cardUpFront.addEventListener("animationstart", (e) => {
    cardUpBack.textContent = leadZero(newValue);
  });
  cardUpFront.addEventListener("animationend", (e) => {
    cardUpFront.remove();
  });
  cardDownFront.addEventListener("animationend", (e) => {
    cardDownBack.textContent = leadZero(newValue);
    cardDownFront.remove();
  });

  cardToFlip.append(cardUpFront, cardDownFront);
};

// FLIP CARDS FUNCTION

const flipCards = () => {
  flipCard(daysCard, days);
  flipCard(hoursCard, hours);
  flipCard(minutesCard, minutes);
  flipCard(secCard, seconds);
};

// SET INTERVAL
setInterval(() => {
  countDown();
  flipCards();
}, 1000);
