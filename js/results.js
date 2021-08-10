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
    s.loadingModal.innerHTML = `<div class="loading-modal__ring"><div></div><div></div><div></div><div></div></div>`;
  },
  handleEmptyResults: function () {
    s.resultContainer.innerHTML = `<div class="result__empty-result">
        <div class="text-container">
          <h2 class="title">No results yet...</h2>
          <h3 class="subtitle">
            Use the filters above to find the plant that best fits your
            environment :)
          </h3>
        </div>
        <div class="image_no-result">
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
          <div class="card ${staff_favorite ? "card_favorite" : ""}">
            <div class="card__header ${
              staff_favorite ? "card__header_favorite" : ""
            }">
              <img class="card__image ${
                staff_favorite ? "card__image_favorite" : ""
              }" src="${url}" alt="${name}" />
              ${
                staff_favorite
                  ? "<span class='card__favorite-badge'>✨ Staff favorite</span>"
                  : ""
              }
            </div>
            <div class="card__details-container ${
              staff_favorite ? "card__details-container_favorite" : ""
            }">
              <p class="card__text ${
                staff_favorite ? "card__text_favorite" : ""
              }">${name}</p>
              <div class="card__details ${
                staff_favorite ? "card__details_favorite" : ""
              }">
                <p class="card__text card__text_small ${
                  staff_favorite ? "card__text_favorite" : ""
                }">$${price}</p>
                <div class="card__attributes ${
                  staff_favorite ? "card__attributes_favorite" : ""
                }">
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
      <div class="result__fullfiled-result">
        <img class="result__pick-image" src="${require("../images/illustrations/pick.png")}" alt="Pick" />
        <h2 class="result__title">Our picks for you</h2>
        <div class="result__plants">
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
