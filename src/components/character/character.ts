import styles from './character.css';

export enum Attribute {
	'name' = 'name',
	'image' = 'image',
	'status' = 'status',
	'species' = 'species',
	'type' = 'type',
	'origin' = 'origin',
	'episode' = 'episode',
}

class Character extends HTMLElement {
	name?: string;
	image?: string;
	status?: string;
	species?: string;
	type?: string;
	origin?: string;
	episode?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			name: null,
			image: null,
			status: null,
			species: null,
			type: null,
			origin: null,
			episode: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}
	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `


  <section>
  <h1>${this.name}</h1>
  <img src='${this.image}'></img>
  <h3>Status: ${this.status}</h3>
  <h3>Species: ${this.species}</h3>
  <h3>Type:${this.type}</h3>
  <h3>Origin:${this.origin}</h3>
  <h3>Episode name:${this.episode}</h3>
  </section>`;
		}
		const cssCharacter = this.ownerDocument.createElement('style');
		cssCharacter.innerHTML = styles;
		this.shadowRoot?.appendChild(cssCharacter);
	}
}

export default Character;
customElements.define('my-character', Character);
