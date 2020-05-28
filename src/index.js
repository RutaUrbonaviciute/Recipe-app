import './styles/main.css'
import './styles/main.scss'
import { createRecipe } from './recipes'
import { renderRecipes, generateTypeOptions } from './view'
import { setFilters, getFilters } from './filters'

// generateTypeOptions(document.querySelector('#recipe-type'))
renderRecipes()

document.querySelector('#create-recipe').addEventListener('click', () => {
  const id = createRecipe()
  location.assign(`edit.html#${id}`)
})

document.querySelector('#text-filter').addEventListener('input', (e) => {
  setFilters({
    textFilter: e.target.value
  })

  renderRecipes()
})

// document.querySelector('#recipe-type').addEventListener('change', (e) => {
//   setFilters({
//     selectedFilter: e.target.value
//   })
//   console.log(getFilters());

//   renderrecipes()
// })


