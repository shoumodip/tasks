const tasks = document.getElementById("tasks")
const input = document.getElementById("input")
const inputAdd = document.getElementById("input-add")

function tasksSave() {
    localStorage["tasks"] = Array.from(tasks.children, (task) => task.children[0].value).join("\n")
}

function tasksPush(value) {
    if (value === "") {
        return
    }

    const div = document.createElement("div")
    const input = document.createElement("input")
    const button = document.createElement("button")

    input.value = value
    input.onchange = tasksSave

    button.innerText = "Done"
    button.onclick = () => {
        tasks.removeChild(div)
        tasksSave()
    }

    div.appendChild(input)
    div.appendChild(button)
    tasks.appendChild(div)
}

input.onkeyup = (event) => {
    if (event.key == "Enter") {
        tasksPush(input.value)
        tasksSave()
        input.value = ""
    }
}

inputAdd.onclick = () => {
    if (input.value !== "") {
        tasksPush(input.value)
        tasksSave()
        input.value = ""
    }
}

(localStorage["tasks"] || "").split("\n").forEach(tasksPush)
