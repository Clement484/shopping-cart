const addButtons = document.querySelectorAll('.add-button');

addButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Find the parent of the button (the div that wraps the product)
    const productDetails = button.closest('.collection-item');
    
    const qtySelect = productDetails.querySelector('.product-quantity');

    const productName = productDetails.querySelector('.item-name').textContent;
    const productImage = productDetails.querySelector('.item-image').src;
    let productPrice = parseFloat(productDetails.querySelector('.real-price').textContent);
    productPrice = productPrice.toFixed(2);
    const selectedQty = parseInt(productDetails.querySelector('.product-quantity').value);
    
    const totalPrice = (productPrice * selectedQty).toFixed(2);
    
    // alert(`You added ${selectedQty} of "${productName}" to the cart!. Total of ${totalPrice} items`);

    const li = document.createElement('li');
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.src = productImage;
    img.width = '50';
    const span = document.createElement('span');
    span.className = 'item-name';
    span.textContent = productName;
    const priceSpan = document.createElement('span');
    priceSpan.className = 'item-price';
    priceSpan.textContent = `${productPrice}`;
    const quantitySpan = document.createElement('span');
    quantitySpan.className = 'item-quantity';
    quantitySpan.textContent = `${selectedQty}`;
    const totalSpan = document.createElement('span');
    totalSpan.className = 'item-total';
    totalSpan.textContent = `${totalPrice}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', function() {
      li.remove();
      updateTotalSum();
    });
    div.appendChild(img);
    div.appendChild(span);
    li.appendChild(div);
    li.appendChild(priceSpan);
    li.appendChild(quantitySpan);
    li.appendChild(totalSpan);
    li.appendChild(removeButton);
    document.querySelector('.cart-items').appendChild(li);

    updateTotalSum();

  });


});

function updateTotalSum() {
    const cartItems = document.querySelectorAll('.cart-items li');
    
    let totalSum = 0;
    let totalQuantity = 0;
  
    cartItems.forEach(item => {
      const itemTotal = parseFloat(item.querySelector('.item-total').textContent);
      const itemQuantity = parseInt(item.querySelector('.item-quantity').textContent);

      totalSum += itemTotal;
      totalQuantity += itemQuantity;
    });
  
    const totalBeforeTax = document.querySelector('.total-before-tax');
    totalBeforeTax.textContent = `${totalSum.toFixed(2)}`;

    let eLevy = document.querySelector('.e-levy');
    eLevy.textContent = `${(totalSum * 0.1).toFixed(2)}`;

    const totalAmount = document.querySelector('.total-amount');
    totalAmount.textContent = `GHC ${(totalSum + parseFloat(eLevy.textContent)).toFixed(2)}`;

    const totalQuantityDisplay = document.querySelectorAll('.total-quantity');

  if (totalQuantityDisplay) {
    totalQuantityDisplay.forEach(display => {
          display.textContent = `${totalQuantity}`;
        });
  }
  }