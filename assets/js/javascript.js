let basketData = [];

readData();

const url = "https://dummyjson.com/products/search?q=phone";
getProduct(url);

function getProduct(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok)
        throw new Error(
          `HTTP error: ${response.status} - ${response.statusText}`
        );
      return response.json();
    })
    .then((data) => showProduct(data.products))
    .catch((error) => console.error("Fetching products failed:", error));
}

function showProduct(products) {
  const container = document.createElement("div");
  document.body.append(container);

  let myHtml = "";
  products.forEach((myProduct) => {
    myHtml += `
<figure>
      <img src="${myProduct.thumbnail}" alt="${myProduct.title}">
      <figcaption>
        <header><h3>${myProduct.title}</h3></header>
        <p>${myProduct.price}$</p>
        <p>${myProduct.description}</p>
        <button onclick="buyNowCallBack(${myProduct.id})">Buy now</button>
      </figcaption>
    </figure>
    `;
  });

  container.innerHTML = myHtml;
}

function buyNowCallBack(myProductId) {
  let itemFound = false;

  basketData.forEach((item) => {
    if (item.id === myProductId) {
      item.amount += 1;
      itemFound = true;
    }
  });

  if (!itemFound) {
    basketData.push({ id: myProductId, amount: 1 });
  }

  saveData();
  console.log("callBack complete");
}

function saveData() {
  let mySerializedData = JSON.stringify(basketData);
  localStorage.setItem("basketCase", mySerializedData);
}

function readData() {
  let myBasketString = localStorage.getItem("basketCase");
  if (myBasketString) {
    basketData = JSON.parse(myBasketString);
  } else {
    basketData = [];
  }
}
