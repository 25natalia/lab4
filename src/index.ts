import rickymorty from './data/dataFetch';
import './components/indexpadre';
import myCharacter from './components/character/character';

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
			this.shadowRoot.innerHTML += `<character name '${data.name}'
			image'${data.image}'
			status '${data.status}'
			species '${data.species}'
			type '${data.type}'
			origin '${data.origin.name}'
			First episode '${data.firstEpisode}'
			>
			</character>`;
		}
	}
}

customElements.define('app-container', AppContainer);
