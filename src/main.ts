// import Store from './../dist';
import Store from '../lib';

const btn = document.querySelector('button') as HTMLButtonElement;
const container = document.querySelector('.state') as HTMLParagraphElement;

const store = new Store();

store.on('state', (value: string) => {
  container.innerHTML = value;
});

btn.addEventListener('click', () => {
  store.set('state', Math.random());
});
