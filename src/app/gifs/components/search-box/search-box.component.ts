import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text"
  class="form-control"
  placeholder="Buscar gifs..."
  (keyup)="SearchTag(txtTagInput.value)"
  #txtTagInput
  >
  `

})

export class SearchBocxComponent{

  constructor(){}

  SearchTag(newTag:string):void{
    console.log({newTag})

  }

}
