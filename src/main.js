class CustomAccordion extends HTMLElement {
  li = document.createElement("li");
  btn = document.createElement("btn");
  arrowIcon = document.createElement("img");
  content = document.createElement("div");

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const isExpanded = this.getAttribute("is-expanded");

    this.li.classList.add("accordion-item");

    this.btn.classList.add("accordion-item__btn");
    this.btn.textContent = "Accordion headline";

    this.arrowIcon.src = "assets/arrow.svg";
    this.arrowIcon.alt = "Dropdown arrow";
    this.arrowIcon.classList.add("accordion-item__arrow");
    this.arrowIcon.addEventListener("dragstart", (e) => e.preventDefault());

    this.content.classList.add("accordion-item__content");
    this.content.innerHTML = this.innerHTML;
    this.innerHTML = "";

    const stylesheet = document.createElement("link");
    stylesheet.setAttribute("rel", "stylesheet");
    stylesheet.setAttribute("href", "styles/style.css");

    this.btn.appendChild(this.arrowIcon);
    this.li.appendChild(this.btn);
    this.li.appendChild(this.content);
    this.btn.addEventListener("click", () => this.toggle());

    shadow.appendChild(stylesheet);
    shadow.appendChild(this.li);

    if (isExpanded === false || isExpanded === "false" || isExpanded === null) {
      this.content.setAttribute("aria-hidden", false);
      this.content.style.transition = "0s";
      this.content.style.maxHeight = this.content.scrollHeight + "px";
      this.arrowIcon.classList.add("accordion-item__arrow--rotate");
    } else {
      this.content.setAttribute("aria-hidden", isExpanded);
    }

    window.addEventListener("resize", () => {
      if (this.content.getAttribute("aria-hidden") === "false") {
        this.content.style.maxHeight = this.content.scrollHeight + "px";
      }
    });
  }

  toggle() {
    this.content.style.transition = "0.5s";

    if (this.content.style.maxHeight === "") {
      //With the help of scrollHeight i can have dynamic sized content without weird skips with transition
      this.content.style.maxHeight = this.content.scrollHeight + "px";

      //Rotate arrow, and tell browser that the content is expanded
      this.content.setAttribute("aria-hidden", "false");
      this.arrowIcon.classList.add("accordion-item__arrow--rotate");
    } else {
      //Reset, and tell browser that the content is hidden
      this.content.style.maxHeight = null;
      this.content.setAttribute("aria-hidden", "true");
      this.arrowIcon.classList.remove("accordion-item__arrow--rotate");
    }
  }
}

customElements.define("accordion-item", CustomAccordion);
