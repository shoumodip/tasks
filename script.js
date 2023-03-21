const tasks = document.getElementById("tasks")

function tasksSave() {
    localStorage.setItem("tasks", Array.from(tasks.children, function (v) {
        return (v.classList.contains("done") ? "#" : " ") + v.childNodes[0].nodeValue
    }).join("\n"))
}

function tasksPush(str) {
    if (str == "") {
        return null
    }

    const task = document.createElement("li")
    task.appendChild(document.createTextNode(str))
    task.addEventListener("click", function () {
        task.classList.toggle("done")
        tasksSave()
    })
    task.title = "Toggle whether task is done"
    tasks.appendChild(task)
    return task
}

document.getElementById("input").addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        tasksPush(this.value)
        this.value = ""
        tasksSave()
    }
})

document.getElementById("clear").addEventListener("click", function () {
    var removal = []
    tasks.childNodes.forEach(function (task) {
        if (task.classList.contains("done")) {
            removal.push(task)
        }
    })

    removal.forEach(function (task) {
        tasks.removeChild(task)
    })
    tasksSave()
})

document.body.style.cursor = "default"

localStorage.getItem("tasks").split("\n").forEach(function (task) {
    const done = task.charAt(0) == "#"
    task = task.substring(1)
    task = tasksPush(task)
    if (done) {
        task.classList.toggle("done")
    }
})
