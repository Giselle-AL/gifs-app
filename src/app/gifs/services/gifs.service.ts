import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


@Injectable({providedIn: 'root'})
export class GifsService {

  public giflist:Gif[] = [];

  private _tagsHistory:string[]=[];
  private apiKey: string= 'GMFy58hgYDv3DH6TUC6wjis0L0DF1KLo';
  private serviceURL:string = 'http://api.giphy.com/v1/gifs';

  constructor( private http:HttpClient ) {
    this.loadLocalStorage();
   }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  //organizar el historial
  private organizeHistory(tag:string){
    // lo convertimos a minusculas, así todo va igualito y no hay pierde
    tag = tag.toLowerCase();

    //aquí evaluamos si ya existe en el historial
    if (this._tagsHistory.includes(tag)){
      //si lo incluye, entonces se va a eliminar ese Tag, con el filter se regresa un nuevo arreglo
      //solo regresará todos los elementos cuya función regrese verdadero
      //primero recibe el "oldtag", que si es diferente al tag que se está recibiendo, lo dejará pasar
      //únicamente los diferentes se dejarán pasar, si es idéntico, no
      this._tagsHistory = this._tagsHistory.filter((oldTag)=> oldTag !==tag);
    }
      //aquí se agrega nuevamente el tag que se había seleccionado y se agrega al inicio
      this._tagsHistory.unshift(tag);
      console.log(this.tagsHistory);
      //se limita a 10 registros en el historial
      this._tagsHistory = this.tagsHistory.splice(0,10);
      this.saveLocalStorage();
  }

  //se guarda la info en el local storage
  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  //recargamos la información previamente guardada
  private loadLocalStorage():void {
    if ( !localStorage.getItem('history') ) return;

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if (this._tagsHistory.length === 0) return;
    this.searchTag( this._tagsHistory[0]);
  }

  //aquí se busca
  async searchTag(tag:string): Promise<void> {
    if ( tag.length===0 ) return;
    //se manda organizar
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '20')
    .set('q', tag);

    console.log(params);

    this.http.get<SearchResponse>( `${this.serviceURL}/search`, {params} )
    .subscribe (resp => {

      this.giflist = resp.data;
      console.log({gifs: this.giflist});
    });

   //'http://api.giphy.com/v1/gifs/search?api_key=GMFy58hgYDv3DH6TUC6wjis0L0DF1KLo&q=hello_kitty&limit=20'

   // .then( data = console.log(data) );
  }

}
