import { getRecipes } from './recipes'
import moment from 'moment'
import { getFilters } from './filters'

const renderRecipes = () => {
  const recipes = getRecipes()
  const recipesContainer = document.querySelector('.recipes')
  recipesContainer.innerHTML = ''

  const { textFilter, selectedFilter } = getFilters()

  const filteredBytype = recipes.filter((recipe) => recipe.type === selectedFilter)
  const filteredrecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(textFilter.toLowerCase()))

  filteredrecipes.forEach((recipe) => {
    const newRecipe = generateRecipe(recipe)
    recipesContainer.appendChild(newRecipe)
  })
}

const generateRecipe = (recipe) => {
  const recipeContainer = document.createElement('a')

  const recipeImg = document.createElement('img')
  recipeImg.setAttribute('src', recipe.image)
  recipeImg.classList.add('recipes__image')
  recipeContainer.appendChild(recipeImg)

  const recipeTitle = document.createElement('h2')
  if (recipe.title.length > 0) {
    recipeTitle.textContent = recipe.title
  } else {
    recipeTitle.textContent = 'I do not have a name'
  }

  recipeTitle.classList.add('recipes__title')
  recipeContainer.appendChild(recipeTitle)

  const recipeTime = document.createElement('p')
  recipeTime.textContent = generateLastEdited(recipe.updatedAt)
  recipeTime.classList.add('recipes__time')
  recipeContainer.appendChild(recipeTime)

  recipeContainer.classList.add('recipes__container')
  recipeContainer.setAttribute('href', `/edit.html#${recipe.id}`)
  return recipeContainer
}

const generateLastEdited = (timestamp) => `Last edited: ${moment(timestamp).fromNow()}`

const generateTypeOptions = (dropdownContainer) => {
  const { typeFilter } = getFilters()
  typeFilter.forEach((type) => {
    const foodType = type.toLowerCase()
    const newOption = document.createElement('option')
    newOption.setAttribute('value', foodType)
    newOption.textContent = foodType
    dropdownContainer.appendChild(newOption)
  })
}

export { renderRecipes, generateLastEdited, generateTypeOptions }