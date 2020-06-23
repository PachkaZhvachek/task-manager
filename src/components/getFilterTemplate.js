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

export const getFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((item, i) => getFilterMarkup(item, i === 0)).join('\n')

  return `<section class="main__filter filter container">
        ${filtersMarkup}
        </section>`
}

export default getFilterTemplate;