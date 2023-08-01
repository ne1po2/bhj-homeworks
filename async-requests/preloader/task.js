function showLoader() {
  const loaderElement = document.getElementById('loader');
  loaderElement.classList.add('loader_active');
}

function hideLoader() {
  const loaderElement = document.getElementById('loader');
  loaderElement.classList.remove('loader_active');
}

function displayCurrencyData(data) {
  const itemsElement = document.getElementById('items');
  itemsElement.innerHTML = '';

  for (const currencyCode in data.Valute) {
    const currencyData = data.Valute[currencyCode];
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');

    const codeElement = document.createElement('div');
    codeElement.classList.add('item__code');
    codeElement.textContent = currencyData.CharCode;
    itemElement.appendChild(codeElement);

    const valueElement = document.createElement('div');
    valueElement.classList.add('item__value');
    valueElement.textContent = currencyData.Value;
    itemElement.appendChild(valueElement);

    const currencyElement = document.createElement('div');
    currencyElement.classList.add('item__currency');
    currencyElement.textContent = 'руб.';
    itemElement.appendChild(currencyElement);

    itemsElement.appendChild(itemElement);
  }
}

function fetchCurrencyData() {
  showLoader();
  fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses')
    .then((response) => response.json())
    .then((data) => {
      hideLoader();
      displayCurrencyData(data.response);
    })
    .catch((error) => {
      hideLoader();
      console.error('Error fetching currency data:', error);
    });
}

fetchCurrencyData();