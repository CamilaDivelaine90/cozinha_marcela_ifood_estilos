let cart = [];

function addToCart(item, price) {
  cart.push({ item, price });
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cart-items');
  const total = document.getElementById('total');
  list.innerHTML = '';
  let sum = 0;

  cart.forEach((entry) => {
    sum += entry.price;
    const li = document.createElement('li');
    li.textContent = `${entry.item} - R$ ${entry.price.toFixed(2)}`;
    list.appendChild(li);
  });

  total.textContent = sum.toFixed(2);
}

function finalizarPedido() {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  const endereco = document.getElementById('endereco').value.trim();
  if (!endereco) {
    alert('Por favor, digite o endereço de entrega.');
    return;
  }

  let mensagem = 'Olá, gostaria de fazer um pedido:%0A';
  cart.forEach((entry) => {
    mensagem += `- ${entry.item} (R$ ${entry.price.toFixed(2)})%0A`;
  });

  const total = cart.reduce((sum, entry) => sum + entry.price, 0);
  mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;
  mensagem += `%0A📍 Endereço: ${endereco}`;

  const numero = '5511942018395';
  const url = `https://wa.me/${numero}?text=${mensagem}`;
  window.open(url, '_blank');
}

