const recipes = JSON.parse(localStorage.getItem('RecipesKey')); // Dlaczego nie 'recipes' ???

// Dodawanie przepisów do select-ów
const allSelects = document.querySelectorAll('select');

allSelects.forEach(select => {
  recipes.forEach(recipe => {
    const recipeOption = document.createElement('option');
    recipeOption.innerText = recipe.title;

    select.appendChild(recipeOption);
  })
});

// Obsługa dodawania nowego planu

function Schedule(id, weekNumber, title, description) {
  this.id = id; // id przepisu
  this.title = title; // nazwa planu
  this.description = description; // opis planu
  this.weekNumber = weekNumber; // numer tygodnia do którego przypisany jest plan
  this.monday = []; // plan na poniedzialek
  this.tuesday = []; // plan na wtorek
  this.wednesday = []; // plan na środę
  this.thursday = []; // plan na czwartek
  this.friday = []; // plan na piątek
  this.saturday = []; // plan na sobotę
  this.sunday = []; // plan na niedzielę
}
/*
 Metoda `.showInfo()`
 wyświetlająca w konsoli informacje o planie */
Schedule.prototype.showInfo = function () {
  console.warn("ID: ", this.id, "TYTUŁ: ", this.title); // wyświetl id oraz tytuł
  console.warn("OPIS: ", this.description); // wyświetl opis

  console.warn("Poniedziałek:");
  this.monday.forEach(function (elem, i) {
    console.warn(i, elem); // wyświetl każdy poskiłek z poniedziałku
  })
}

/*
Metoda `.saveToLocalStorage()`
zapisująca do localStorage informacje o przepisie */
Schedule.prototype.saveToLocalStorage = function (plan) {
  if (localStorage.getItem('schedules')) {
    const existingSchedules = JSON.parse(localStorage.getItem('schedules'));
    existingSchedules.push(plan);

    localStorage.setItem('schedules', JSON.stringify(existingSchedules));
  } else {
    const existingSchedules = [];
    existingSchedules.push(plan);

    localStorage.setItem('schedules', JSON.stringify(existingSchedules));
  }
}

// przygotowanie globalnej zmiennej przechowującej wszystkie plany
let allPlanns = [];

if (localStorage.getItem('schedules')) {
  allPlanns = JSON.parse(localStorage.getItem('schedules'));
};

document.querySelector('.newPlan__btn').addEventListener('click', () => {

  const planTitle = document.querySelector('#addPlan').value;
  const planDesc = document.querySelector('#addDescription').value;
  const weekNumber = parseInt(document.querySelector('#weekNumber').value);

  if (planTitle.length > 50) {
    alert('tytuł nie może mieć więcej niż 50 znaków')
  } else if (planDesc.length > 350) {
    alert("opis nie może zawierać więcej niż 360 znaków")
  } else if (weekNumber > 52 || weekNumber < 0 || typeof weekNumber === "string") {
    alert("numer tygodnia musi być liczbą z przedziału 1 - 52")
  } else {// utworzenie przykładowego obiektu planu
    var newPlan = new Schedule(allPlanns.length + 1, weekNumber, planTitle, planDesc);

    // Poniedzialek
    const mondaySelects = document.querySelectorAll('.monday');
    newPlan.monday = [];
    mondaySelects.forEach(monday => {
      newPlan.monday.push(monday.value);
    });

    // Wtorek
    const tuesdaySelects = document.querySelectorAll('.tuesday');
    newPlan.tuesday = [];
    tuesdaySelects.forEach(tuesday => {
      newPlan.tuesday.push(tuesday.value);
    });

    // Sroda 
    const wednesdaySelects = document.querySelectorAll('.wednesday');
    newPlan.wednesday = [];
    wednesdaySelects.forEach(wednesday => {
      newPlan.wednesday.push(wednesday.value);
    });

    // Czwartek

    const thursdaySelects = document.querySelectorAll('.thursday');
    newPlan.thursday = [];
    thursdaySelects.forEach(thursday => {
      newPlan.thursday.push(thursday.value);
    });

    //Piątek
    const fridaySelects = document.querySelectorAll('.friday');
    newPlan.friday = [];
    fridaySelects.forEach(friday => {
      newPlan.friday.push(friday.value);
    });

    //Sobota
    const saturdaySelects = document.querySelectorAll('.saturday');
    newPlan.saturday = [];
    saturdaySelects.forEach(saturday => {
      newPlan.saturday.push(saturday.value);
    });

    //Niedziela

    const sundaySelects = document.querySelectorAll('.sunday');
    newPlan.sunday = [];
    sundaySelects.forEach(sunday => {
      newPlan.sunday.push(sunday.value);
    });

    newPlan.saveToLocalStorage(newPlan);
    newPlan.showInfo();

    allPlanns.push(newPlan);

    const newPlanSection = document.querySelector('.newPlan')
    newPlanSection.classList.add("hidden")
  }
});

const schedulenew = document.querySelector(".recipes_container");
const addschedulebtn = document.querySelector("#add_schedules");
const schedulelist = document.querySelector(".schedules_container");

addschedulebtn.addEventListener("click", function () {
  schedulenew.classList.remove("hidden");
  schedulelist.classList.add("hidden");
});

const newPlanBtn = document.querySelector(".newPlan__btn");
newPlanBtn.addEventListener("click", function () {
  schedulenew.classList.add("hidden");
  schedulelist.classList.remove("hidden");
});

const profileName = document.querySelector(".app_profile-name");

if (localStorage.saveName !== undefined) {
  profileName.innerText = localStorage.saveName;
};