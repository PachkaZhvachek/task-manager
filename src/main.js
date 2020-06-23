import BoardComponent from './components/board';
import FilterComponent from './components/filter';
import LoadMoreButtonComponent from './components/load-more-button';
import TaskEditComponent from './components/task-edit';
import TaskComponent from './components/task';
import TasksComponent from './components/tasks';
import SiteMenuComponent from './components/site-menu';
import SortComponent from './components/sort';
import {generateFilters} from './mock/filter';
import {generateTasks} from './mock/task';
import {render, RenderPosition} from './utils';


const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListContainer, task) => {
  const onEditButtonClick = () => {
    taskListContainer.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  }

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    taskListContainer.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  }

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener('click', onEditButtonClick);

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener('submit', onEditFormSubmit)

  render(taskListContainer, RenderPosition.BEFOREEND, taskComponent.getElement())
};

const renderBoard = (boardComponent, tasks) => {
  render(boardComponent.getElement(), RenderPosition.BEFOREEND, new SortComponent().getElement())
  render(boardComponent.getElement(), RenderPosition.BEFOREEND, new TasksComponent().getElement())

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task)
    });

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(boardComponent.getElement(), RenderPosition.BEFOREEND, loadMoreButtonComponent.getElement())  

  loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task))
    
    if (showingTasksCount >= tasks.length) {
      loadMoreButtonComponent.getElement().remove()
      loadMoreButtonComponent.removeElement()
    }  
  });
};


const siteMainContainer = document.querySelector(`.main`);
const siteHeaderContainer = document.querySelector('.main__control');


const tasks = generateTasks(TASK_COUNT)
const filters = generateFilters();


render(siteHeaderContainer, RenderPosition.BEFOREEND, new SiteMenuComponent().getElement())
render(siteMainContainer, RenderPosition.BEFOREEND, new FilterComponent(filters).getElement())


const boardComponent = new BoardComponent();
render(siteMainContainer, RenderPosition.BEFOREEND, boardComponent.getElement())
renderBoard(boardComponent, tasks)