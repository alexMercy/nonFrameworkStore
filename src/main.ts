import './style.scss'
import {App} from "./app/app.ts";

!localStorage.getItem('lang') && localStorage.setItem('lang', 'ru');
!localStorage.getItem('theme') && localStorage.setItem('theme', 'light');
localStorage.getItem('theme') === 'dark' && document.body.classList.toggle('dark_mode');
new App(document.querySelector<HTMLDivElement>('#app')!).render();
