import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MarvelComicService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MarvelComicService {
	data;
	comicData;

	limit: number;

  constructor(public http: Http) {
    console.log('Hello MarvelComicService Provider');
    this.limit = 30;
  }

  getComics(pageNum) {
	  if (this.data) {
	    // already loaded data
	    return Promise.resolve(this.data);
	  }

	  // don't have the data yet
	  return new Promise(resolve => {
	    // We're using Angular HTTP provider to request the data,
	    // then on the response, it'll map the JSON data to a parsed JS object.
	    // Next, we process the data and resolve the promise with the new data.
	    var query_string = 'apikey=eec2b791e6e4abce698cc51c828fcd0a&limit=';
	    query_string += this.limit + '&offset=' + (pageNum * this.limit) + '&hasDigitalIssue=true';
	    this.http.get('https://gateway.marvel.com/v1/public/comics?' + query_string)
	      .map(res => res.json())
	      .subscribe(data => {
	        // we've got back the raw data, now generate the core schedule data
	        // and save the data for later reference
	        this.data = data.data.results;
	        resolve(this.data);
	      });
	  });
	}

	getComic(id) {
		if (this.comicData) {
	    // already loaded data
	    return Promise.resolve(this.comicData);
	  }

    return new Promise(resolve => {
      var query_string = id + '&apikey=eec2b791e6e4abce698cc51c828fcd0a';
      this.http.get('https://gateway.marvel.com/v1/public/comics/' + query_string)
        .map(res => res.json())
        .subscribe(data => {
          this.comicData = data.data.results[0];
        });
    });
	}
}
