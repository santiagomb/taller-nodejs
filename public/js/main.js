var l = 0;
var imgObj;
var samePage = false;
var noticia1 = 'La Agencia Nacional de Promoción Científica y Tecnológica, a través del Fondo Fiduciario de Promoción de la Industria del Software (FONSOFT), en el marco del Programa para promover la innovación productiva a través del fortalecimiento y consolidación de Capital Humano aplicado a la industria de las Tecnologías de la Información y las Comunicaciones (TICs), Préstamo BIRF 7559/AR, convoca a los estudiantes de grado de Universidades Públicas, de carreras relacionadas con el sector TICs, que hayan aprobado al menos el 80% de la carrera, a la presentación de Ideas Proyecto para la Innovación y Desarrollo de Productos, Servicios, Sistemas o Soluciones en Tecnología de la Información, para la adjudicación de cupos de becas para la finalización de los estudios de grado, según el encuadramiento sobre industria del software establecidas por la ley 25.922 y su decreto reglamentario que pueden consultarse en el Anexo A. ';
var noticia2 = 'Nike sacó a la venta las zapatillas con cordones que se ajustan automáticamente. Se trata de las HyperAdapt, una versión muy similar a aquel calzado que usaba Marty McFly, el personaje que representaba Michael Fox, en la película Volver al Futuro II.';
var noticia3 = 'El tenista Juan Martín Del Potro, el futbolista Lionel Messi, la judoca Paula Pareto y el regatista Santiago Lange, figuran en las ternas a los Olimpia de Plata, y son firmes candidatos a quedarse con la estatuilla de oro, de la edición 2016 de los premios que otorga el Círculo de Periodistas Deportivos. La entrega de los reconocimientos a los mejores deportistas de las 40 disciplinas seleccionadas se realizará el próximo martes 20 en el Salón Dorado de Parque Norte. Entre los candidatos para el mayor cetro aparecen la figura del Barcelona; los integrantes del equipo de tenis campeón de la Copa Davis y los medallistas Santiago Lange, Cecilia Carranza y Paula Pareto.';

var noticias = [noticia1, noticia2, noticia3];

function cambiarImagen(){
   if (l == 0) {
      document.getElementById('kon').src = "img/logo2.png";
      l = 1;      
   }else{
      document.getElementById('kon').src = "img/kon.png";
      l = 0;
   }
}

var Articulo = function(titulo, contenido){
   this.titulo = titulo;
   this.contenido = contenido;
};

Articulo.prototype.render = function(objectId, noticia){
   return '<article><div><h3>' + this.titulo + '</h3></div><div><p>' + 
      '<a href="#" onclick="cambiar(' + objectId + '); return false;">' + this.contenido + '</a></p></div></article>' + 
      '<div id=' + objectId + ' style="display: none;" class="w3"><p>' + noticia + '</p></div>';
};

var ManejadorDeArticulos = {};

ManejadorDeArticulos.load = function(){
   this.articulos = [];
   var articulo1 = new Articulo('Agencia Nacional de Promoción Científica y Tecnológica', 'Ver contenido')
   this.articulos.push(articulo1);
   this.articulos.push(new Articulo('Curiosidades', 'Ver contenido'));
   this.articulos.push(new Articulo('Deporte', 'Ver contenido'));
};

ManejadorDeArticulos.render = function(objectId){
   var result = "";
   for (var i = 0; i<this.articulos.length; i++) {
      result += this.articulos[i].render(i, noticias[i]);
   }
   document.getElementById(objectId).innerHTML = result;
};

window.onload = function(){
   ManejadorDeArticulos.load();
   ManejadorDeArticulos.render('articulos');
};

function cambiar(id){
   vista=document.getElementById(id).style.display;
   if (vista=='none')
      vista='block';
   else
      vista='none';

   document.getElementById(id).style.display = vista;
}

function badnews(){
   document.getElementById('vermas').innerHTML = '<div><img id="kon" src="img/kon.png" ></div>';
}
