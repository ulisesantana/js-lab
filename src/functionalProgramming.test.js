import * as assert from 'assert';
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);


suite('Functional programming', () => {
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

  suite('Array.reduce', () => {

    test('Sum total', () => {
      const oneToTen = [1,2,3,4,5,6,7,8,9];

      const sumReduce = oneToTen.reduce((p,c) => p+c);

      let sumRegular = 0;
      oneToTen.map(num => sumRegular += num);

      assert.strictEqual(sumReduce, sumRegular);
    });

    test('Parse a file', async () => {
      // Original file
      // bruce wayne	cocktail	30	3
      // bruce wayne	red bull	10	2
      // barney stinson	whisky	40	4

      const expect = {
        'bruce wayne': [
          {name: 'cocktail', price: 30, quantity: 3, total: 90},
          {name: 'red bull', price: 10, quantity: 2, total: 20}
        ],
        'barney stinson': [
          {name: 'whisky', price: 40, quantity: 4, total: 160}
        ]
      };

      const data = await readFile(`${__dirname}/data.txt`,'utf8');
      const output = data
        .trim()
        .split('\n')
        .map(line => line.split('\t'))
        .reduce( (customers, line) => {
          customers[line[0]] = customers[line[0]] || [];
          customers[line[0]].push({
            name: line[1],
            price: +line[2],
            quantity: +line[3],
            total: line[2] * line[3],
          });
          return customers
        }, {});

      assert.deepStrictEqual(output, expect);
    });

  });

});
