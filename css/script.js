// メニューアイコンの表示・非表示
const menuIcon = document.getElementById('menu-icon');
const menu = document.getElementById('menu');
const closeBtn = document.getElementById('close-btn');

// メニューアイコンをクリックしたときの動作
menuIcon && menuIcon.addEventListener('click', () => {
  menu.classList.add('active'); // メニューを表示
});

// ×ボタンをクリックしたときの動作
closeBtn && closeBtn.addEventListener('click', (e) => {
  e.preventDefault(); // デフォルトのリンク動作を無効化
  menu.classList.remove('active'); // メニューを非表示
});

// スライドショー
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slide');
  let currentIndex = 0;

  // 最初のスライドを表示
  if (slides.length > 0) {
    slides[currentIndex].classList.add('active');
  }

  setInterval(() => {
    if (slides.length > 0) {
      slides[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add('active');
    }
  }, 5000); // 5秒ごとに切り替え
});

// カート機能
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// カートに商品を追加
function addToCart(itemName, price, imageUrl) {
  // カートのデータを localStorage に保存する例
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name: itemName, price: price, image: imageUrl });
  localStorage.setItem('cart', JSON.stringify(cart));

  alert(itemName + 'がカートに追加されました!');
}


//カートの中身の表示
document.addEventListener('DOMContentLoaded', function() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartContainer = document.getElementById('cart-container');

  if (cart.length > 0) {
      cart.forEach(item => {
          let itemDiv = document.createElement('div');
          itemDiv.classList.add('cart-item');
          
          let itemHTML = `
              <img src="${item.image}" alt="${item.name}">
              <span>${item.name}</span>
              <span>￥${item.price}</span>
          `;
          itemDiv.innerHTML = itemHTML;
          cartContainer.appendChild(itemDiv);
      });
  } else {
      cartContainer.innerHTML = 'カートにアイテムはありません。';
  }
});

// カートアイテムを表示
function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalContainer = document.getElementById('total-amount');
  let total = 0;

  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>カートが空です。</p>';
    totalContainer.textContent = '合計: ¥0';
    return;
  }

  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'order-item';

    // 商品画像
    const itemImage = document.createElement('img');
    itemImage.src = item.imageUrl;
    itemImage.alt = item.itemName;
    itemImage.className = 'cart-item-image';

    // 商品詳細
    const itemDetails = document.createElement('span');
    itemDetails.textContent = `${item.itemName} - ¥${item.price.toLocaleString()}`;

    // 削除ボタン
    const removeButton = document.createElement('button');
    removeButton.textContent = '削除';
    removeButton.onclick = () => removeItem(index);

    itemElement.appendChild(itemImage);
    itemElement.appendChild(itemDetails);
    itemElement.appendChild(removeButton);
    cartContainer.appendChild(itemElement);

    // 合計金額計算
    total += item.price;
  });

  // 合計金額を表示
  totalContainer.textContent = `合計: ¥${total.toLocaleString()}`;
}

// カートからアイテムを削除
function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// 注文を送信
function submitOrder() {
  const orderType = document.querySelector('input[name="dine_option"]:checked');

  if (!orderType) {
    alert('TO GOまたはEAT INを選択してください。');
    return;
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    alert('カートが空です。');
    return;
  }

  //localStorage の確認
  console.log(localStorage.getItem('cart'));


  alert(`注文が完了しました！\nタイプ: ${orderType.value}\nありがとうございます。`);
  localStorage.removeItem('cart');
  window.location.href = 'index.html';
}

// 初期表示
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('cart/index.html')) {
    renderCart();
  }
});
