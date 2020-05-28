import { generateTypeOptions, generateLastEdited } from './view'
import { getRecipes } from './recipes'

const renderEditPage = (recipeId) => {
  const recipeTitle = document.querySelector('#recipe-title')
  const recipeTime = document.querySelector('#recipe-time')
  const recipeBody = document.querySelector('#recipe-body')
  const recipeImage = document.querySelector('#recipe-image')
  const recipeTypeContainer = document.querySelector('#recipe-type')
  const ingredientsList = document.querySelector('#ingredients-list')
  const recipes = getRecipes()
  const recipe = recipes.find((recipe) => recipe.id === recipeId)

  if (!recipe) {
    location.assign('/index.html')
  }

  generateTypeOptions(recipeTypeContainer)

  recipeTime.textContent = generateLastEdited(recipe.updatedAt)
  recipeTitle.value = recipe.title
  recipeBody.value = recipe.body
  recipeImage.src = recipe.image
  ingredientsList.innerHTML = ''
  recipe.ingredients.forEach((ingredient, index) => {
    const newListEl = document.createElement('li')
    const deleteElBtn = document.createElement('button')
    deleteElBtn.textContent = 'X'
    deleteElBtn.classList.add('ingredients__delete-item-btn')
    newListEl.textContent = ingredient
    newListEl.classList.add('ingredients__list-el')
    newListEl.setAttribute('data-element-index', `${index}`)
    newListEl.appendChild(deleteElBtn)
    ingredientsList.appendChild(newListEl)
  })
}

export { renderEditPage }