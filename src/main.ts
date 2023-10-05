import './style.scss';
import { App } from './app/app.ts';
import { pizzas } from './mock/pizzas.ts';
!localStorage.getItem('lang') && localStorage.setItem('lang', 'ru');
!localStorage.getItem('theme') && localStorage.setItem('theme', 'light');
localStorage.getItem('theme') === 'dark' && document.body.classList.add('dark_mode');
!localStorage.getItem('pizzas') && localStorage.setItem('pizzas', JSON.stringify(pizzas));

// @ts-ignore
Object.prototype.isEmpty = function () {
  // @ts-ignore
  return Object.keys(this).length === 0;
};
const app = document.querySelector<HTMLDivElement>('#app')!;
new App(app).render();
