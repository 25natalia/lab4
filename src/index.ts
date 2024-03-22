import { rickymorty } from './data/dataFetch';
import './components/indexpadre';
import myCharacter, { Attribute } from './components/character/character';
import style from './index.css';

class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	async connectedCallback() {
		this.renderInput();
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

	async getCharacters(numberOfCharacters: number): Promise<any[]> {
		const characters = [];
		try {
			for (let i = 1; i <= numberOfCharacters; i++) {
				const data = await rickymorty(i);
				characters.push(data);
			}
			return characters;
		} catch (error) {
			console.error('Error fetching characters:', error);
			return [];
		}
	}

	async renderPersonajes(characters: any[]) {
		if (this.shadowRoot) {
			const section = this.shadowRoot.querySelector('section');
			if (section) {
				section.remove(); // Remove previous characters
			}
			const newSection = document.createElement('section');
			for (const character of characters) {
				const firstEpisode = await this.getFirstEpisode(character.episode[0]);
				this.render({ ...character, firstepisodename: firstEpisode }, newSection);
			}
			this.shadowRoot.appendChild(newSection);
		}
	}

	renderInput() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';

			const cssCharacter = this.ownerDocument.createElement('style');
			cssCharacter.innerHTML = style;
			this.shadowRoot?.appendChild(cssCharacter);

			const form = document.createElement('form');
			form.id = 'form';
			form.addEventListener('submit', async (e) => {
				e.preventDefault();
				const inputNumber = this.shadowRoot?.querySelector<HTMLInputElement>('#inputNumber');
				if (inputNumber) {
					const numberOfCharacters = Number(inputNumber.value);
					const dataCharacters = await this.getCharacters(numberOfCharacters);
					this.renderPersonajes(dataCharacters);
				}
			});

			const inputNumber = document.createElement('input');
			inputNumber.type = 'number';
			inputNumber.id = 'inputNumber';
			inputNumber.value = '';
			inputNumber.placeholder = 'Number of characters';

			const inputButton = document.createElement('input');
			inputButton.type = 'submit';
			inputButton.value = 'Submit';

			form.appendChild(inputNumber);
			form.appendChild(inputButton);
			this.shadowRoot.appendChild(form);
		}
	}

	render(data: any, container: HTMLElement) {
		const characterElement = document.createElement('my-character');
		characterElement.setAttribute('name', data.name);
		characterElement.setAttribute('image', data.image);
		characterElement.setAttribute('status', data.status);
		characterElement.setAttribute('species', data.species);
		characterElement.setAttribute('type', data.type || 'not found');
		characterElement.setAttribute('origin', data.origin.name);
		characterElement.setAttribute('episode', data.firstepisodename);
		container.appendChild(characterElement);

		const cssCharacter = this.ownerDocument.createElement('style');
		cssCharacter.innerHTML = style;
		this.shadowRoot?.appendChild(cssCharacter);
	}
}

customElements.define('app-container', AppContainer);
