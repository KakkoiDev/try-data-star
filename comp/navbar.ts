class Navbar extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		this.shadowRoot.innerHTML = /*html*/ `
        <ul part="navbar">
            <li part="nav-item" data-on-click="@get('/home')">home</li>
            <li part="nav-item" data-on-click="@get('/about')">about</li>
        </ul>
        `;
	}

	// Apply external styles using CSS custom properties
	setStyle(propertyName, value) {
		this.style.setProperty(`--navbar-${propertyName}`, value);
	}
}

customElements.define("navbar-component", Navbar);
