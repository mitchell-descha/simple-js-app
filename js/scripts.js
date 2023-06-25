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
  
    for (let i = 0; i < pokemonList.length; i++) {
      let pokemon = pokemonList[i];
      let output = pokemon.name + ' (height: ' + pokemon.height + ')';
      
      if (pokemon.height > 1.4) {
        output += ' - Wow, that\'s big!';
      }
  
      document.write(output + '<br>');
    }
  
    return {
      add: add,
      getAll: getAll
    };
  })();