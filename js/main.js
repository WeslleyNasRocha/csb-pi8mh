const select = require("./select");
const request = require("./request");

(function () {
  request.init();
  select.init({
    onSelect: (data) => {
      request.setData({ [data.id]: data.value });
      const req = request.getData();
      if (req.sun && req.water && req.pets) {
        request.getResults();
      }
    },
  });
})();
