let cart = [];

function addToCart(name, price, description) {
  let precoNumber = parseFloat(price.toString().replace(',', '.')); // Trata preço com vírgula

  // Verifica se o item já existe no carrinho
  let existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    // Se o item já existir, aumenta a quantidade e atualiza o total
    existingItem.quantity++;
    existingItem.totalPrice = existingItem.quantity * precoNumber;
  } else {
    // Caso o item não exista, adiciona ao carrinho
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

function alterarQuantidade(name, change) {
  let item = cart.find(i => i.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      // Remove item do carrinho se a quantidade for 0 ou negativa
      cart = cart.filter(i => i.name !== name);
    } else {
      // Atualiza o preço total se a quantidade mudar
      item.totalPrice = item.quantity * item.price;
    }
    updateCart();
  }
}

function finalizarPedido() {
  if (cart.length === 0) {
    alert("🛒 Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.");
    return;
  }

  let endereco = document.getElementById('endereco').value;
  if (!endereco.trim()) {
    alert("📍 Por favor, insira o endereço de entrega.");
    return;
  }

  let mensagem = '🍲 *Meu Pedido* 🍲\n\n';
  cart.forEach(item => {
    mensagem += `${item.quantity}x ${item.name} - R$ ${item.totalPrice.toFixed(2).replace('.', ',')}\n`;
  });

  mensagem += `\n💰 *Total:* R$ ${document.getElementById('total').textContent}`;
  mensagem += `\n📍 *Endereço:* ${endereco}`;

  let numeroWhatsApp = '5511942018395'; // Número do WhatsApp
  let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, '_blank');
}
