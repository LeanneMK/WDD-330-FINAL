const form = document.querySelector("form");
const ul = document.querySelector("ul");
const button = document.querySelector("button");
const input = document.getElementById("item");
let itemsArray = localStorage.getItem("items") ?
    JSON.parse(localStorage.getItem("items")) : [];

//local storage values are always string type!
localStorage.setItem("items", JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem("items"));

const liMaker = text => {
    const li = document.createElement("li");
    const del = document.createElement("button");
    del.innerHTML = "Delete";
    del.setAttribute("style", "margin:10px;");

    del.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelectorAll("li").forEach(function (el) {
            //delete element
            if (el.getAttribute("key") === text) {
                el.parentNode.removeChild(el);
            }
        });

        //remove from localSt
        let temp = JSON.parse(localStorage.getItem("items"));
        temp.splice(temp.indexOf(text), 1);
        localStorage.setItem("items", JSON.stringify(temp));
    });

    li.textContent = text;
    li.setAttribute("key", text);
    li.appendChild(del);
    ul.appendChild(li);
};

form.addEventListener("submit", function (e) {
    e.preventDefault();

    itemsArray.push(input.value);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    liMaker(input.value);
    input.value = "";
});

data.forEach(item => {
    liMaker(item);
});

button.addEventListener("click", function () {
    localStorage.clear();
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
});

if ("serviceWorker" in navigator) {
    //window.addEventListener("load", () => {
    navigator.serviceWorker
        .register("src/todo-sw.js")
        .then(reg => console.log("Speak Kindness: " + reg.scope))
        .catch(() => console.log("Remember to be Kind"));
    //});
}