import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {DUMP_DATA} from "./dump.data";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ServiceProvider {
  
  development= false;
  OriginPath = '/api/';

  constructor(private http:HttpClient) { }

  getURI(data:any[]){
    let dataString = "";
    for(let v in data){
      dataString="?";
      dataString += v+"="+data[v]+'&';
    }
    return dataString;
  }
  getHeaders():Headers{
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin','*');
    return headers;
  }
  get(url:string,data?:any[]):Observable<any> | any{
    let dataString = this.getURI(data);

    if(this.development){
      console.log("DEV GET : "+url,dataString,data);
      return Observable.of(DUMP_DATA).delay(2500);
    }else{
    
    
    console.log("GET : "+url,dataString,data);
    return this.http.get(this.OriginPath+url+dataString)
      .catch(this.handleError);
    }
  }

  post(url:string,body:any={},data:any[]=[]):Observable<any> | any{
    let dataString = this.getURI(data);

    if(this.development){
      console.log("DEV POST : "+url,dataString,body,data);
      return Observable.of(DUMP_DATA).delay(1000);
    }
    let headers = new  HttpHeaders().set("Content-Type", "application/json");
    console.log("POST : "+url,dataString,body,data);
    return this.http.post(this.OriginPath+url,body,{headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  put(url:string,body:any={},data:any[]=[]):Observable<any> | any{
    let dataString = this.getURI(data);
    let headers = new  HttpHeaders().set("Content-Type", "application/json");
    console.log("PUT : "+url,dataString,body,data);
    return this.http.put(this.OriginPath+url,body, {headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  delete(url:string,body:any={},data:any[]=[]):Observable<any> | any{
    let dataString = this.getURI(data);

    if(this.development){
      console.log("DEV DELETE : "+url,dataString,body,data);
      return Observable.of(DUMP_DATA).delay(1000);
    }

    console.log("DELETE : "+url,dataString,body,data);
    return this.http.delete(this.OriginPath+url,body);
  }

  extractData(data:Response){
    return data.text();
  }
  handleError(){
    console.log("Error handleError");
    return Observable.throw("Error API Service Todo.");
  }
}
