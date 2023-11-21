import { auth, onAuthStateChanged } from "./src/config/firebase.js";
import { getAds } from './src/config/firebase.js'

onAuthStateChanged(auth, (user) => {
  if (user) {
    const emailElement = document.getElementById('email')
    emailElement.innerHTML = user.email
    renderAds()
  } else {
    location.href = './login/login.html'
  }
});

async function renderAds() {
  const ads = await getAds();
  const container = document.getElementById('container');

  for (var i = 0; i < ads.length; i++) {
    const ad = ads[i];

    const card = document.createElement('div');
    card.className = 'card';
    card.style = 'width: 18rem;';

    card.onclick = function () {
      location.href = './Details/index.html?adId=' + ad.id;
    };

    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = ad.image;
    img.alt = 'Card Image';

    const titleCard = document.createElement('div');
    titleCard.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.innerHTML = ad.title;

    const amount = document.createElement('p');
    amount.className = 'card-text';
    amount.innerHTML = `Rs. ${ad.amount}`;

    titleCard.append(title);
    titleCard.append(amount);

    card.append(img);
    card.append(titleCard);

    container.append(card);
  }
}
