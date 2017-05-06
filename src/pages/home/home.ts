import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MarvelComicService} from '../../providers/marvel-comic-service';

import { ComicDetailsPage } from '../comic-details/comic-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [MarvelComicService]
})
export class HomePage {
	public marvelComics: any;    // Arreglo de comics retornados por el api de marvel
  public pageNum: number;      // número de página (offset) a consultar del servicio de marvel

  constructor(public navCtrl: NavController, public marvelComicService: MarvelComicService) {
  	this.pageNum = 0;
    this.marvelComics = [];
    this.getMarvelComics();
  }

  // Obtiene los comics mostrados inicialmente
  getMarvelComics() {
  	this.marvelComicService.getComics(this.pageNum)
  		.then(data => {
        for (let i = 0; i < data.length; i++) {
          this.marvelComics.push(data[i]);
        }
  		});
  }

  // Carga la página de detalles de un comic
  getDetails(marvelComic) {
    console.log('marvel comic:', marvelComic);
    this.navCtrl.push(ComicDetailsPage, {
      marvelComic: marvelComic
    });
  }

  // Obtiene más comics cuando se activa el evento infiniteScroll
  getMoreComics(infiniteScroll) {
    this.pageNum += 1;
    this.marvelComicService.getComics(this.pageNum)
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          this.marvelComics.push(data[i]);
        }
        infiniteScroll.complete();
      });
  }

  // Filtra los comics de la página en base al valor del searchbar
  filterComics(ev: any) {
    let val = ev.target.value;

    // Sólo se filtra si el string no es vacío
    if (val && val.trim() != '') {
      this.marvelComics = this.marvelComics.filter((marvelComic) => {
        var title = marvelComic.title;
        var year = marvelComic.dates[0].date;
        return (title.toLowerCase().indexOf(val.toLowerCase()) > -1)
            || (year.indexOf(val) > -1);
      });
    }
  }

  // Limpia la barra de búsqueda
  onCancel(ev) { 
    ev.target.value = '';
  }
}
