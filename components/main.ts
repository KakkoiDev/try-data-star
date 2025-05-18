/// <reference lib="dom" />

/**
 * MainComponent - A web component that works with Data Star
 * Uses light DOM for elements that need to be accessed by Data Star
 * while providing style encapsulation with Shadow DOM
 */
class MainComponent extends HTMLElement {
	// Private properties
	private _title = "";
	private _shadowRoot: ShadowRoot;
	private _titleElement: HTMLHeadingElement | null = null;
	private _contentContainer: HTMLDivElement | null = null;

	static get observedAttributes() {
		return ["title"];
	}

	constructor() {
		super();
		// Create Shadow DOM with open mode for external access
		this._shadowRoot = this.attachShadow({ mode: "open" });

		// Initial render of Shadow DOM structure
		this._shadowRoot.innerHTML = /*html*/ `
			<style>
				:host {
					display: block;
					font-family: system-ui, sans-serif;
				}
				.content {
					padding: 1rem;
				}
			</style>
			<div class="wrapper">
				<slot name="title"></slot>
				<div class="content">
					<slot>Loading...</slot>
				</div>
			</div>
		`;
	}

	set title(value) {
		this._title = value;
		this.render();
	}

	get title() {
		return this._title;
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === "title" && newValue !== oldValue) {
			this._title = newValue;
			this.render();
		}
	}

	connectedCallback() {
		this.render();
	}

	render() {
		// Keep the title in light DOM for Data Star to access
		if (this._title) {
			// Create or update title in light DOM
			if (!this._titleElement) {
				this._titleElement = document.createElement("h1");
				this._titleElement.slot = "title";
				this._titleElement.setAttribute("data-title", ""); // Add data attribute for Data Star
				this.appendChild(this._titleElement);
			}
			this._titleElement.textContent = this._title;
		} else if (this._titleElement) {
			// Remove title if empty
			this._titleElement.remove();
			this._titleElement = null;
		}
	}
}

customElements.define("main-component", MainComponent);
console.log("MainComponent defined");
