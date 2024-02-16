import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injectable } from '@angular/core';
import { GifsService } from '../../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './Sidebar.component.html',
  styleUrl: './Sidebar.component.css'
})
export class SidebarComponent {

  constructor( private gifsService:GifsService) {  }

  get tags():string[]{
   return this.gifsService.tagsHistory;
  }

  searchTag( tag: string ):void{
    this.gifsService.searchTag(tag);
  }
}
