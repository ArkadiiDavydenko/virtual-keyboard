import '../sass/style.scss';

// Создание основной разметки
class Element {
  constructor(parent, tag, setClassName = '') {
    const elem = document.createElement(tag);
    if (setClassName !== '') elem.className = setClassName;
    parent.append(elem);
    this.node = elem;
  }
}

const key_eng = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['Caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl']
];

const key_rus = [
  'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
  'Caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
  'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift',
  'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl'
];

const key_code_table = [
  'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'
];

function init() {
  let upperLetter = false;
  let englanguage;
  const wrapper = new Element(document.body, 'div', 'wrapper');
  const header = new Element(wrapper.node, 'header', 'header');
  const title = new Element(header.node, 'h1', 'title');
  title.node.textContent = 'Виртуальная клавиатура';

  const main = new Element(wrapper.node, 'main', 'main');
  main.node.innerHTML = `<textarea class = "textarea" rows="5" cols="50" autofocus></textarea>`;

  const textarea = document.querySelector('.textarea');
  const keyboard = new Element(main.node, 'div', 'keyboard');
  const description = new Element(main.node, 'p', 'description');
  description.node.textContent = 'Клавиатура создана для операционной системе Windows';

  const language = new Element(main.node, 'p', 'language');
  language.node.textContent = 'Для переключения языка комбинация: левыe ctrl + alt';

  key_eng.forEach((keyArr) => {
    let keyLine = new Element(keyboard.node, 'div', 'keyboard__line');
    keyArr.forEach(key => {
      let keyButton = new Element(keyLine.node, 'button', 'keyboard__key');
      keyButton.node.textContent = `${key}`;

      switch (key) {
        case 'Backspace':
          keyButton.node.classList.add('keyboard__key_very-long');
          keyButton.node.classList.add('backspace');
          break;

        case 'Tab':
          keyButton.node.classList.add('keyboard__key_long');
          keyButton.node.classList.add('tab');
          break;

        case 'Shift':
          keyButton.node.classList.add('keyboard__key_long');
          keyButton.node.classList.add('shift');
          break;

        case 'Enter':
          keyButton.node.classList.add('keyboard__key_long');
          keyButton.node.classList.add('enter');
          break;

        case 'Caps lock':
          keyButton.node.classList.add('keyboard__key_long');
          keyButton.node.classList.add('caps-lock');
          break;

        case 'Space':
          keyButton.node.classList.add('keyboard__key_extra-long');
          keyButton.node.classList.add('space');
          break;
      }
    })
  })


  //события текстареа
  textarea.addEventListener('blur', () => {
    textarea.focus();
  })
  document.querySelector('textarea').addEventListener('keydown', e => e.preventDefault());

  document.querySelectorAll('.keyboard__key').forEach(element => {
    element.addEventListener('mouseup', () => {
      textarea.focus();
      useKeyUp(element.dataset.keycode);
    })
  })


  //Добавление класса
  function addClass(arr) {
    let elements = document.querySelectorAll('.keyboard__key');
    for (let i = 0; i < elements.length; i++) {
      elements[i].dataset.keycode = `${arr[i]}`;
    }
  }

  addClass(key_code_table);

  function useKey(element) {
    switch (element) {
      case 'Tab':
        textarea.value += '    ';
        break
      case 'ShiftLeft':
        if (!upperLetter) {
          document.querySelectorAll('.keyboard__key').forEach(element => {
            if (element.textContent.length < 2) element.textContent = element.textContent.toUpperCase()
          })
          upperLetter = true;
        } else {
          document.querySelectorAll('.keyboard__key').forEach(element => {
            if (element.textContent.length < 2) element.textContent = element.textContent.toLowerCase();
          })
          upperLetter = false;
        }
        break
      case 'ShiftRight':
        if (!upperLetter) {
          document.querySelectorAll('.keyboard__key').forEach(element => {
            if (element.textContent.length < 2) element.textContent = element.textContent.toUpperCase()
          })
          upperLetter = true;
        } else {
          document.querySelectorAll('.keyboard__key').forEach(element => {
            if (element.textContent.length < 2) element.textContent = element.textContent.toLowerCase();
          })
          upperLetter = false;
        }
        break
      case 'Enter':
        textarea.value += '\n';
        break
      case 'Space':
        textarea.value += ' ';
        break
    }
  }

  function useKeyUp(element) {
    switch (element) {
      case 'ShiftLeft':
        if (!upperLetter) {
          document.querySelectorAll('.keyboard__key').forEach(element => {
            if (element.textContent.length < 2) element.textContent = element.textContent.toUpperCase()
          })
          upperLetter = true;
        } else {
          document.querySelectorAll('.keyboard__key').forEach(element => {
            if (element.textContent.length < 2) element.textContent = element.textContent.toLowerCase();
          })
          upperLetter = false;
        }
        break
      case 'ShiftRight':
        if (!upperLetter) {
          document.querySelectorAll('.keyboard__key').forEach(element => {
            if (element.textContent.length < 2) element.textContent = element.textContent.toUpperCase()
          })
          upperLetter = true;
        } else {
          document.querySelectorAll('.keyboard__key').forEach(element => {
            if (element.textContent.length < 2) element.textContent = element.textContent.toLowerCase();
          })
          upperLetter = false;
        }
    }
  }

  function deleteElement(element) {
    let textCursorPosition = textarea.selectionStart;
    if (element === 'Backspace' && textCursorPosition !== 0) {
      textarea.value = textarea.value.slice(0, textarea.selectionStart - 1) + textarea.value.slice(textCursorPosition, textarea.value.length);
      textarea.setSelectionRange(textCursorPosition - 1, textCursorPosition - 1);
    }
    if (element === 'Delete') {
      textarea.value = textarea.value.slice(0, textCursorPosition) + textarea.value.slice(textCursorPosition + 1, textarea.value.length);
      textarea.setSelectionRange(textCursorPosition, textCursorPosition);
    }
  }

//Изменение языка
  function changelanguage() {
    if (englanguage === 'en') {
      let elements = document.querySelectorAll('.keyboard__key');
      for (let i = 0; i < elements.length; i++) {
        elements[i].textContent = `${key_rus[i]}`;
      }
      englanguage = 'ru';
      localStorage.setItem('lang', `${englanguage}`);
    } else {
      let arrEng = key_eng.flat();
      let elements = document.querySelectorAll('.keyboard__key');
      for (let i = 0; i < elements.length; i++) {
        elements[i].textContent = `${arrEng[i]}`;
      }
      englanguage = 'en';
      localStorage.setItem('lang', `${englanguage}`);
    }
  }

  function catchClicks(func, ...codes) {
    let pressed = new Set();

    document.addEventListener('keydown', function (event) {
      pressed.add(event.code);
      for (let code of codes) {
        if (!pressed.has(code)) {
          return;
        }
      }
      pressed.clear();
      func();
    });
    document.addEventListener('keyup', function (event) {
      pressed.delete(event.code);
    });

  }

  catchClicks(() => changelanguage(), "ControlLeft", "AltLeft");
  catchClicks(() => showRightAlt (), "ControlLeft", "AltRight");

  function showRightAlt () {
    let leftCtrl = document.querySelector('[data-keycode="ControlLeft"]');
    leftCtrl.classList.remove('keyboard__key_active');

  }

  function capsLock(element) {
    if (element === 'CapsLock') {

      if (!upperLetter) {
        document.querySelectorAll('.keyboard__key').forEach(element => {
          if (element.textContent.length < 2) element.textContent = element.textContent.toUpperCase()
        })
        upperLetter = true;
      } else {
        document.querySelectorAll('.keyboard__key').forEach(element => {
          if (element.textContent.length < 2) element.textContent = element.textContent.toLowerCase();
        })
        upperLetter = false;
      }
    }
  }

  //Вывод текста в textarea
  document.querySelectorAll('.keyboard__key').forEach(element => {
    element.addEventListener('mousedown', () => {
      textarea.focus();
      useKey(element.dataset.keycode);
      capsLock(element.dataset.keycode);
      deleteElement(element.dataset.keycode);
      if (element.textContent.length < 2) {
        textarea.value += element.textContent;
      }
    })
  })

  //События на клавиатуре
  window.addEventListener('keydown', function (event) {
    textarea.focus();
    useKey(event.code);
    capsLock(event.code);
    deleteElement(event.code);
    let elements = document.querySelectorAll('.keyboard__key');
    for (let i = 0; i < elements.length; i++) {

      if (elements[i].dataset.keycode === `${event.code}`) {
        elements[i].classList.add('keyboard__key_active');
        if (elements[i].textContent.length < 2) textarea.value += elements[i].textContent;
      }
    }
  });

  window.addEventListener('keyup', function (event) {
    useKeyUp(event.code);
    textarea.focus();
    let elements = document.querySelectorAll('.keyboard__key');
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].dataset.keycode === `${event.code}`) {
        elements[i].classList.remove('keyboard__key_active');
      }
    }
  });

  //Установка языка при обновлении
  if (!localStorage.getItem('lang')) {
    englanguage = 'en'
    localStorage.setItem('lang', `${englanguage}`);
  } else if (localStorage.getItem('lang') === 'en') {
    englanguage = 'en'
  } else {
    englanguage = 'ru'
    let elements = document.querySelectorAll('.keyboard__key');
    for (let i = 0; i < elements.length; i++) {
      elements[i].textContent = `${key_rus[i]}`;
    }
    localStorage.setItem('lang', `${englanguage}`);
  }

}

window.addEventListener('DOMContentLoaded', init);
