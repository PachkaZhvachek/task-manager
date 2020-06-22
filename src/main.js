import getMenuTemplate from './components/getMenuTemplate';
import getFilterTemplate from './components/getFilterTemplate';
import getSortTemplate from './components/getSortTemplate';
import getEditTaskTemplate from './components/getEditTaskTemplate';
import getTaskTemplate from './components/getTaskTemplate';
import getLoadMoreTemplate from './components/getLoadMoreTemplate';

import {generateFilters} from './mock/filter';
import {generateTasks} from './mock/task';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT)

const render = (container, place, template) => {
  container.insertAdjacentHTML(place, template)
}

const menuContainer = document.querySelector('.main__control');
const filterContainer = document.querySelector('.main__filter');
const boardContainer = document.querySelector('.board');
const boardTasksContainer = document.querySelector('.board__tasks');



render(menuContainer, 'afterbegin', getMenuTemplate());
render(filterContainer, 'afterbegin', getFilterTemplate(filters));
render(boardContainer, 'afterbegin', getSortTemplate());
render(boardTasksContainer, 'afterbegin', getEditTaskTemplate(tasks[0]));

for (let i = 1; i < showingTasksCount; i++) {
  render(boardTasksContainer, 'beforeend', getTaskTemplate(tasks[i]))
}

tasks.slice(1, showingTasksCount).forEach((task) => {
  return render(boardTasksContainer, 'beforeend', getTaskTemplate(task))
})

render(boardContainer, 'beforeend', getLoadMoreTemplate());

const loadMoreButton = document.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => render(boardTasksContainer, `beforeend`, getTaskTemplate(task)))

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove()
  }
})
