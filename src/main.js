import BoardComponent from './components/board';
import FilterComponent from './components/filter';
import SiteMenuComponent from './components/site-menu';
import {generateFilters} from './mock/filter';
import {generateTasks} from './mock/task';
import BoardController from './controllers/board';
import {render, RenderPosition} from './utils/render';

const TASK_COUNT = 22;


const siteMainContainer = document.querySelector(`.main`);
const siteHeaderContainer = document.querySelector('.main__control');


const tasks = generateTasks(TASK_COUNT)
const filters = generateFilters();


render(siteHeaderContainer, RenderPosition.BEFOREEND, new SiteMenuComponent())
render(siteMainContainer, RenderPosition.BEFOREEND, new FilterComponent(filters))


const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent);

render(siteMainContainer, RenderPosition.BEFOREEND, boardComponent)
boardController.render(tasks)
