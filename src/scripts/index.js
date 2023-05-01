// Создание основной разметки
class Element {
  constructor(parent, tag, setClassName = '') {
    const elem = document.createElement(tag);
    if (setClassName !== '') elem.className = setClassName;
    parent.append(elem);
    this.node = elem;
  }
}
// console.log(new Element(document.body, 'div', 'wrapper'));


const KEY_ENG = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['Caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', '▲', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl']
];

const KEY_RUS = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
  'Caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
  'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift',
  'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Ctrl'
];

const KEY_CODE_TABLE = [
  'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'
];

function init() {
  let upperLetter = false;

  // let engLanguage = true;
  let engLanguage;
  // console.log(engLanguage)
  // localStorage.getItem('lang')?localStorage.getItem('lang'):engLanguage = 'en';
  // localStorage.setItem('lang', `${engLanguage}`);
console.log(localStorage.getItem('lang'));
// console.log(localStorage.getItem('lang'));
// console.log("localStorage");
// localStorage.setItem('lang', `${engLanguage}`);
  // localStorage.getItem('lang') === 'ru'

  const WRAPPER = new Element(document.body, 'div', 'wrapper');
  const HEADER = new Element(WRAPPER.node, 'header', 'header');
  const TITLE = new Element(HEADER.node, 'h1', 'title');
  TITLE.node.textContent = 'Виртуальная клавиатура';

  const MAIN = new Element(WRAPPER.node, 'main', 'main');
  // MAIN.node.innerHTML = `<textarea class = "textarea" rows="5" cols="50" disabled></textarea>`
  MAIN.node.innerHTML = `<textarea class = "textarea" rows="5" cols="50" autofocus></textarea>`
  // MAIN.node.innerHTML = `<textarea class = "textarea" rows="5" cols="50"></textarea>`
  const TEXTAREA = document.querySelector('.textarea');

  const KEYBOARD = new Element(MAIN.node, 'div', 'keyboard');

  const DESCRIPTION = new Element(MAIN.node, 'p', 'description');
  DESCRIPTION.node.textContent = 'Клавиатура создана для операционной системе Windows';
  const LANGUAGE = new Element(MAIN.node, 'p', 'language');
  LANGUAGE.node.textContent = 'Для переключения языка комбинация: левыe ctrl + alt';

  KEY_ENG.forEach(keyArr => {
    let keyLine = new Element(KEYBOARD.node, 'div', 'keyboard__line');
    keyArr.forEach(key => {
      let keyButton = new Element(keyLine.node, 'button', 'keyboard__key');
      keyButton.node.textContent = `${key}`;

      switch (key) {
        case 'Backspace':
          keyButton.node.classList.add('keyboard__key_very-long')
          keyButton.node.classList.add('backspace')
          break

        case 'Tab':
          keyButton.node.classList.add('keyboard__key_long')
          keyButton.node.classList.add('tab')
          break

        case 'Shift':
          keyButton.node.classList.add('keyboard__key_long')
          keyButton.node.classList.add('shift')
          break

        case 'Enter':
          keyButton.node.classList.add('keyboard__key_long')
          keyButton.node.classList.add('enter')
          break

        case 'Caps lock':
          keyButton.node.classList.add('keyboard__key_long')
          keyButton.node.classList.add('caps-lock')
          break

        case 'Space':
          keyButton.node.classList.add('keyboard__key_extra-long')
          keyButton.node.classList.add('space')
          break
      }
    })
  })


  //события текстареа
  TEXTAREA.addEventListener ('blur', () => {
    TEXTAREA.focus();
  })

  document.querySelector('textarea').addEventListener('keydown', e => e.preventDefault());
  document.querySelector('textarea').addEventListener('keyup', e => e.preventDefault());


  document.querySelectorAll('.keyboard__key').forEach(element => {
    element.addEventListener('mouseup', () => {
      TEXTAREA.focus();
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

  addClass(KEY_CODE_TABLE);

  function useKey(element) {
    switch (element) {
      case 'Tab':
        TEXTAREA.value += '    ';
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
        TEXTAREA.value += '\n';
        break
      case 'Space':
        TEXTAREA.value += ' ';
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
    let textCursorPosition = TEXTAREA.selectionStart;
    if (element === 'Backspace') {
      TEXTAREA.value = TEXTAREA.value.substring(0, TEXTAREA.value.length - 1);
      TEXTAREA.setSelectionRange(textCursorPosition - 1, textCursorPosition - 1);
    }
    if (element === 'Delete') {
      // let textCursorPosition = TEXTAREA.selectionStart;
      TEXTAREA.value = TEXTAREA.value.slice(0, textCursorPosition)+ TEXTAREA.value.slice(textCursorPosition + 1, TEXTAREA.value.length);
      // console.log(TEXTAREA.value.replace((TEXTAREA.value.slice(TEXTAREA.selectionStart, TEXTAREA.value.length)), ''));
      // TEXTAREA.value = TEXTAREA.value.slice(0, TEXTAREA.selectionStart)
      //   + TEXTAREA.value.slice(input.selectionStart + 1, TEXTAREA.value.length);
      TEXTAREA.setSelectionRange(textCursorPosition, textCursorPosition);

      // TEXTAREA.value = TEXTAREA.value.substring(0, TEXTAREA.value.length - 1);
    }

  }



//Изменение языка
    function changeLanguage(element) {
    //
    //   console.log(keyArr[0] == 'ControlLeft')
    //   console.log(keyArr)
    // if (keyArr[0] == 'ControlLeft' && element === 'AltLeft') {
    // if (element === 'ControlLeft' && element === 'AltLeft') {
    //   keyArr.splice(0,keyArr.length);
      if (engLanguage=== 'en') {
        let elements = document.querySelectorAll('.keyboard__key');
        for (let i = 0; i < elements.length; i++) {
          elements[i].textContent = `${KEY_RUS[i]}`;
        }
        // engLanguage = false;
        engLanguage = 'ru';
        localStorage.setItem('lang', `${engLanguage}`);
      } else {
        console.log('2')
        let arrEng = KEY_ENG.flat();
        let elements = document.querySelectorAll('.keyboard__key');
        for (let i = 0; i < elements.length; i++) {
          elements[i].textContent = `${arrEng[i]}`;
        }
        // engLanguage = true;
        engLanguage = 'en';
        localStorage.setItem('lang', `${engLanguage}`);
      // }
    }
  }

  function runOnKeys(func, ...codes) {
    let pressed = new Set();

    document.addEventListener('keydown', function(event) {
      pressed.add(event.code);

      for (let code of codes) {
        if (!pressed.has(code)) {
          return;
        }
      }
      pressed.clear();
      func();
    });
    document.addEventListener('keyup', function(event) {
      pressed.delete(event.code);
    });

  }

  runOnKeys(
    () => changeLanguage(),
    "ControlLeft",
    "AltLeft"
  );


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
      TEXTAREA.focus();
      useKey(element.dataset.keycode);
      capsLock(element.dataset.keycode);
      deleteElement(element.dataset.keycode);
      if (element.textContent.length < 2) {
        TEXTAREA.value += element.textContent;
      }
    })
  })



  //События на клавиатуре
  window.addEventListener('keydown', function (event) {
    TEXTAREA.focus();
    // changeLanguage(event.code);
    // prepareChange(event.code);
    useKey(event.code);
    capsLock(event.code);
    deleteElement(event.code);
    let elements = document.querySelectorAll('.keyboard__key');
    for (let i = 0; i < elements.length; i++) {

      if (elements[i].dataset.keycode === `${event.code}`) {
        elements[i].classList.add('keyboard__key_active');
        if (elements[i].textContent.length < 2) TEXTAREA.value += elements[i].textContent;
      }
    }
  });

  window.addEventListener('keyup', function (event) {
    useKeyUp(event.code);
    TEXTAREA.focus();
    let elements = document.querySelectorAll('.keyboard__key');
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].dataset.keycode === `${event.code}`) {
        elements[i].classList.remove('keyboard__key_active')
      }
    }
  });


  //Установка языка при обнавлении
  if (!localStorage.getItem('lang')) {
    console.log('1')
    engLanguage = 'en'
    localStorage.setItem('lang', `${engLanguage}`);
  }
  else if (localStorage.getItem('lang') === 'en') {
    engLanguage = 'en'
    console.log('1en')
  }
  else {
    engLanguage = 'ru'
    console.log('1ru')
    let elements = document.querySelectorAll('.keyboard__key');
    for (let i = 0; i < elements.length; i++) {
      elements[i].textContent = `${KEY_RUS[i]}`;
    }
    localStorage.setItem('lang', `${engLanguage}`);
  }

}

// window.addEventListener('DOMContentLoaded', () => {
//   document.querySelector('.textarea').focus();
// });


window.addEventListener('DOMContentLoaded', init);
