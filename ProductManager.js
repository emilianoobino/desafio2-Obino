const fs = require("fs");

class ProductManager {
  static autoIncrementId = 0;

  constructor() {
    this.path = "./ProductManager.json";
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    if (this.products.some(item => item.code === code)) {
      console.error("El código ya está en uso");
      return;
    }

    const newProduct = {
      id: ++ProductManager.autoIncrementId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);

    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
      console.log("Producto agregado con éxito");
    } catch (error) {
      console.error("Error al escribir en el archivo JSON:", error.message);
    }
  }

  readProductManager() {
    try {
      let data = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al leer el archivo JSON:", error.message);
      return [];
    }
  }

  updateProductManager({ id, ...products }) {
    this.updateProductManagerInfo(id);
    let productAnterior = this.readProductManager();
    let updateData = [{ id, ...products }, ...productAnterior];

    try {
      fs.writeFileSync(this.path, JSON.stringify(updateData, null, 2));
      console.log("Producto actualizado con éxito");
    } catch (error) {
      console.error("Error al escribir en el archivo JSON:", error.message);
    }
  }

  deleteProductManager(id) {
    let dropData = this.readProductManager();
    let productsFilter = dropData.filter(product => product.id !== id);

    try {
      fs.writeFileSync(this.path, JSON.stringify(productsFilter, null, 2));
      console.log("El producto con el Id #", id, " ha sido eliminado");
    } catch (error) {
      console.error("Error al escribir en el archivo JSON:", error.message);
    }
  }

  updateProductManagerInfo(id) {
    let dropData = this.readProductManager();
    let productsFilter = dropData.filter(products => products.id !== id);

    try {
      fs.writeFileSync(this.path, JSON.stringify(productsFilter));
      console.log("Producto actualizado con éxito");
    } catch (error) {
      console.error("Error al escribir en el archivo JSON:", error.message);
    }
  }

  getProducts() {
    let getData = this.readProductManager();
    console.log("Todos nuestros productos disponibles", getData);
  }

  getProductById(id) {
    let getId = this.readProductManager();
    if (!getId.find(products => products.id === id)) {
      console.warn("El producto no existe!");
    } else {
      console.log("El producto con el id #", id, " es:", getId.find(products => products.id === id));
    }
  }
}

const manager = new ProductManager();

console.log(manager.getProducts());

manager.addProduct("funko 1", "spiderman", 1500, "thumbnail1.jpg", "abc123", 50);
manager.addProduct("funko 2", "batman", 1700, "thumbnail2.jpg", "abc124", 80);
manager.addProduct("funko 3", "it", 2000, "thumbnail3.jpg", "abc125", 45);

// testing
// array vacío
console.log(manager.getProducts());

//codigo repetido
console.log("producto con el codigo repetido")
manager.addProduct("playstation", "videojuego", 150000, "play5.jpg", "abc123", 10);

//Validación de campos faltantes
console.log(" producto con campos faltantes")
manager.addProduct("nintendo", 500000, "nintendo.jpg", "abc129", 30);

//productos por id
console.log("producto que existe por el ID")
manager.getProductById(2);

//Producto no encontrado
console.log("producto que NO existe por el ID")
manager.getProductById(5);

//eliminar un producto
console.log("eliminar funko 3")
manager.deleteProductManager(3);

//Probamos que pasa si no encuentra el id del producto a eliminar
console.log("probamos buscar un id que no existe para eliminar")
manager.deleteProductManager(15)

//Probamos editar un producto
console.log("probamos editar funko 1")
manager.updateProductManager(1, "price", 1200)

//Probamos que pasa si no encuentra el id del producto a editar
console.log("probamos buscar un id que no existe para editar");
manager.deleteProductManager(8, "price", 1520);




  
  