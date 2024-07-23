const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.querySelector(".cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");

let cart = [];

// Abrir o modal do carrinho
cartBtn.addEventListener("click", function() {
    cartModal.style.display = "flex";
    updateCartModal();
});

// Fechar o modal quando clicar fora
cartModal.addEventListener("click", function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

// Fechar Modal quando clicar no botão fechar
closeModalBtn.addEventListener("click", function() {
    cartModal.style.display = "none";
});

menu.addEventListener("click", function(event) {
    let parentButton = event.target.closest(".add-to-cart-btn");
    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        console.log(`Adicionando ao carrinho: ${name}, R$ ${price}`);
        addToCart(name, price);
    }
});

function addToCart(name, price) {
    console.log(`Função addToCart chamada com ${name} e ${price}`);
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }
    updateCartCounter();
    updateCartModal(); // Adicione esta linha para garantir que o modal é atualizado após adicionar itens.
}


// Atualiza o carrinho
function updateCartModal() {
    cartItemContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");

        cartItemElement.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <div>
                    <p>${item.name}</p>
                    <p>Quantidade: ${item.quantity}</p>
                    <p>R$ ${item.price}</p>
                </div>
                <div>
                    <button class="bg-red-500 text-white px-2 py-1 rounded remove-item-btn" data-name="${item.name}">
                        Remover
                    </button>
                </div>
            </div>
        `;
        cartItemContainer.appendChild(cartItemElement);

        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);

    // Adiciona evento para remover item
    const removeButtons = document.querySelectorAll(".remove-item-btn");
    removeButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            const itemName = event.target.getAttribute("data-name");
            removeFromCart(itemName);
        });
    });
}

// Função para remover item do carrinho
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartCounter();
    updateCartModal();
}

// Atualiza o contador do carrinho
function updateCartCounter() {
    cartCounter.textContent = cart.length;
}
