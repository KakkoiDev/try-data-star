/// <reference lib="dom" />

class HomeComponent extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.shadowRoot.innerHTML = /*html*/ `
<style>
    :host {
        display: block;
    }
</style>
<main id="main">HOME</main>
`;
	}
}

customElements.define("home-component", HomeComponent);
