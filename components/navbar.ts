/// <reference lib="dom" />

class Navbar extends HTMLElement {
	_items = [];

	static get observedAttributes() {
		return ["items"];
	}

	attributeChangedCallback(name, _oldValue, newValue) {
		if (name === "items" && newValue) {
			try {
				this._items = JSON.parse(newValue);
				this.render();
			} catch (error) {
				console.error("Invalid items format", error);
			}
		}
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const navItems = this._items
			.map(
				(item) =>
					/*html*/ `<li class="nav-item" data-on-click="@get('${item.path}')">${item.label}</li>`,
			)
			.join("");

		this.innerHTML = /*html*/ `
        <ul class="navbar">
            ${navItems}
        </ul>
        `;
	}
}

customElements.define("navbar-component", Navbar);
