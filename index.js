const toggleBtn = document.getElementById("toggleBtn")
const count = document.getElementById("count")
const rectangle = document.getElementById("rectangle")
const achievementText = document.getElementById("achievement-text")

const beep = new Audio("beep.mp3");
const PREPARE_DURATION = 3000
const PUSHUP_DURATION = 2000

let toggled = false
let preparationInterval
let pushupInterval

document.body.addEventListener("mousemove", (event) => { 
  const { clientX, clientY } = event
  rectangle.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 0, fill: "forwards" });
})

document.body.addEventListener("keydown", event => {
    if (event.key === " ") {
        event.preventDefault()
        toggle()
    }
})
toggleBtn.addEventListener("click", () => toggle())

function toggle() {
    toggled = !toggled
    toggled === true ? start() : stop()
}

function stop() {
    toggleBtn.innerText = "START"
    clearInterval(preparationInterval)
    clearInterval(pushupInterval)
    achievementText.style.visibility = "visible"
    achievementText.textContent = "You achieved"
}

function start() {
    toggleBtn.innerText = "STOP"
    let countDown = 3;
    count.style.visibility = "visible"
    preparationInterval = setInterval(() => {
        count.textContent = countDown--
        if (countDown < 0) {
            count.textContent = "GO"
            startPushupsCounter()
            clearInterval(preparationInterval)
        }
    }, 1000)
}

function startPushupsCounter() {
    let counter = 0
    pushupInterval = setInterval(() => {
        beep.play()
        console.log("beep")
        counter++
        count.textContent = counter  
    }, PUSHUP_DURATION)
}