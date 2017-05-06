import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MarvelComicService} from '../../providers/marvel-comic-service';

/**
 * Generated class for the ComicDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-comic-details',
  templateUrl: 'comic-details.html',
  providers: [MarvelComicService]
})
export class ComicDetailsPage {
  public comic: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public marvelComicService: MarvelComicService) {
    var marvelComic = navParams.get('marvelComic');
    this.marvelComicService.getComic(marvelComic.id)
      .then(data => {
        this.comic = data;
        console.log(this.comic);
      });
  }

}
