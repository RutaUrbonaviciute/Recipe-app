const filters = {
  textFilter: '',
  typeFilter: ['pasta', 'chicken', 'desert', 'potatoes'],
  selectedFilter: ''
}

const getFilters = () => {
  return filters
}

const setFilters = (updates) => {
  if (typeof updates.textFilter === 'string') {
    filters.textFilter = updates.textFilter
  }
  if (typeof updates.typeFilter === 'array') {
    filters.typeFilter = [...updates.typeFilter]
  }
  if (typeof updates.selectedFilter === 'string') {
    filters.selectedFilter = updates.selectedFilter
  }
}



export { getFilters, setFilters }