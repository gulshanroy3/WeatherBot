import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/switchMap';
import { map,debounceTime,distinctUntilChanged, switchMap} from "rxjs/operators"



@Injectable()
export class SearchService {
  baseUrl: string = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=EWuqRuEg62YhhKhA5rlX97DdsiM0AyTc';
  queryUrl: string = '&q=';
  array=[{"Version":1,"Key":"202396","Type":"City","Rank":10,"LocalizedName":"Delhi","Country":{"ID":"IN","LocalizedName":"India"},"AdministrativeArea":{"ID":"DL","LocalizedName":"Delhi"}}]
  constructor(private http: Http) { }

  search(terms: Observable<string>) {
   
    // return terms.pipe(debounceTime(400)
    //   .distinctUntilChanged()
    //   .switchMap(term => this.searchEntries(term)));
  }

  searchEntries(term) {
   if(term.length>=1){
    return this.http
        .get(this.baseUrl + this.queryUrl + term)
        .pipe(map(res =>res.json()))
        
       console.log(this.baseUrl + this.queryUrl + term);
        
  }
  else{
    return this.http
        .get(this.baseUrl + this.queryUrl + "de")
        .pipe(map(res =>res.json()))
  }
}
}