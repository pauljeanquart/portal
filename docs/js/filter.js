var currentCardFilters = [];

(() => {
  initFilters();
  document.querySelector("input[name='card_filter_query'").focus();
})();

function initFilters() {

  document.querySelector("input[name='card_filter_query'").oninput = function () {
    var s = document.querySelector("input[name='card_filter_query'").value;
    currentCardFilters = s.match(/(?:[^\s"]+|"[^"]*")+/g) || []
    //https://stackoverflow.com/a/16261693 - split on spaces not in quotes
    // remove outer quotes from multiple word string search
    currentCardFilters = currentCardFilters.map(filter => {
      if (filter.indexOf(":") == -1) {
        if (filter.at(0) === '"' && filter.at(-1) === '"') {
          filter = filter.slice(1, -1);
        }
      }
      return filter;
    });

    applyFilters();
  };

  filterClickEvent();

  var hash = location.hash;
  if (hash) {
    hash = unescape(hash.slice(1))
    var element = document.querySelector("input[name='card_filter_query'");
    element.value = hash;
    // Create a new 'change' event
    var event = new Event('input');

    // Dispatch it.
    element.dispatchEvent(event);
  }

};

function filterClickEvent(parentSelector = "") {
  var filterButtons = document.querySelectorAll(parentSelector + ' [data-card-filter]'),
    l = filterButtons.length;

  while (l--) {
    if (filterButtons[l].classList.contains("no-filter-event"))
      continue;
    filterButtons[l].addEventListener('click', handler, false);
  }
}


function handler(e) {
  event.stopPropagation();
  let filter = this.getAttribute('data-card-filter');
  let alt = '';
  let andOr = ' ';

  if (e.altKey) {
    alt = "-";
  }

  if (currentCardFilters.indexOf(filter) == -1 && currentCardFilters.indexOf("-" + filter) == -1) {
    if (e.shiftKey) {
      let lastFilter = currentCardFilters.pop();
      currentCardFilters.push(lastFilter + '|' + filter)
    } else {
      currentCardFilters.push(alt + filter);
    }
  } else {
    var index = currentCardFilters.indexOf(filter);
    if (index == -1) {
      index = currentCardFilters.indexOf("-" + filter);
    }
    if (index !== -1) {
      currentCardFilters.splice(index, 1);
      if (alt) {
        currentCardFilters.push(alt + filter);
      }
    }
  }

  document.querySelector("input[name='card_filter_query'").value = currentCardFilters.join(' ');
  applyFilters();
  return false;
}

function applyFilters() {
  document.querySelectorAll("li.portal-filter-item").forEach(function (article, index) {
    var showArticle = true;
    currentCardFilters.forEach(function (currentCardFilter, index) {
      showArticle = showArticle && applyFilter(article, currentCardFilter);
    });

    if (currentCardFilters.length == 0 || showArticle) {
      article.classList.remove("d-none");
    } else {
      article.classList.add("d-none");
    }
  });
  location.hash = escape(document.querySelector("input[name='card_filter_query'").value);
}

function clearFilters() {
  document.querySelector("input[name='card_filter_query']").value = "";
  document.querySelector("input[name='card_filter_query']").oninput();
}

function applyFilter(article, currentCardFilterWord) {
  var showToggle = true;
  var showArticle = false;
  if (currentCardFilterWord.startsWith("-")) {
    showToggle = false;
    currentCardFilterWord = currentCardFilterWord.substring(1);
  }
  currentCardFilterWord.split("|").forEach(function (currentCardFilter) {
    if (currentCardFilter.indexOf(":") == -1 &&
      article.innerText.toLowerCase().indexOf(currentCardFilter.toLowerCase()) != -1) {
      showArticle = true;
    } else if (currentCardFilter.split(':')[0] === "no" &&
      !article.querySelector("[data-card-filter='" + currentCardFilter.split(':')[1] + ":']")) {
      showArticle = true;
    } else if (currentCardFilter.split(':')[0] === "has" &&
      article.querySelector("[data-card-filter='" + currentCardFilter.split(':')[1] + ":']")) {
      showArticle = true;
    } else if (currentCardFilter.indexOf(":") != -1 && currentCardFilter.split(':')[1].slice(0, 1) === ">" &&
      article.querySelector("[data-card-filter='" + currentCardFilter.split(':')[0] + ":']")) {
      let criteria = currentCardFilter.split(':')[1].slice(1);
      let val = article.querySelector("[data-card-filter='" + currentCardFilter.split(':')[0] + ":']")
        .getAttribute("data-card-filter").split(':')[1];
      if (!isNaN(criteria) && !isNaN(val) &&
        (Number(val) > Number(criteria))) {
        showArticle = true;
      } else if (isNaN(criteria) && isNaN(val) &&
        val > criteria) {
        showArticle = true;
      }
    } else if (currentCardFilter.indexOf(":") != -1 && currentCardFilter.split(':')[1].slice(0, 1) === "<" &&
      article.querySelector("[data-card-filter='" + currentCardFilter.split(':')[0] + ":']")) {
      let criteria = currentCardFilter.split(':')[1].slice(1);
      let val = article.querySelector("[data-card-filter='" + currentCardFilter.split(':')[0] + ":']")
        .getAttribute("data-card-filter").split(':')[1];
      if (!isNaN(criteria) && !isNaN(val) &&
        (Number(val) < Number(criteria))) {
        showArticle = true;
      } else if (isNaN(criteria) && isNaN(val) &&
        val < criteria) {
        showArticle = true;
      }
    } else if (article.querySelector("[data-card-filter='" + currentCardFilter + "']")) {
      showArticle = true;
    } else {
      currentCardFilter = currentCardFilter.toLowerCase();
      article.querySelectorAll("[data-card-filter]").forEach(e => {
        let val = e.getAttribute("data-card-filter").toLowerCase();
        // if (val.startsWith(currentCardFilter.split(':')[0] + ":") &&  // allows for tag filter to apply to partial values
        //   val.indexOf(currentCardFilter.split(':')[1]) > -1) {
        //   showArticle = true;
        // }
      });
    }
  });
  return (showArticle && showToggle) || (!showArticle && !showToggle);
}