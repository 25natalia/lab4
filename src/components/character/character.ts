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
  <h3>${this.status}</h3>
  <h3>${this.species}</h3>
  <h3>${this.type}</h3>
  <h4>${this.origin}</h4>
  <h4>${this.episode}</h4>
  </section>`;
		}
	}
}

export default Character;
customElements.define('my-character', Character);
