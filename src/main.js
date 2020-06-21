import getMenuTemplate from './components/getMenuTemplate';
import getFilterTemplate from './components/getFilterTemplate';
import getSortTemplate from './components/getSortTemplate';
import getAddTaskTemplate from './components/getAddTaskTemplate';
import getEditTaskTemplate from './components/getEditTaskTemplate';
import getCardTemplate from './components/getCardTemplate';
import getLoadMoreTemplate from './components/getLoadMoreTemplate';


const render = (container, place, template) => {
  container.insertAdjacentHTML(place, template)
}

const menuContainer = document.querySelector('.main__control');
const filterContainer = document.querySelector('.main__filter');
const boardContainer = document.querySelector('.board');
const boardTasksContainer = document.querySelector('.board__tasks');

const TASK_COUNT = 3;

render(menuContainer, 'afterbegin', getMenuTemplate());
render(filterContainer, 'afterbegin', getFilterTemplate());
render(boardContainer, 'afterbegin', getSortTemplate());
for (let i = 0; i < TASK_COUNT; i++) {
  render(boardTasksContainer, 'afterbegin', getCardTemplate())
}
// render(boardTasksContainer, 'afterbegin', getEditTaskTemplate());
render(boardTasksContainer, 'afterend', getLoadMoreTemplate());
