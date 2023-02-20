const toggleBtn = document.getElementById("toggleBtn")
const count = document.getElementById("count")
const rectangle = document.getElementById("rectangle")
const achievementText = document.getElementById("achievement-text")
const countDownText = document.getElementById("count-down")

// Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=42285">Pixabay</a>
const sound = new Audio("switch.mp3");
const PREPARE_DURATION = 3000
const PUSHUP_DURATION = 2000

let toggled = false
let preparationInterval
let pushupInterval

let countDown = 3
let counter = 0

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
    toggled === true ? startCountDown() : stop()
}

function stop() {
    toggleBtn.innerText = "START"
    clearInterval(preparationInterval)
    clearInterval(pushupInterval)
    achievementText.style.visibility = "visible"
    console.log("counter = ", counter)
    if (counter <= 1) {
        achievementText.style.visibility = "hidden"
    } else {
        achievementText.innerText = "You achieved"
    }
    countDown = 3
    countDownText.textContent = countDown
    countDownText.style.visibility = "hidden"
}

function startCountDown() {
    toggleBtn.innerText = "STOP"
    count.style.visibility = "hidden"
    achievementText.style.visibility = "hidden"
    counter = 0
    count.innerText = counter
    countDownText.style.visibility = "visible"
    preparationInterval = setInterval(() => {
        countDownText.textContent = countDown
        if (countDown === 0) {
            clearInterval(preparationInterval)
            startPushupsCounter()
        }
        countDown--
    }, 1000)
}

function startPushupsCounter() {
    countDownText.style.visibility = "hidden"
    count.style.visibility = "visible"
    counter = 1
    pushupInterval = setInterval(() => {
        sound.play()
        count.textContent = counter  
        counter++
    }, PUSHUP_DURATION)
}