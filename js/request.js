const results = require("./results");

let s;

const ResultsWidget = {
  settings: {
    baseUrl: "https://front-br-challenges.web.app/api/v2/green-thumb",
    data: {
      sun: null,
      water: null,
      pets: null,
    },
  },
  init: function () {
    s = this.settings;
    results.init();
  },
  setData: function ({ sun, water, pets } = {}) {
    s.data = {
      sun: sun ?? s.data.sun,
      water: water ?? s.data.water,
      pets: pets ?? s.data.pets,
    };
  },
  getData: function () {
    return s.data;
  },
  getResults: function () {
    results.showLoadingModal(true);
    const url = `${s.baseUrl}?sun=${s.data.sun}&water=${s.data.water}&pets=${s.data.pets}`;
    fetch(url).then((response) => {
      results.showLoadingModal(false);
      if (response.ok) {
        response.json().then((json) => {
          results.renderResults(json);
          var ele = document.getElementById("results");
          window.scrollTo(ele.offsetLeft, ele.offsetTop);
        });
      } else {
        results.handleEmptyResults();
      }
    });
  },
};

module.exports = ResultsWidget;
