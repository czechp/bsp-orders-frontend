import { Component, OnInit } from '@angular/core';
import { Producer } from 'src/app/Model/Producer';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { producerEndPoint } from "../../Service/Http/URL";
@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {

  public producers: Producer[];
  public statement: string;

  constructor(private httpApi: HttpApiService) {
    this.statement = "";
  }

  ngOnInit(): void {
    this.getProducers();
  }

  public modifyProducer(valueArray) {
    console.log(this.convertArrayToProducer(valueArray));
  }


  private convertArrayToProducer(valueArray): Producer {
    return { id: valueArray[0], name: valueArray[1] };
  }

  private getProducers() {
    this.httpApi.get(producerEndPoint)
      .subscribe(data => { this.producers = data; this.producers = this.producers.slice() },
        error => this.statement = "Błąd podczas pobierania danych z serwera");
  }

  public createProducer(valueArray) {
    valueArray[0] = null;
    let producerToCreate = this.convertArrayToProducer(valueArray);
    if (producerToCreate.name.length > 2) {
      this.httpApi.post(producerEndPoint, producerToCreate)
      .subscribe(data => this.getProducers(),
      error => this.statement = "Błąd! Problem podczas zapisywania producenta");
 
      this.statement = "";
    } else {
      this.statement = "Błąd! Wybrana nazwa jest za krótka !!!"
    }
  }

}
