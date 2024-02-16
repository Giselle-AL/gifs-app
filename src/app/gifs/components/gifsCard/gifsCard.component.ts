import { Component, Input, OnInit, Output } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifsCard',
  templateUrl: 'gifsCard.component.html'
})

export class GifsCardComponent implements OnInit  {

  @Input()
  public gifs!:Gif;


  ngOnInit(): void {
    if (!this.gifs) throw new Error('Gif property is required.');
  }


}
