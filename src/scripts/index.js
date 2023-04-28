// Создание основной разметки
class Element {
  constructor(parent, tag, setClassName = '') {
    const elem = document.createElement(tag);
    if (setClassName !== '') elem.className = setClassName;
    parent.append(elem);
    this.node = elem;
  }
}
console.log(new Element(document.body, 'div', 'wrapper'));