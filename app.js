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

// registration form validation and show/hide password toggle
// guarded so this only runs on pages that actually have the form
document.addEventListener('DOMContentLoaded', function () {
 
  var form = document.getElementById('register-form');
  if (!form) {
    return;
  }
 
  var fullnameInput = document.getElementById('fullname');
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var confirmInput = document.getElementById('confirm-password');
  var showPasswordCheckbox = document.getElementById('show-password');
  var successMessage = document.getElementById('form-success');
 
  function showError(id, message) {
    document.getElementById(id).textContent = message;
  }
 
  function clearError(id) {
    document.getElementById(id).textContent = '';
  }
 
  // validates the form and returns true only if every check passes
  function validateForm() {
    var isValid = true;
 
    // 1. required field check
    if (fullnameInput.value.trim() === '') {
      showError('fullname-error', 'full name is required.');
      isValid = false;
    } else {
      clearError('fullname-error');
    }
 
    // 2. format check: basic email pattern
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showError('email-error', 'enter a valid email address.');
      isValid = false;
    } else {
      clearError('email-error');
    }
 
    // 3. custom rule: password must meet a minimum length
    if (passwordInput.value.length < 6) {
      showError('password-error', 'password must be at least 6 characters.');
      isValid = false;
    } else {
      clearError('password-error');
    }
 
    // 4. custom rule: confirmation must match the password
    if (confirmInput.value === '' || confirmInput.value !== passwordInput.value) {
      showError('confirm-password-error', 'passwords do not match.');
      isValid = false;
    } else {
      clearError('confirm-password-error');
    }
 
    return isValid;
  }
 
  form.addEventListener('submit', function (event) {
    event.preventDefault();
 
    if (validateForm()) {
      successMessage.textContent = 'account created! welcome to campus market.';
      successMessage.style.display = 'block';
      form.reset();
    } else {
      successMessage.style.display = 'none';
    }
  });
 
  // interactive UI element: show/hide password toggle
  showPasswordCheckbox.addEventListener('change', function () {
    var type = showPasswordCheckbox.checked ? 'text' : 'password';
    passwordInput.type = type;
    confirmInput.type = type;
  });
 
});
 