import { Component, OnInit } from '@angular/core';
import { Producer } from 'src/app/Model/Producer';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {

  public producers: Producer[];

  constructor() {
    this.producers = [
      {id: 1, name: "Siemens"},
      {id: 2, name: "Schneider"}
    ];
   }

  ngOnInit(): void {
  }

  public modifyProducer(valueArray){
    console.log(this.convertArrayToProducer(valueArray));
  }


  private convertArrayToProducer(valueArray):Producer{
    return {id: valueArray[0], name: valueArray[1]};
  }
}
