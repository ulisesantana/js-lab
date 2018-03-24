import * as assert from 'assert';

suite('High order functions', () => {
  suite('High order functions for Array.filter', () => {

    function filterAnimalsBySpecies(species){
      return (animal) => animal.species === species;
    }

    function rejectAnimalsBySpecies(species){
      return (animal) => animal.species !== species;
    }

    const animals = [
      {name: 'Todd', species: 'dog'},
      {name: 'Misifu', species: 'cat'},
      {name: 'Bigotes', species: 'cat'},
      {name: 'Goldy', species: 'fish'},
      {name: 'Bob', species: 'dog'},
      {name: 'Piolin', species: 'bird'}
    ];

    test('Filter dogs', () => {
      const dogs = animals.filter(filterAnimalsBySpecies('dog'));
      dogs.map(animal => assert.strictEqual(animal.species, 'dog'));
      assert.ok(dogs.every(filterAnimalsBySpecies('dog')));
    });

    test('All animals except cats', () => {
      const everythingButCats = animals.filter(rejectAnimalsBySpecies('cat'));
      everythingButCats.map(animal => assert.notStrictEqual(animal.species, 'cat'));
      assert.ok(everythingButCats.every(rejectAnimalsBySpecies('cat')));
    });

  });
});
