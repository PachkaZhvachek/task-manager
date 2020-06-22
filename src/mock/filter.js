const filters = ['all', 'overdue', 'today', 'favorites', 'repeating', 'archive'];

const generateFilters = () => {
  return filters.map(item => {
    return {
      name: item,
      count: Math.floor(Math.random() * 10),
    }
  })
};

export {generateFilters};