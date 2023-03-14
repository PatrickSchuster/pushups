const toggleBtn = document.getElementById("toggleBtn")
const count = document.getElementById("count")
const rectangle = document.getElementById("rectangle")
const prevBest = document.getElementById("previous-best")

// Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=42285">Pixabay</a>
const sound = new Audio("switch.mp3");
const PUSHUP_DURATION = 2000

let toggled = false
let preparationInterval
let pushupInterval

let counter = 0

prevBest.textContent = getCurrentScore()

document.body.addEventListener("mousemove", event => { 
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

function getCurrentScore() {
    return localStorage.getItem("score") ?? "0"
}

function stop() {
    toggleBtn.innerText = "START"
    clearInterval(preparationInterval)
    clearInterval(pushupInterval)
    storePushupScore()
}

function storePushupScore() {
    console.log("storePushupScore")
    if (counter > getCurrentScore()) {
        localStorage.setItem("score", counter-1)
    }
}

function start() {
    toggleBtn.innerText = "STOP"
    count.textContent = "0"
    counter = 1
    pushupInterval = setInterval(() => {
        sound.play()
        count.textContent = counter
        counter++
    }, PUSHUP_DURATION)
}

function highLightIfProgressing() {
    if (counter > getCurrentScore()) {
        return " 🦍"
    }
    return ""
}