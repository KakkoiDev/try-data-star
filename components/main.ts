/// <reference lib="dom" />

class MainComponent extends HTMLElement {
	static get observedAttributes() {
		return ["title"];
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	get title() {
		return this.getAttribute("title") ?? "";
	}

	set title(value) {
		this.setAttribute("title", value);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "title" && this.shadowRoot) {
			this.render();
		}
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = /*html*/ `
<style>
    :host {
        display: block;
    }
    h1 {
        color: white;
        font-family: sans-serif;
    }
    .content {
        padding: 16px;
    }
</style>
<div>
    ${this.title ? `<h1>${this.title}</h1>` : ""}
    <div class="content">
        <slot>Loading...</slot>
    </div>
</div>
`;
	}
}

customElements.define("main-component", MainComponent);
