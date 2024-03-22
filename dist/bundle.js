(()=>{"use strict";const e=e=>{return t=void 0,n=void 0,o=function*(){try{return yield fetch("https://rickandmortyapi.com/api/character/"+e).then((e=>e.json()))}catch(e){console.log(e)}},new((i=void 0)||(i=Promise))((function(e,s){function r(e){try{a(o.next(e))}catch(e){s(e)}}function c(e){try{a(o.throw(e))}catch(e){s(e)}}function a(t){var n;t.done?e(t.value):(n=t.value,n instanceof i?n:new i((function(e){e(n)}))).then(r,c)}a((o=o.apply(t,n||[])).next())}));var t,n,i,o};var t;!function(e){e.name="name",e.image="image",e.status="status",e.species="species",e.type="type",e.origin="origin",e.episode="episode"}(t||(t={}));class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get observedAttributes(){return Object.keys({name:null,image:null,status:null,species:null,type:null,origin:null,episode:null})}attributeChangedCallback(e,t,n){this[e]=n,this.render()}connectedCallback(){this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`\n\n\n  <section>\n  <h1>${this.name}</h1>\n  <img src='${this.image}'></img>\n  <h3>${this.status}</h3>\n  <h3>${this.species}</h3>\n  <h3>${this.type}</h3>\n  <h4>${this.origin}</h4>\n  <h4>${this.episode}</h4>\n  </section>`),this.ownerDocument.createElement("style")}}customElements.define("my-character",n);var i=function(e,t,n,i){return new(n||(n=Promise))((function(o,s){function r(e){try{a(i.next(e))}catch(e){s(e)}}function c(e){try{a(i.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,c)}a((i=i.apply(e,t||[])).next())}))};class o extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){return i(this,void 0,void 0,(function*(){this.renderInput()}))}getFirstEpisode(e){return i(this,void 0,void 0,(function*(){try{return(yield fetch(e).then((e=>e.json()))).name}catch(e){return console.log(e),"error"}}))}getCharacters(t){return i(this,void 0,void 0,(function*(){const n=[];try{for(let i=1;i<=t;i++){const t=yield e(i);n.push(t)}return n}catch(e){return console.error("Error fetching characters:",e),[]}}))}renderPersonajes(e){return i(this,void 0,void 0,(function*(){if(this.shadowRoot){const t=this.shadowRoot.querySelector("section");t&&t.remove();const n=document.createElement("section");for(const t of e){const e=yield this.getFirstEpisode(t.episode[0]);this.render(Object.assign(Object.assign({},t),{firstepisodename:e}),n)}this.shadowRoot.appendChild(n)}}))}renderInput(){if(this.shadowRoot){this.shadowRoot.innerHTML="";const e=document.createElement("form");e.id="form",e.addEventListener("submit",(e=>i(this,void 0,void 0,(function*(){var t;e.preventDefault();const n=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#inputNumber");if(n){const e=Number(n.value),t=yield this.getCharacters(e);this.renderPersonajes(t)}}))));const t=document.createElement("input");t.type="number",t.id="inputNumber",t.value="",t.placeholder="Number of characters";const n=document.createElement("input");n.type="submit",n.value="Submit",e.appendChild(t),e.appendChild(n),this.shadowRoot.appendChild(e)}}render(e,t){const n=document.createElement("my-character");n.setAttribute("name",e.name),n.setAttribute("image",e.image),n.setAttribute("status",e.status),n.setAttribute("species",e.species),n.setAttribute("type",e.type||"not found"),n.setAttribute("origin",e.origin.name),n.setAttribute("episode",e.firstepisodename),t.appendChild(n)}}customElements.define("app-container",o)})();