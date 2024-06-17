document.getElementById('search-button').addEventListener('click', searchRecipes);
document.getElementById('login-button').addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'block';
});
document.getElementById('signup-button').addEventListener('click', () => {
    document.getElementById('signup-form').style.display = 'block';
});
document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    // Handle login with backend
    alert(`Login with Email: ${email}, Password: ${password}`);
    document.getElementById('login-form').reset();
    document.getElementById('login-form').style.display = 'none';
});
document.getElementById('signup-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    // Handle sign up with backend
    alert(`Sign Up with Email: ${email}, Password: ${password}`);
    document.getElementById('signup-form').reset();
    document.getElementById('signup-form').style.display = 'none';
});

function toggleAuthForms() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
}

async function searchRecipes() {
    const query = document.getElementById('search-input').value;
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=YOUR_API_KEY`);
    const data = await response.json();
    displayRecipes(data.results);
}

function displayRecipes(recipes) {
    const resultsContainer = document.getElementById('recipe-results');
    resultsContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div>
                <h3>${recipe.title}</h3>
                <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
                <button onclick="addToFavorites({ id: ${recipe.id}, title: '${recipe.title}' })">Add to Favorites</button>
            </div>
        `;
        resultsContainer.appendChild(recipeCard);
    });
}

async function viewRecipe(id) {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=YOUR_API_KEY`);
    const recipe = await response.json();
    displayRecipeDetails(recipe);
}

function displayRecipeDetails(recipe) {
    const detailsContainer = document.getElementById('recipe-details');
    detailsContainer.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>Ingredients</h3>
        <ul>
            ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
        </ul>
        <h3>Instructions</h3>
        <p>${recipe.instructions}</p>
        <button onclick="addToShoppingList()">Add Ingredients to Shopping List</button>
    `;
}

function addToShoppingList() {
    const listContainer = document.getElementById('shopping-list-items');
    const ingredients = document.querySelectorAll('#recipe-details ul li');
    ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.className = 'shopping-list-item';
        listItem.innerHTML = `
            <span>${ingredient.innerText}</span>
            <button onclick="markAsBought(this)">Bought</button>
        `;
        listContainer.appendChild(listItem);
    });
}

function markAsBought(button) {
    button.parentElement.classList.toggle('bought');
}

function addToFavorites(recipe) {
    const favoritesList = document.getElementById('favorites-list');
    const favoriteItem = document.createElement('li');
    favoriteItem.className = 'favorite-item';
    favoriteItem.innerHTML = `
        <span>${recipe.title}</span>
        <button onclick="removeFromFavorites(this)">Remove</button>
    `;
    favoritesList.appendChild(favoriteItem);
}

function removeFromFavorites(button) {
    button.parentElement.remove();
}
