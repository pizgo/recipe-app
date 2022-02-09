/// DODAWANIE NOWEGO ELEMENTU DO LISTY INSTRUKCJI
let isEditingInstruction = false;
let editedInstructionLi = null;
const instructionText = document.getElementById("recipe-instruction");
const addInstrButton = document.getElementById("add_instruction");
const instructionList = document.getElementById("instruction_list");
const errorMessageInst = document.getElementById("error-message-inst");
const mainApp = document.querySelector(".recipes-list_container");
const recipesAdd = document.querySelector(".recipes_container");

addInstrButton.addEventListener("click", (event) => {
    //VALIDATE
    if (instructionText.value.length > 150) {
        errorMessageInst.innerText = "Tekst instrukcji nie może mieć więcej niż 150 znaków i musi być dłuższy niż 0";
        errorMessageInst.style.display = "block";

    } else if (instructionText.value.length === 0) {
        errorMessageInst.innerText = "Pole nie może być puste";
        errorMessageInst.style.display = "block";
    } else if (isEditingInstruction == true) {
        updateExistingLiInstruction()
    } else {
        createNewLiInstruction()
    }
});

function createNewLiInstruction() {
    errorMessageInst.style.display = "none";

    //NOWY ELEMENT LISTY
    const liInst = document.createElement("li");
    liInst.innerText = instructionText.value;
    liInst.classList.add("recipes_instruction-li");
    instructionList.appendChild(liInst);


    //PRZYCISK EDYCJI i JEGO EVENTLISTENER
    const buttonInstructionEdit = document.createElement("span");
    buttonInstructionEdit.classList.add("far", "fa-edit", "inst-edit");
    liInst.appendChild(buttonInstructionEdit);
    buttonInstructionEdit.addEventListener("click", (event) => {
        onEditInstructionClicked(buttonInstructionEdit)
    })

    //PRZYCIK USUWANIA I JEGO EVENTLISTENER
    const buttonInstructionRemove = document.createElement("span");
    buttonInstructionRemove.classList.add("fas", "fa-trash-alt", "inst-remove");
    liInst.appendChild(buttonInstructionRemove);
    buttonInstructionRemove.addEventListener("click", (event) => {
        onRemoveClicked(buttonInstructionRemove);
    })

    //WYZEROWANIE TEXTAREA
    clearTextarea(instructionText);
}


//EDYCJA ELEMENTÓW INSTRUCTIONs
function onEditInstructionClicked(btnEdit) {

    isEditingInstruction = true;
    let btnParent = btnEdit.parentElement;
    editedInstructionLi = btnParent;
    instructionText.value = btnParent.innerText;
}

//AKTUALIZACJA ELEMENTÓW INSTRUCTIONS
function updateExistingLiInstruction() {

    let textToUpdate = instructionText.value;
    editedInstructionLi.childNodes[0].nodeValue = textToUpdate;
    clearTextarea(instructionText);
    isEditingInstruction = false;
}

//DODAWANIE NOWEGO ELEMENTU DO LISTY SKŁADNIKÓW

let isEditingIngredients = false;
let editedIngredientsLi = null;
const ingredientText = document.getElementById("recipe-ingredients");
const addIngredientButton = document.getElementById("add_ingredient");
const ingredientList = document.getElementById("ingredients_list");
const errorMessageIng = document.getElementById("error-message-ing");

addIngredientButton.addEventListener("click", (event) => {
    //VALIDATE
    if (ingredientText.value.length > 50) {
        errorMessageIng.innerText = "Nazwa składniku nie może być dłuższa niż 50 znaków";
        errorMessageIng.style.display = "block";
    } else if (ingredientText.value.length === 0) {
        errorMessageIng.innerText = "Pole nie może być puste";
        errorMessageIng.style.display = "block";
    } else if (isEditingIngredients == true) {
        updateExistingLiIngredient()
    } else {
        createNewLiIngredient()
    }
});

function createNewLiIngredient() {

    errorMessageIng.style.display = "none";

    const liIngredient = document.createElement("li");
    liIngredient.innerText = ingredientText.value;
    // liIngredient.setAttribute("id", index);
    liIngredient.classList.add("recipes_ingredients-li");
    ingredientList.appendChild(liIngredient);

    const buttonIgredientEdit = document.createElement("span");
    buttonIgredientEdit.classList.add("far", "fa-edit", "ing-edit");
    liIngredient.appendChild(buttonIgredientEdit);
    buttonIgredientEdit.addEventListener("click", (event) => {
        onEditIngredientClicked(buttonIgredientEdit);
    });

    const buttonIngredientRemove = document.createElement("span");
    buttonIngredientRemove.classList.add("fas", "fa-trash-alt", "ing-remove");
    liIngredient.appendChild(buttonIngredientRemove);
    buttonIngredientRemove.addEventListener("click", (event) => {
        onRemoveClicked(buttonIngredientRemove);
    });

    clearTextarea(ingredientText);
};


//EDYCJA ELEMENTÓW INGREDIENTS
function onEditIngredientClicked(btnEdit) {

    isEditingIngredients = true;
    let btnParent = btnEdit.parentElement;
    editedIngredientsLi = btnParent;
    ingredientText.value = btnParent.innerText;
};

//AKTUALIZACJA ELEMENTÓW INGREDIENTS
function updateExistingLiIngredient() {

    let textToUpdate = ingredientText.value;
    editedIngredientsLi.childNodes[0].nodeValue = textToUpdate;
    clearTextarea(ingredientText);
    isEditingIngredients = false;
};

//USUWANIE ELEMENTÓW Z LISTY

function onRemoveClicked(btnEdit) {

    let btnParent = btnEdit.parentElement;
    btnParent.parentElement.removeChild(btnParent);
};


//ZAPISYWANIE PRZEPISU I TWORZENIE TABLICY ZE WSZYSTKIMI PRZEPISAMI

const saveButton = document.getElementById("save-recipe");
const recipeName = document.getElementById("recipe-name");
const recipeDescription = document.getElementById("recipe-description");
const errorMessage = document.getElementById("error-message-recipe");
const RecipesKey = "RecipesKey";

function Recipe(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.instructions = [];
    this.ingredients = [];
};

saveButton.addEventListener("click", (event) => {

    //VALIDATE:
    if (recipeName.value.length > 50 || recipeName.value.length === 0) {
        errorMessage.innerText = "Nazwa przepisu nie może być pusta i musi mieć max. 50 znaków";
        errorMessage.style.display = "block";
    } else if (recipeDescription.value.length > 360 || recipeDescription.value.length === 0) {
        errorMessage.innerText = "Opis przepisu nie może być pusty i musi mieć mex. 360 znaków";
        errorMessageIng.style.display = "block";
    } else {
        onSaveClicked();
    }
});

function onSaveClicked() {

    errorMessage.style.display = "none";

    //TWORZĘ NOWY OBIEKT RECIPE
    const newRecipe = createNewRecipeObject();

    //ZAPISUJE OBIEKT DO LOCAL STORAGE
    saveToLocalStorage(newRecipe)

    mainApp.classList.toggle("hidden");
    recipesAdd.classList.toggle("hidden");
    window.location.reload();
};

//TWORZĘ NOWY OBIEKT RECIPE
function createNewRecipeObject() {

    let allRecipes = getRecipesFromLocalStorage();

    //TWORZĘ NOWY OBIEKT RECIPE
    let newRecipe = new Recipe(allRecipes.length + 1, recipeName.value,
        recipeDescription.value);

    //DODAJĘ TABLICĘ Z INSTRUKCJAMI
    let instructionChildren = instructionList.children;
    for (let i = 0; i < instructionChildren.length; i++) {
        let liItem = instructionChildren[i];
        let instructionText = liItem.childNodes[0].nodeValue;
        newRecipe.instructions.push(instructionText);
    }

    //DODAJĘ TABLICE ZE SKŁADNIKAMI:
    let ingredientChildren = ingredientList.children;
    for (let i = 0; i < ingredientChildren.length; i++) {
        let liItem = ingredientChildren[i];
        let ingredientText = liItem.childNodes[0].nodeValue;
        newRecipe.ingredients.push(ingredientText);
    }

    return newRecipe;
}

//ZAPISUJE OBIEKT DO LOCAL STORAGE
function saveToLocalStorage(newRecipe) {

    //SCIAGAM LISTE ISTNIEJACYCH PRZEPPISOW Z LOCAL STORAGE
    let allRecipes = getRecipesFromLocalStorage()

    //DODAJE NOWY PRZEPIS DO TABLICY ISTNIEJACYCH PRZEPISOW
    allRecipes.push(newRecipe)

    //ZAPISUJE ZAKTUALIZAOWANA LISTE DO LOCAL STORAGE
    localStorage.setItem(RecipesKey, JSON.stringify(allRecipes));

    //TEST - MOŻNA POTEM WYRZUCIC
    console.log("dane zapisane:")
    console.log(getRecipesFromLocalStorage())
}

//SCIAGAM LISTE ISTNIEJACYCH PRZEPPISOW Z LOCAL STORAGE
function getRecipesFromLocalStorage() {

    let allRecipesString = localStorage.getItem(RecipesKey);

    let allRecipes = JSON.parse(allRecipesString)

    if (allRecipes == null) {
        return []
    } else {
        return allRecipes
    }
}

//FUNKCJA DO CZYSZCZENIA TEXTAREA
function clearTextarea(element) {
    element.value = "";
}

//
const profileName = document.querySelector(".app_profile-name");

if (localStorage.saveName !== undefined) {
    profileName.innerText = localStorage.saveName;
}

//
const listBodyBox = document.querySelector(".recipes-list-body_box")
const listRecipes = JSON.parse(localStorage.getItem(RecipesKey));
console.log(listRecipes);
if (listRecipes !== null) {
    listRecipes.forEach(function (el, index) {
        const listBodyRow = document.createElement("div");
        listBodyRow.innerHTML = `<div class="recipes-list_id">${index + 1}</div><div class="recipes-list_name">${el.title}</div><div class="recipes-list_description">${el.description}</div><div class="recipes-list_action"><span class="fas fa-edit ing-edit recipe-edit"></span><span class="fas fa-trash-alt ing-remove recipe-remove"></span></div>`
        listBodyRow.classList.add("recipes-list-body-box_row");
        return listBodyBox.appendChild(listBodyRow);
    })
}

//
const addRecipeBtn = document.querySelector("#add_recipe");

addRecipeBtn.addEventListener("click", function () {
    mainApp.classList.toggle("hidden");
    recipesAdd.classList.toggle("hidden");
})

const recipeDeleteBtn = document.querySelectorAll(".recipe-remove")
console.log(recipeDeleteBtn);
recipeDeleteBtn.forEach(function (el, index) {
    el.addEventListener("click", () => {
        let grandpa = el.parentElement.parentElement;
        console.log(grandpa);
        grandpa.parentElement.removeChild(grandpa);
        const recipeslist = JSON.parse(localStorage.getItem(RecipesKey));
        recipeslist.splice(index, 1);
        localStorage.setItem(RecipesKey, JSON.stringify(recipeslist));
        window.location.reload();
    })
})
