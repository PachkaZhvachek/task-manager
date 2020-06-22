const getFilterMarkup = (filter, isChecked) => {
  const { name, count } = filter;
  return (
    `
    <input
    type="radio"
    id="filter__${name}"
    class="filter__input visually-hidden"
    name="filter"
    ${isChecked ? `checked` : ``}
  />
  <label for="filter__${name}" class="filter__label">
    ${name} <span class="filter__${name}-count">${count}</span></label
  >`
  )
}

const getFilterTemplate = (filters) => {
  return filters.map((item, i) => getFilterMarkup(item, i === 0)).join('\n')
}

export default getFilterTemplate;