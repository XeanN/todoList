const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB', { useNewUrlParser: true});

const fruitSchema = new mongoose.Schema( {
    name: {
        type: String,
        require: true
    },
    rating: {
        type:Number,
        min: 1,
        max: 10
    },
    review: String
});
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit( {
    name: "Peach",
    rating: 10,
    review: "Fantastic"
});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name : 'pineapple',
  rating: 9,
  review:'Great Fruit'
});

//pineapple.save();

const grape = new Fruit({
  name: 'grape',
  rating: 7,
  review: 'Dulces y ácidas'
});

//grape.save();

const person = new Person({
    name: "Amy",
    age: 12,
    favouriteFruit: pineapple
});

//TODO: AGREGAR O ACTUALIZAR 
Person.updateOne({name: "John"}, {favouriteFruit: grape})
  .then( function(){
    console.log("Se agrego correctamente");
  })
  .catch( error => {
    console.log(error);
  }) 


//const frutas = [kiwi, orange, banana];

//fruit.save();
//person.save();
//TODO: AGREGAR VARIOS
// Fruit.insertMany(frutas)
//   .then(() => {
//     console.log('Agregadas las frutas a la base FruitsDB');
//   })
//   .catch(error => {
//     console.error('Error al agregar las frutas:', error);
//   });

//TODO: PARA ACTUALIZAR SERÍA ASÍ
// Fruit.updateOne({ _id:"64a5d84a877d02f798f6d036" }, { name: "Peach"})
//     .then( ()=> {
//         console.log("Actualizado corretamente");
//     })
//     .catch( error=>{
//         console.log(error);
//     })
    
//TODO: Para borrar un item
Fruit.deleteOne({_id:"64a647d9e32942c574d01a13"})
  .then(() => {
    console.log("Documento eliminado correctamente");
  })
  .catch(error => {
    console.log(error);
  });

//TODO: PARA BUSCAR

Fruit.find()
  .then(fruits => {
    console.log(fruits);

    fruits.forEach( (fruit)=>{
        console.log(fruit.name);
    })

  })
  .catch(error => {
    console.log(error);
  });

Person.find()
  .then( persons=> {
    console.log(persons);

    persons.forEach( person => {
        console.log(person.name);
    })
  })
  .catch( error => {
    console.log(error);
  });

//TODO: Borrar varios
Person.deleteMany( {name: "Johns"})
  .then(() => {
    console.log("Documentos eliminados correctamente");
  })
  .catch(error => {
    console.log(error);
  });