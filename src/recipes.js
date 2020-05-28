import moment from 'moment'
import uuidv4 from 'uuid/v4'

let recipes = []

const loadRecipes = () => {
  const recipesJSON = localStorage.getItem('recipes')

  try {
    return recipesJSON ? JSON.parse(recipesJSON) : []
  } catch (e) {
    return []
  }
}

const saveRecipes = () => {
  localStorage.setItem('recipes', JSON.stringify(recipes))
}

const getRecipes = () => {
  return recipes
}

const createRecipe = () => {
  const id = uuidv4()
  const timestamp = moment().valueOf()

  recipes.push({
    id,
    image: './images/default.svg',
    title: '',
    body: '',
    type: '',
    ingredients: [],
    createdAt: timestamp,
    updatedAt: timestamp
  })

  saveRecipes()
  return id
}

const removeRecipe = (id) => {
  const recipeId = recipes.findIndex((recipe) => recipe.id === id)

  if (recipeId > -1) {
    recipes.splice(recipeId, 1)
    saveRecipes()
  }
}

const updateRecipe = (id, updates) => {
  const recipe = recipes.find((recipe) => recipe.id === id)

  if (!recipe) {
    return
  }
  if (typeof updates.title === 'string') {
    recipe.title = updates.title
    recipe.updatedAt = moment().valueOf()
  }
  if (typeof updates.body === 'string') {
    recipe.body = updates.body
    recipe.updatedAt = moment().valueOf()
  }
  if (typeof updates.image === 'string') {
    recipe.image = updates.image
    recipe.updatedAt = moment().valueOf()
  }
  if (typeof updates.type === 'string') {
    recipe.type = updates.type
    recipe.updatedAt = moment().valueOf()
  }
  if (typeof updates.ingredients === 'string') {
    recipe.ingredients.push(updates.ingredients)
    console.log(recipe.ingredients);

    recipe.updatedAt = moment().valueOf()
  }

  saveRecipes()
  return recipe
}

recipes = loadRecipes()

export { getRecipes, createRecipe, removeRecipe, updateRecipe, saveRecipes }