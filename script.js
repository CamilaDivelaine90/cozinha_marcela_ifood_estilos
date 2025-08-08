let cart = [];

function addToCart(name, price, description) {
  let precoNumber = parseFloat(price.toString().replace(',', '.'));
  let existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
    existingItem.totalPrice = existingItem.quantity * precoNumber;
  } else {
    cart.push({
      name: name,
      description: description,
      price: precoNumber,
      quantity: 1,
      totalPrice: precoNumber
    });
  }

  updateCart();
}

function updateCart() {
  let cartItems = document.getElementById('cart-items');
  let total = 0;
  cartItems.innerHTML = '';

  cart.forEach(item => {
    let li = document.createElement('li');
    li.textContent = `${item.name} (${item.quantity}x) - R$ ${item.totalPrice.toFixed(2).replace('.', ',')}`;
    cartItems.appendChild(li);
    total += item.totalPrice;
  });

  document.getElementById('total').textContent = total.toFixed(2).replace('.', ',');
}

function finalizarPedido() {
  let endereco = document.getElementById('endereco').value;
  let mensagem = '🍲 *Meu Pedido* 🍲\n\n';

  cart.forEach(item => {
    mensagem += `${item.quantity}x ${item.name} - R$ ${item.totalPrice.toFixed(2).replace('.', ',')}\n`;
  });

  mensagem += `\n💰 *Total:* R$ ${document.getElementById('total').textContent}`;
  mensagem += `\n📍 *Endereço:* ${endereco}`;

  let numeroWhatsApp = '5599999999999'; // coloque seu número aqui
  let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, '_blank');
}
