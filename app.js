const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//const date = require(__dirname + "/date.js")

const app = express();



app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB', {useNewUrlParser: true})
  .then( ()=>{
    console.log("Conectado correctamente");
  })
  .catch( error => {
    console.log(error);
  });

const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item", itemsSchema);

const postre = new Item( {
    name:"Pizza"
});

//comida.save();

const breakfast = new Item({
    name:"Cafe"
});

const lunch = new Item({
    name:"Guiso"
});

const comidas = [postre, breakfast, lunch];
//TODO: AGREGAR VARIOS
/*
Item.insertMany(comidas)

  .then( ()=> {
    console.log("Agregado las comidas correctamente");
  })
  .catch(error => {
    console.log(error);
  })
*/

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


app.get("/", (req, res)=> {
  Item.find()
  .then( items => {
    if( items.length === 0) {
      Item.insertMany(comidas)

      .then( ()=> {
        console.log("Agregado las comidas correctamente a database");
      })
      .catch(error => {
        console.log(error);
      })
      res.redirect("/");
    } else {
      res.render("list", {listTitle : "Today", newListItems: items}); 
    }
      
  })
  .catch((error)=>{
    console.log(error);
  })
    //let day = date.getDate();
       

});

app.post("/", function(req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
      name: itemName
    });

    if( listName === "Today"){
      item.save();
      es.redirect("/");
    } else {
      List.findOne({name: listName})
        .then(foundList => {
          foundList.items.push(item);
          return foundList.save();
        })
        .then(() => {
          res.redirect("/" + listName);
        })
        .catch(err => {
        // Manejo de errores
          console.error(err);
        });

    };   
});

app.post("/delete", function(req, res) {
  let checkidItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkidItemId)
    .then( ()=> {
      console.log("Borrado correctamente");
      res.redirect("/")
    })
    .catch(error=> {
      console.log(error);
      res.status(500).send("Error al eliminar")
    });
});

app.get("/:listaPersonalizada", (req, res)=> {
  const listaPersonalizada = req.params.listaPersonalizada;

  List.findOne({name: listaPersonalizada})
    .then(foundList => {
      if(!foundList){
        // Si no se encuentra la lista, crear una nueva
        const list = new List({
          name: listaPersonalizada,
          items: comidas
        });

        return list.save();
        
      } else {
        // Si se encuentra la lista, enviarla a la vista
        return foundList;
      }
    })
    .then( list => {
      if(list){
        res.render("list", { listTitle: list.name, newListItems: list.items })
      } else{
        res.redirect("/" + listaPersonalizada);
      }
    })
    .catch(err => {
      console.error(err);
      // Manejar el error adecuadamente
    });


} );
  
app.get("/about", (req, res)=> {
    res.render("about")
})


app.listen(3000, ()=> {
    console.log("Server Started on port 3000");
})
//TODO: Para eliminar
/*
Item.deleteMany( {name: "Lomo saltado"})
  .then(() => {
    console.log("Documentos eliminados correctamente");
  })
  .catch(error => {
    console.log(error);
  });
*/