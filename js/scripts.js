let pokemonRepository = (function () {
  let pokemonList = [];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    )
      pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonListContainer = document.querySelector('.pokemon-list');

    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonListContainer.appendChild(listItem);

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (details) {
      let pokemonDetails = {
        name: pokemon.name,
        height: details.height,
        imgUrl: details.sprites.front_default
      };
      showModal(pokemonDetails);
    });
  }

  function LoadList() {
    return fetch('https://pokeapi.co/api/v2/pokemon/')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        return Promise.all(
          data.results.map(function (pokemon) {
            let newPokemon = {
              name: pokemon.name,
              detailsUrl: pokemon.url
            };
            add(newPokemon);
          })
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.height = details.height;
        return details;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function showModal(pokemon) {
    let modalContainer = document.querySelector('.modal');

    if (modalContainer === null) {
      modalContainer = document.createElement('div');
      modalContainer.classList.add('modal');
    } else {
      modalContainer.innerHTML = ''; // Clear existing content
    }

    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    let modalTitle = document.createElement('h2');
    modalTitle.innerText = pokemon.name;

    let modalBody = document.createElement('div');

    let heightParagraph = document.createElement('p');
    heightParagraph.innerText = 'Height: ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imgUrl;
    imageElement.alt = pokemon.name;

    imageElement.addEventListener('click', function () {
      closeModal();
    });

    modalBody.appendChild(heightParagraph);
    modalBody.appendChild(imageElement);

    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalBody);

    modalContainer.appendChild(modalContent);

    document.body.appendChild(modalContainer);

    modalContainer.addEventListener('click', function (event) {
      if (event.target === modalContainer) {
        closeModal();
      }
    });
  }

  function closeModal() {
    let modalContainer = document.querySelector('.modal');
    if (modalContainer) {
      modalContainer.remove();
    }
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    LoadList: LoadList,
    loadDetails: loadDetails
  };
})();

let repository = pokemonRepository;

repository.LoadList().then(function () {
  let pokemonList = repository.getAll();
  pokemonList.forEach(function (pokemon) {
    repository.addListItem(pokemon);
  });
});