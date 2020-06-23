import getMenuTemplate from './components/getMenuTemplate';
import { getBoardTemplate } from './components/getBoardTemplate';
import getFilterTemplate from './components/getFilterTemplate';
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

const siteMainContainer = document.querySelector(`.main`);
const menuContainer = document.querySelector('.main__control');

render(menuContainer, 'beforeend', getMenuTemplate());
render(siteMainContainer, 'beforeend', getFilterTemplate(filters));
render(siteMainContainer, 'beforeend', getBoardTemplate());

const taskListContainer = document.querySelector('.board__tasks')
render(taskListContainer, 'afterbegin', getEditTaskTemplate(tasks[0]));

tasks.slice(1, showingTasksCount).forEach((task) => {
  return render(taskListContainer, 'beforeend', getTaskTemplate(task))
})
const boardContainer = document.querySelector('.board');
render(boardContainer, 'beforeend', getLoadMoreTemplate());

const loadMoreButton = document.querySelector(`.load-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => render(taskListContainer, `beforeend`, getTaskTemplate(task)))

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove()
  }
})
