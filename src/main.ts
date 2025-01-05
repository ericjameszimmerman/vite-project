import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { Staff } from "./Staff";
import { Note } from "./Note";
import { Renderer } from "./Renderer";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <canvas id="musicCanvas" width="500" height="200"></canvas>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)


console.log('Hello World!');

document.addEventListener("DOMContentLoaded", () => {
  const renderer = new Renderer("musicCanvas");

  const staff = new Staff(50, 50, 400);
  const notes = [
    new Note("C4", 100, 70),
    new Note("E4", 150, 60),
    new Note("G4", 200, 50),
    new Note("F4", 250, 65),
  ];

  renderer.render(staff, notes);
});
