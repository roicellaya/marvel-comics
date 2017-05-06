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
	public marvelComics: any;

  constructor(public navCtrl: NavController, public marvelComicService: MarvelComicService) {
  	this.getMarvelComics();
  }

  getMarvelComics() {
  	this.marvelComicService.getAll()
  		.then(data => {
  			this.marvelComics = data;
  			console.log(this.marvelComics);
  		});
  }

  getDetails(marvelComic) {
  	console.log(marvelComic);
    this.navCtrl.push(ComicDetailsPage);
  }

}
