let s;

const ResultsWidget = {
  settings: {
    resultContainer: document.querySelector(".result"),
    loadingModal: document.createElement("div"),
  },
  init: function () {
    s = this.settings;
    this.createLoadingModal();
    this.handleEmptyResults();
  },
  createLoadingModal: function () {
    s.loadingModal.classList.add("loading-modal");
    s.loadingModal.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
  },
  handleEmptyResults: function () {
    s.resultContainer.innerHTML = `<div class="empty-result">
        <div>
          <h2>No results yet...</h2>
          <h3>
            Use the filters above to find the plant that best fits your
            environment :)
          </h3>
        </div>
        <div class="no-result">
          <img src="${require("../images/illustrations/no-results.png")}" alt="no results" />
        </div>
      </div>`;
  },
  showLoadingModal: function (visible) {
    const isLoading = Array.from(s.resultContainer.childNodes).includes(
      s.loadingModal
    );
    if (visible && !isLoading) {
      s.resultContainer.appendChild(s.loadingModal);
    } else if (!visible && isLoading) {
      s.resultContainer.removeChild(s.loadingModal);
    }
  },
  getToxicAttribute: function (toxicity) {
    if (toxicity) {
      return `<img src="${require("../images/icons/toxic.svg")}" alt="toxic" />`;
    }
    return `<img src="${require("../images/icons/pet.svg")}" alt="pet friendly" />`;
  },
  getSunAttribute: function (sun) {
    switch (sun) {
      case "high":
        return `<img src="${require("../images/icons/high-sun.svg")}" alt="high sun" />`;
      case "low":
        return `<img src="${require("../images/icons/low-sun.svg")}" alt="low sun" />`;

      case "no":
      default:
        return `<img src="${require("../images/icons/no-sun.svg")}" alt="no sun" />`;
    }
  },
  getWaterAttribute: function (water) {
    switch (water) {
      case "daily":
        return `<img src="${require("../images/icons/3-drops.svg")}" alt="daily watering" />`;
      case "regularly":
        return `<img src="${require("../images/icons/2-drops.svg")}" alt="regularly watering" />`;

      case "rarely":
      default:
        return `<img src="${require("../images/icons/1-drop.svg")}" alt="rarely watering" />`;
    }
  },
  renderResults: function (data) {
    let results = "";
    data
      .sort((a) => (a.staff_favorite ? -1 : 0))
      .forEach(({ url, name, price, toxicity, sun, water, staff_favorite }) => {
        const el = `
          <div class="plant-card ${staff_favorite ? "favorite" : ""}">
            <div class="card-header ${staff_favorite ? "favorite" : ""}">
              <img src="${url}" alt="${name}" />
              ${
                staff_favorite
                  ? "<span class='favorite-badge'>✨ Staff favorite</span>"
                  : ""
              }
            </div>
            <div class="card-details ${staff_favorite ? "favorite" : ""}">
              <p class="title">${name}</p>
              <div class="details">
                <p>$${price}</p>
                <div class="attributes">
                  ${this.getToxicAttribute(toxicity)}
                  ${this.getSunAttribute(sun)}
                  ${this.getWaterAttribute(water)}
                </div>
              </div>
            </div>
          </div>`;
        results += el;
      });

    s.resultContainer.style.setProperty("--total", data.length);

    s.resultContainer.innerHTML = `
      <div class="fullfiled-result">
        <img src="${require("../images/illustrations/pick.png")}" alt="Pick" />
        <h2>Our picks for you</h2>
        <div class="result-plants">
          ${results}
        </div>
        <a href="#filters" class="back-to-top">
          <img src="${require("../images/icons/arrow-up.svg")}"/>
          <p>back to the top</p>
        </a>
      </div>`;
  },
};

module.exports = ResultsWidget;
