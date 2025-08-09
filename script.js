let cart = [];

// Adicionar item ao carrinho
function addToCart(name, price, description) {
  let precoNumber = parseFloat(price.toString().replace(/\./g, '').replace(',', '.')); 

  let existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
    existingItem.totalPrice = existingItem.quantity * precoNumber;
  } else {
    cart.push({
      name,
      description,
      price: precoNumber,
      quantity: 1,
      totalPrice: precoNumber
    });
  }

  updateCart();
}

// Atualizar lista e total do carrinho
function updateCart() {
  let cartItems = document.getElementById('cart-items');
  let total = 0;
  cartItems.innerHTML = '';

  cart.forEach(item => {
    let li = document.createElement('li');
    li.innerHTML = `
      ${item.name} (${item.quantity}x) - R$ ${item.totalPrice.toFixed(2).replace('.', ',')}
      <button onclick="alterarQuantidade('${item.name}', 1)">+</button>
      <button onclick="alterarQuantidade('${item.name}', -1)">-</button>
    `;
    cartItems.appendChild(li);
    total += item.totalPrice;
  });

  document.getElementById('total').textContent = total.toFixed(2).replace('.', ',');
}

// Alterar quantidade de um item
function alterarQuantidade(name, change) {
  let item = cart.find(i => i.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.name !== name);
    } else {
      item.totalPrice = item.quantity * item.price;
    }
    updateCart();
  }
}

// Gerar mensagem do pedido
function gerarMensagemPedido() {
  let endereco = document.getElementById('endereco')?.value || '';
  let mensagem = "🍽️ *Pedido Cozinha da Marcela*%0A%0A";
  let total = 0;

  cart.forEach(item => {
    mensagem += `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}%0A`;
    total += item.price * item.quantity;
  });

  mensagem += `%0A💰 *Total:* R$ ${total.toFixed(2).replace('.', ',')}`;
  if (endereco.trim()
