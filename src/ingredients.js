import { getRecipes, saveRecipes } from './recipes'
import { renderEditPage } from './view-edit'

const removeIngredient = (recipeId, ingredientIndex) => {
  const recipes = getRecipes()
  const recipe = recipes.find((recipe) => recipe.id === recipeId)
  if (recipe != false) {
    recipe.ingredients.splice(ingredientIndex, 1)
    saveRecipes()
    renderEditPage(recipeId)
  }
}

export { removeIngredient }