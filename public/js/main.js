var l = 0;
var imgObj;
var samePage = false;

function init(){
   imgObj = document.getElementById('logo');
   imgObj.style.position= 'relative'; 
   imgObj.style.left = '0px'; 
   l = 0;
}

function cambiarImagen(){
   console.log(5+5);
   if (l == 0) {
      document.getElementById('logo').src = "img/gopher.png";
      l = 1;      
   }else{
      document.getElementById('logo').src = "img/logo2.png";
      l = 0;
   }
}



var Articulo = function(titulo, contenido){
   this.titulo = titulo;
   this.contenido = contenido;
};

Articulo.prototype.render = function(link){
   return '<article><div><h3>' + this.titulo + '</h3></div><div><p>' + this.contenido + '</p></div></article>';
};

var ManejadorDeArticulos = {};

ManejadorDeArticulos.load = function(){
   this.articulos = [];
   var articulo1 = new Articulo('Titulo1', 'Contenido1')
   this.articulos.push(articulo1);
   this.articulos.push(new Articulo('Titulo2', 'Contenido2'));
   this.articulos.push(new Articulo('Titulo3', 'Contenido3'));

};

ManejadorDeArticulos.render = function(objectId){
   var result = "";
   for (var i = 0; i<this.articulos.length; i++) {
      result += this.articulos[i].render();
   }
   document.getElementById(objectId).innerHTML = result;
};

window.onload = function(){
   ManejadorDeArticulos.load();
   ManejadorDeArticulos.render('articulos');
};


