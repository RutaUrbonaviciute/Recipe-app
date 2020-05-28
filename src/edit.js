import './styles/main.css'
import './styles/main.scss'
import { generateLastEdited } from './view'
import { renderEditPage } from './view-edit'
import { updateRecipe, removeRecipe } from './recipes'
import { removeIngredient } from './ingredients'

const recipeTitle = document.querySelector('#recipe-title')
const recipeTime = document.querySelector('#recipe-time')
const recipeBody = document.querySelector('#recipe-body')
const recipeImage = document.querySelector('#recipe-image-upload')
const deleteButton = document.querySelector('#delete-recipe')
const recipeType = document.querySelector('#recipe-type')
const ingredientsButton = document.querySelector('#add-ingredient')
const newIngredient = document.querySelector('#new-ingredient')
const recipeId = location.hash.substring(1)

renderEditPage(recipeId)

recipeTitle.addEventListener('input', (e) => {
  const recipe = updateRecipe(recipeId, {
    title: e.target.value
  })

  recipeTime.innerHTML = generateLastEdited(recipe.updatedAt)
})

recipeBody.addEventListener('input', (e) => {
  const recipe = updateRecipe(recipeId, {
    body: e.target.value
  })

  recipeTime.innerHTML = generateLastEdited(recipe.updatedAt)
})


recipeImage.addEventListener('change', function (e) {
  const uploadedFile = e.target || window.event.srcElement;
  const files = uploadedFile.files;

  // FileReader support
  if (FileReader && files && files.length) {
    var fr = new FileReader();
    fr.onload = function () {
      document.querySelector('#recipe-image').src = fr.result;
      const recipe = updateRecipe(recipeId, {
        image: fr.result
      })
      recipeTime.innerHTML = generateLastEdited(recipe.updatedAt)
    }
    fr.readAsDataURL(files[0]);

  }

  // Not supported
  else {
    // fallback -- perhaps submit the input to an iframe and temporarily store
    // them on the server until the user's session ends.
  }

})

deleteButton.addEventListener('click', () => {
  location.assign('/index.html')
  removeRecipe(recipeId)
})

recipeType.addEventListener('change', (e) => {
  updateRecipe(recipeId, {
    type: e.target.value
  })
})

// ingredientsButton.addEventListener('click', () => {
//   updateRecipe(recipeId, {
//     ingredients: newIngredient.value
//   })
//   newIngredient.value = ''
// })

document.querySelector('#ingredient-form').addEventListener('submit', (e) => {
  e.preventDefault()
  const text = e.target.elements.newIngredient.value.trim()
  updateRecipe(recipeId, {
    ingredients: text
  })
  renderEditPage(recipeId)
  e.target.elements.newIngredient.value = ''
})

document.querySelector('#ingredients-list').addEventListener('click', (e) => {
  if (e.target.innerText === 'X') {
    const ingredientId = e.target.parentNode.getAttribute('data-element-index')
    removeIngredient(recipeId, ingredientId)
  }
})






