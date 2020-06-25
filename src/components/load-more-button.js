import AbstractComponent from './abstract-component'

const getLoadMoreTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
    );
};

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return getLoadMoreTemplate();
  }

  setClickHanlder(handler) {
    this.getElement().addEventListener(`click`, handler)
  }
}