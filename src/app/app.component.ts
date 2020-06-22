import { Component } from '@angular/core';
import {Producer} from './Model/Producer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public porducers:Producer[];

    constructor(){
      this.porducers = [
        {id: 1, name: "Siemens"},
        {id: 2, name: "Schneider"},
        {id: 3, name: "Eaton"}
    ]
    }
}
