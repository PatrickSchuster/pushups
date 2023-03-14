const instructionsEl = document.getElementById("instructions")

function skipInstructions() {
    const score = localStorage.getItem("score") ?? 0
    if (score > 0) {
        instructionsEl.style.visibility = "hidden"
    }
}

skipInstructions()