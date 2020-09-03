import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  @Output()
  createEmitter = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public createOrder(name: string, commentary: string) {

    this.createEmitter.emit({name: name, commentary: commentary});
  }

}
