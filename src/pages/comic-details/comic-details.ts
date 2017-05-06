import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ComicDetails page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-comic-details',
  templateUrl: 'comic-details.html'
})
export class ComicDetailsPage {
  public comic: any;			// Almacena el objeto comic pasado en navParams

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.comic = navParams.get('marvelComic');
  }
}
