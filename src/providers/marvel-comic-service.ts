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
	data: any;					// Almacena los comics devuelto por el api de marvel
	limit: number;				// Número de comics por consulta
	api_key: string;			// Llave pública para el api de marvel

  constructor(public http: Http) {
    this.limit = 30;
    this.api_key = '3dec7cc6602ded8d2beefdc9aeb3f995';
  }

  getComics(pageNum) {
	  if (this.data) {
	    return Promise.resolve(this.data);
	  }

    // Se obtiene la data y se retorna la promesa
	  return new Promise(resolve => {
	    var query_string = 'apikey=' + this.api_key + '&limit=';
	    query_string += this.limit + '&offset=' + (pageNum * this.limit) + '&hasDigitalIssue=true';
	    this.http.get('https://gateway.marvel.com/v1/public/comics?' + query_string)
	      .map(res => res.json())
	      .subscribe(data => {
	        this.data = data.data.results;
	        resolve(this.data);
	      });
	  });
	}
}
