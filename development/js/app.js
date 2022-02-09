//name submit

const inputName = document.querySelector("#name");
const submiteName = document.querySelector(".hello__btn");
const profileName = document.querySelector(".app_profile-name");
const hello = document.querySelector(".hello");
const widget = document.querySelector(".widget");
const tableweekly = document.querySelector(".weeklyTable__container");


submiteName.addEventListener('click', event => {
    event.preventDefault();
    const userName = inputName.value;
    localStorage.setItem('saveName', userName);
    profileName.innerText = localStorage.saveName;
    hello.classList.add('hidden');
});

if (localStorage.saveName !== undefined) {
    profileName.innerText = localStorage.saveName;

    hello.classList.add('hidden');

    hello.classList.add("hidden");
    widget.classList.remove("hidden");
    tableweekly.classList.remove("hidden");
} else {
    widget.classList.add("hidden");
    tableweekly.classList.add("hidden");

}

//widget's removal
const removeButtons = document.querySelectorAll('.widget__remove');

removeButtons.forEach(function (el) {
    el.addEventListener('click', function (event) {
        deleteElement(el);
    });
});

function deleteElement(el) {
    let box = el.parentElement;
    box.parentElement.removeChild(box);
}