import './style.css';
import { printMe } from './print.js';

function component() {
    const element = document.createElement('div');
 
   // Lodash, now imported by this script
    element.innerHTML = ['Hello', 'мир'].join(' ');

    printMe();
 
    return element;
  }
 
  document.body.appendChild(component());