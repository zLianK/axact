import { h, render } from 'https://unpkg.com/preact?module';
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

function App(props) {
  return html`
    <div>
      ${props.cpus.map((cpu) => {
        return html` 
        <div class="bar">
          <span class="label">${cpu.toFixed(2)}%</span>
          <div class="bar-inner" style="width: ${cpu}%"></div>        
        </div>`;
      })}
    </div>
  `;
}

setInterval(async () => {
  let response = await fetch('/api/cpus')
  if (response.status !== 200) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  let json = await response.json();
  render(html`<${App} cpus=${json}></${App}>`, document.body)
}, 1000);
