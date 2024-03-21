import rickymorty from './data/dataFetch';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		for (let i = 1; i < 11; i++) {
			const data = await rickymorty(i);
			console.log(data);
			this.render(data);
		}
	}

	render(data: any) {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML += `<h1>${data.name}</h1>
      <h3>${data.status}</h3>
      <h3>${data.species}</h3>
      <h3>${data.type}</h3>
      <h3>${data.origin}</h3>
      <h3>${data.episode}</h3>
      <br>`;
		}
	}
}
customElements.define('app-container', AppContainer);
