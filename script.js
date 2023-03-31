const tasks = document.getElementById("tasks")

function tasksSave() {
    localStorage["tasks"] = Array.from(tasks.children, (e) => e.childNodes[0].value).join("\n")
}

function tasksPush(str) {
    if (str == "") {
        return null
    }
    const task = document.createElement("div")

    const text = document.createElement("input")
    text.value = str
    text.classList = "readonly"
    task.appendChild(text)

    const done = document.createElement("button")
    done.innerText = "Done"
    done.addEventListener("click", () => {
        tasks.removeChild(task)
        tasksSave()
    })
    task.appendChild(done)

    tasks.appendChild(task)
    return task
}

document.getElementById("input").addEventListener("keyup", (event) => {
    if (event.keyCode == 13) {
        tasksPush(event.target.value)
        event.target.value = ""
        tasksSave()
    }
})

String.prototype.split.call(localStorage["tasks"], "\n").forEach(tasksPush)
