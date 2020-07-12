import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpApiService } from 'src/app/Service/Http/http-api.service';
import { Order } from 'src/app/Model/Order';
import { orderEndpoint } from 'src/app/Service/Http/URL';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public statement: string;
  public id: number;
  public order: Order;
  constructor(private activatedRoute: ActivatedRoute, private httpApiService: HttpApiService) { 
    this.statement="";
    this.order = {name: ""};
  }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.getOrder();
  }

  private getOrder() {
    this.httpApiService.getElement(orderEndpoint, this.id)
    .subscribe(
      data=>{this.order = data;},
      error =>{this.statement ="Błąd! Takie zamówienie nie istnieje";}
    );
  
  }

  public changeName(name: string){
    if(name.length > 3){
      this.httpApiService
      .patchWithParams(orderEndpoint + "/name", this.order.id, {}, "name", name)
      .subscribe(
        data => {this.statement = "Sukces! Nazwa została zmieniona"; this.getOrder()},
        error => {this.statement= "Błąd podczas zmiany nazwy"}
      );
    }else{
      this.statement = "Błąd! Za krótka nazwa zamówienia";
    }
  }


}
