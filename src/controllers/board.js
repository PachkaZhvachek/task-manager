import LoadMoreButtonComponent from '../components/load-more-button';
import TaskEditComponent from '../components/task-edit';
import TaskComponent from '../components/task';
import TasksComponent from '../components/tasks';
import NoTasksComponent from '../components/no-tasks';
import SortComponent, { SortType } from '../components/sort';
import {render, RenderPosition, replace, remove} from '../utils/render';


const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  }

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  }

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Esc` || evt.key === `Escape`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`click`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);
  
  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, RenderPosition.BEFOREEND, taskComponent)
};

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListElement, task)
  });
};

const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];

  const showingTasks = tasks.slice()

  switch(sortType) {
    case SortType.DATE_UP: 
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break; 
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;     
  }

  return sortedTasks.slice(from, to)
}

export default class BoardController {
  constructor(container) {
    this._container = container; //boardComponent.getElement()

    this._noTasksComponent = new NoTasksComponent;
    this._tasksComponent = new TasksComponent;
    this._loadMoreButtonComponent = new LoadMoreButtonComponent;
    this._sortComponent = new SortComponent;
  }

  render(tasks) {
    const renderLoadMoreButton = () => {
      if (showingTasksCount >= tasks.length) {
        return;
      }  

      render(container, RenderPosition.BEFOREEND, this._loadMoreButtonComponent)

      this._loadMoreButtonComponent.setClickHanlder(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;
    
        const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, showingTasksCount)

        renderTasks(taskListElement, sortedTasks)

        if (showingTasksCount >= tasks.length) {
          remove(this._loadMoreButtonComponent)
        }  
      });
    }

    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, RenderPosition.BEFOREEND, this._noTasksComponent)
      return;
    }

    render(container, RenderPosition.BEFOREEND, this._sortComponent)
    render(container, RenderPosition.BEFOREEND, this._tasksComponent)

    const taskListElement = this._tasksComponent.getElement()

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    renderTasks(taskListElement, tasks.slice(0, showingTasksCount))
    renderLoadMoreButton() 
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount)

      taskListElement.innerHTML = ``;

      renderTasks(taskListElement, sortedTasks)

      renderLoadMoreButton();    
    });
  }
}