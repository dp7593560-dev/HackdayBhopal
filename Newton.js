const ball = document.getElementById("ball");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const externalForceBtn = document.getElementById("externalForceBtn");
const message = document.getElementById("message");

const forceRange = document.getElementById("forceRange");
const forceValue = document.getElementById("forceValue");
const externalForceRange = document.getElementById("externalForceRange");
const externalForceValue = document.getElementById("externalForceValue");

let positionX = 0;
let speedX = 2;

let positionY = 80;
let speedY = 0;
const gravity = 0.5;
let isJumping = false;

let animationFrame;


forceRange.addEventListener("input", () => {
  forceValue.textContent = forceRange.value;
});
externalForceRange.addEventListener("input", () => {
  externalForceValue.textContent = externalForceRange.value;
});


function moveBall() {
  positionX += speedX;

  
  if (positionX >= 760) {
    cancelAnimationFrame(animationFrame);
    message.textContent = "Ball hit the wall!";
    return;
  }

  
  if (isJumping) {
    speedY += gravity;
    positionY += speedY;

    if (positionY >= 80) {
      positionY = 80;
      speedY = 0;
      isJumping = false;
    }
  }

  ball.style.left = positionX + "px";
  ball.style.top = positionY + "px";

  animationFrame = requestAnimationFrame(moveBall);
}


moveBall();


stopBtn.addEventListener("click", () => {
  if (!isJumping) {
    const jumpForce = parseFloat(forceRange.value);
    speedY = -jumpForce;
    isJumping = true;
    message.textContent = `You applied upward force = ${jumpForce} units!`;
  }
});


resetBtn.addEventListener("click", () => {
  cancelAnimationFrame(animationFrame);
  positionX = 0;
  positionY = 80;
  speedX = 2;
  speedY = 0;
  isJumping = false;
  ball.style.left = positionX + "px";
  ball.style.top = positionY + "px";
  message.textContent = "Simulation reset.";
  moveBall();
});


externalForceBtn.addEventListener("click", () => {
  const force = parseFloat(externalForceRange.value);
  speedX = Math.max(speedX - force, 0); 
  message.textContent = `External force applied = ${force} units! Horizontal speed = ${speedX}`;
});
