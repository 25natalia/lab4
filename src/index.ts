import { rickymorty } from './data/dataFetch';
import './components/indexpadre';
import myCharacter, { Attribute } from './components/character/character';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		for (let i = 1; i <= 10; i++) {
			const data = await rickymorty(i);
			const firstEpisode = await this.getFirstEpisode(data.episode[0]);
			console.log(data);
			this.render({ ...data, firstepisodename: firstEpisode });
		}
	}

	async getFirstEpisode(url: string): Promise<string> {
		try {
			const getData = await fetch(url).then((res) => res.json());
			return getData.name;
		} catch (error) {
			console.log(error);
			return 'error';
		}
	}

	

	render(data: any) {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML += `
			<section><my-character name='${data.name}'
			image='${data.image}'
			status='${data.status}'
			species='${data.species}'
			type='${data.type || 'not found'}'
			origin='${data.origin.name}'
			episode='${data.firstepisodename}'
			>
			</my-character>`;
		}
	}
}

customElements.define('app-container', AppContainer);
