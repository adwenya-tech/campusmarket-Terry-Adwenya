// filters the product catalog by search text and category, no page reload
function filterProducts() {
  var searchValue = document.getElementById('search-input').value.toLowerCase();
  var category = document.getElementById('category-select').value;
  var cards = document.querySelectorAll('.product-card');

  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var name = card.querySelector('.product-name').textContent.toLowerCase();
    var desc = card.querySelector('.product-desc').textContent.toLowerCase();
    var cardCategory = card.getAttribute('data-category');

    var matchesText = name.indexOf(searchValue) !== -1 || desc.indexOf(searchValue) !== -1;
    var matchesCategory;

    if (category === 'all') {
      matchesCategory = true;
    } else {
      matchesCategory = cardCategory === category;
    }

    if (matchesText && matchesCategory) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  }
}

// recalculates one product's line total when its quantity changes
function updateLineTotal(id, price) {
  var qtyInput = document.getElementById('qty-' + id);
  var qty = parseInt(qtyInput.value, 10);

  if (isNaN(qty) || qty < 0) {
    qty = 0;
  }

  var lineTotal = qty * price;
  document.getElementById('line-total-' + id).textContent = 'KSh ' + lineTotal.toLocaleString();

  updateGrandTotal();
}

// sums every line total on the page into one running cart total
function updateGrandTotal() {
  var lineTotals = document.querySelectorAll('.line-total');
  var total = 0;

  for (var i = 0; i < lineTotals.length; i++) {
    var text = lineTotals[i].textContent.replace('KSh ', '').replace(/,/g, '');
    var value = parseInt(text, 10);

    if (!isNaN(value)) {
      total = total + value;
    }
  }

  document.getElementById('grand-total').textContent = 'KSh ' + total.toLocaleString();
}