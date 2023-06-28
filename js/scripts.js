let pokemonRepository = (function () {
    let pokemonList = [
      {
        name: 'bulbasaur',
        pokemonNumber: 1,
        type: ['grass', 'poison'],
        height: 1.1
      },
      {
        name: 'charmander',
        pokemonNumber: 2,
        type: ['fire'],
        height: 1.2
      },
      {
        name: 'squirtle',
        pokemonNumber: 3,
        type: ['water'],
        height: 1.3
      },
      {
        name: 'pikachu',
        pokemonNumber: 4,
        type: ['electric'],
        height: 1.4
      },
      {
        name: 'eevee',
        pokemonNumber: 5,
        type: ['normal'],
        height: 1.5
      },
    ];
  

    function add(pokemon) {
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

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    };
  })();
  
  let repository = pokemonRepository;
  let pokemonList = repository.getAll();

  pokemonList.forEach(function (pokemon) {
    let pokemonListContainer = document.querySelector('.pokemon-list');
  
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonListContainer.appendChild(listItem);
  
    button.addEventListener('click', function () {
      repository.showDetails(pokemon);
    });
  });