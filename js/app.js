"use strict";


let requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

onload = async () => {
  const response = await fetch("https://yearupdemo.azurewebsites.net/api/users", requestOptions);
  const users = await response.json();
  console.log(users);

  let evee = document.getElementById('evee');
  let eveeUsers = users.filter(user => user.Groupname == 'Eveelutions');
  console.log(eveeUsers);

  let eveeHTML = '';
  eveeUsers.forEach(user => {
    eveeHTML += `<div class="tm-list-item">          
                  <img src="${user.imageURL}" alt="Image" class="tm-list-item-img">
                  <div class="tm-black-bg tm-list-item-text">
                    <h3 class="tm-list-item-name">${user.Name}<a href="${user.GitHubProfile}" target="_blank" class="tm-list-item-price">github</a></h3>
                    <p class="tm-list-item-description"><strong>Email:</strong> ${user.Email}</p>
                    <p class="tm-list-item-description"><strong>NickName:</strong> ${user.CodingNickname}</p>
                    ${user.linkedin ? `<p class="tm-list-item-description"><strong>Linkedin:</strong> ${user.linkedin}</p>` : ""}
                  </div>
                </div> `
  });

  evee.innerHTML = eveeHTML;

  //mia
  let byteBuddies = document.getElementById('byteBuddies');
  let byteBuddiesUsers = users.filter(user => user.Groupname == 'ByteBuddies');
  console.log(byteBuddiesUsers);

  let byteBuddiesHTML = '';
  byteBuddiesUsers.forEach(user => {
    byteBuddiesHTML += `
              <div class="tm-list-item">          
                  <img src="${user.imageURL}" alt="Image" class="tm-list-item-img">
                  <div class="tm-black-bg tm-list-item-text">
                    <h3 class="tm-list-item-name">${user.Name}<a href="${user.GitHubProfile}" target="_blank" class="tm-list-item-price">github</a></h3>
                    <p class="tm-list-item-description"><strong>Email:</strong> ${user.Email}</p>
                    <p class="tm-list-item-description"><strong>NickName:</strong> ${user.CodingNickname}</p>
                    ${user.linkedin ? `<p class="tm-list-item-description"><strong>Linkedin:</strong> ${user.linkedin}</p>` : ""}
                  </div>
                </div> 
    `
  });
  byteBuddies.innerHTML = byteBuddiesHTML;

  // pavlo
  let ctrlAltDefeatMessage = document.getElementById('ctrl-alt-defeat');
  let ctrlUsers = users.filter(user => user.Groupname == 'Control Alt Defeat');
  console.log(ctrlUsers);

  let ctrlHTML = "";
  ctrlUsers.forEach(user => {
    ctrlHTML +=
      `
      <div class="tm-list-item">          
      <img src="${user.imageURL}" alt="Image" class="tm-list-item-img">
      <div class="tm-black-bg tm-list-item-text">
        <h3 class="tm-list-item-name">${user.Name}<a href="${user.GitHubProfile}" target="_blank" class="tm-list-item-price">github</a></h3>
        <p class="tm-list-item-description"><strong>Email:</strong> ${user.Email}</p>
        <p class="tm-list-item-description"><strong>NickName:</strong> ${user.CodingNickname}</p>
        ${user.linkedin ? `<p class="tm-list-item-description"><strong>Linkedin:</strong> ${user.linkedin}</p>` : ""}
      </div>
    </div> 
    `
  });

  ctrlAltDefeatMessage.innerHTML = ctrlHTML;

  let ctrlFreaks = document.getElementById('ctrl-freaks');
  let ctrlFreaksUsers = users.filter(user => user.Groupname == "CTRL Freaks");
  console.log(ctrlFreaksUsers);

  let freaksHTML = "";

  ctrlFreaksUsers.forEach(user => {
    freaksHTML += `
      <div class="tm-list-item">          
      <img src="${user.imageURL}" alt="Image" class="tm-list-item-img">
      <div class="tm-black-bg tm-list-item-text">
        <h3 class="tm-list-item-name">${user.Name}<a href="${user.GitHubProfile}" target="_blank" class="tm-list-item-price">github</a></h3>
        <p class="tm-list-item-description"><strong>Email:</strong> ${user.Email}</p>
        <p class="tm-list-item-description"><strong>NickName:</strong> ${user.CodingNickname}</p>
        ${user.linkedin ? `<p class="tm-list-item-description"><strong>Linkedin:</strong> ${user.linkedin}</p>` : ""}
      </div>
    </div> 
    `
  })

  ctrlFreaks.innerHTML = freaksHTML;


  // let userList = document.getElementById('userlist');

  // let displayAllUsers = "";

  // users.forEach(user => {
  //   displayAllUsers += `
  //   <div class="tm-black-bg tm-special-item">
  //   <div style="display: flex; justify-content: center;">
  //   <img src="${user.imageURL}" alt="Image" style="height: 200px; width: 200px;">
  //   </div>
  //   <div class="tm-special-item-description">
  //     <h3 class="tm-text-primary tm-list-item-name">${user.Name}<a href="${user.GitHubProfile}" target="_blank" class="tm-list-item-price">github</a></h3>
  //       <p class="tm-list-item-description"><strong>Email:</strong> ${user.Email}</p>
  //       <p class="tm-list-item-description"><strong>NickName:</strong> ${user.CodingNickname}</p>
  //   </div>
  //   </div>
  //   `
  // })
  // userList.innerHTML = displayAllUsers;

  if (!localStorage.productId) {
    localStorage.productId = 8002270014901;
  }
  let productId = localStorage.productId;
  let idInput = document.getElementById('idInput');
  idInput.value = productId;

  await fetchData(`product/${productId}`);

  document.getElementById('searchButton').addEventListener('click', async () => {
    idInput = document.getElementById('idInput').value;
    localStorage.productId = idInput;
    await fetchData(`product/${localStorage.productId}`);
  });
}

// from food
const baseURL = 'https://world.openfoodfacts.org/api/v2/';

async function fetchData(endpointResource) {
  if (!endpointResource) {
    console.error('Endpoint resource is not provided');
    return;
  }

  try {
    const response = await fetch(baseURL + endpointResource);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    displayData(data.product);
    console.log(data.product);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

function displayData(data) {
  const productImage = document.getElementById('productImage');
  const productName = document.getElementById('productName');

  const productDetails = document.getElementById('productDetails');
  let productHTML = '';

  if (data.image_url) {
    productImage.src = data.image_url;
    productImage.alt = 'Product Image';
  } else {
    productImage.src = `https://placehold.co/300`;
    productImage.alt = 'Placeholder Image';
  }

  productName.textContent = '';
  if (data.product_name) {
    productName.textContent += `${data.product_name}`;
  }
  if (data.brands) {
    productName.textContent += `- ${data.brands}`;
  }
  if (data.quantity) {
    productName.textContent += `- ${data.quantity}`;
  }

  if (data.ingredients) {
    productHTML += `<li class="list-group-item">
                  <strong>Ingredients: </strong> ${data.ingredients_text}
                </li>`;
  }

  if (data.allergens) {
    productHTML += `<li class="list-group-item">
                  <strong>Allergens: </strong> ${data.allergens
        .split(',')
        .map((allergy) => allergy.substring(3))
        .join(', ')}
                </li>`;
  }

  if (data.countries) {
    productHTML += `<li class="list-group-item">
                  <strong>Countries Sold: </strong> ${data.countries
        .split(',')
        .join(', ')}
                </li>`;
  }

  if (data.countries) {
    productHTML += `<li class="list-group-item">
                  <strong>Stores: </strong> ${data.stores.split(',').join(', ')}
                </li>`;
  }

  productDetails.innerHTML = productHTML;
}


