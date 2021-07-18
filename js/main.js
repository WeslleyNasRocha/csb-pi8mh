const select = require("./select");
const results = require("./results");

const data = {
  sun: null,
  water: null,
  pets: null,
};
const baseUrl = "https://front-br-challenges.web.app/api/v2/green-thumb";

const makeRequest = () => {
  results.loadingResults();
  const url = `${baseUrl}?sun=${data.sun}&water=${data.water}&pets=${data.pets}`;
  fetch(url).then((response) => {
    results.removeLoadingResults();
    if (response.ok) {
      response.json().then((json) => {
        results.renderResults(json);
        var ele = document.getElementById("results");
        window.scrollTo(ele.offsetLeft, ele.offsetTop);
      });
    } else {
      results.renderEmptyResults();
    }
  });
};

select.initiateSelectComponent({
  onSelect: (sel) => {
    console.log(sel);
    data[sel.id] = sel.value;
    if (data.sun && data.water && data.pets) {
      makeRequest();
    }
  },
});

results.renderEmptyResults();
