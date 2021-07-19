let s;

const SelectsWidget = {
  settings: {
    selectorWrappers: document.querySelectorAll(".select-wrapper"),
    selectors: document.querySelectorAll(".select"),
    options: document.querySelectorAll(".option"),
  },
  init: function ({ onSelect }) {
    s = this.settings;
    this.bindUiActions({ onSelect });
  },
  bindUiActions: function ({ onSelect }) {
    s.selectorWrappers.forEach(function (el) {
      el.addEventListener("click", function () {
        this.querySelector(".select").classList.toggle("open");
      });
    });
    for (const option of s.options) {
      option.addEventListener("click", function () {
        if (!this.classList.contains("selected")) {
          if (this.parentNode.querySelector(".option.selected")) {
            this.parentNode
              .querySelector(".option.selected")
              .classList.remove("selected");
          }
          this.classList.add("selected");
          this.closest(".select").querySelector(
            ".select__trigger span"
          ).textContent = this.textContent;
          if (onSelect) {
            onSelect({
              id: this.closest(".select").id,
              value: this.dataset.value,
            });
          }
        }
      });
    }

    window.addEventListener("click", function (e) {
      s.selectors.forEach((select) => {
        if (!select.contains(e.target)) {
          select.classList.remove("open");
        }
      });
    });
  },
};

module.exports = SelectsWidget;
