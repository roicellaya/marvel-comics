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
  public pageNum: number;

  constructor(public navCtrl: NavController, public marvelComicService: MarvelComicService) {
  	this.pageNum = 0;
    this.marvelComics = [];
    this.getMarvelComics();
  }

  getMarvelComics() {
  	this.marvelComicService.getComics(this.pageNum)
  		.then(data => {
        for (let i = 0; i < data.length; i++) {
          this.marvelComics.push(data[i]);
        }
  			console.log(this.marvelComics);
  		});
  }

  getDetails(marvelComic) {
  	console.log(marvelComic);
    this.navCtrl.push(ComicDetailsPage);
  }

  getMoreComics(infiniteScroll) {
    console.log('Begin async operation');
    this.pageNum += 1;
    this.marvelComicService.getComics(this.pageNum)
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          this.marvelComics.push(data[i]);
        }
        console.log(this.marvelComics);
      });
  }

}
