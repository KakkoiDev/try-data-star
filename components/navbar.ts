class Navbar extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	render() {
		this.innerHTML = /*html*/ `
        <ul class="navbar">
            <li class="nav-item" data-on-click="@get('/home')">home</li>
            <li class="nav-item" data-on-click="@get('/about')">about</li>
        </ul>
        `;
	}
}

customElements.define("navbar-component", Navbar);
