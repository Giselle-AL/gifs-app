import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService} from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text"
  class="form-control"
  placeholder="Buscar gifs..."
  (keyup.enter)="searchTag()"
  #txtTagInput
  >
  `

})

export class SearchBoxComponent{

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService){}

  //SearchTag(newTag:string):void{
  searchTag(){
    //se asigna el valor a la variable
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    //se limpia la caja de texto
    this.tagInput.nativeElement.value='';


  }

}
