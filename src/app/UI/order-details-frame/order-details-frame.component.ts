import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Order } from 'src/app/Model/Order';

@Component({
  selector: 'app-order-details-frame',
  templateUrl: './order-details-frame.component.html',
  styleUrls: ['./order-details-frame.component.css']
})
export class OrderDetailsFrameComponent implements OnInit, OnChanges {

  @Input()
  public order: Order;



  @Output()
  public changeNameEmit = new EventEmitter();

  @Output()
  public changeStatusEmit = new EventEmitter();

  public statusArray: any[];

  public changeStatusResult;

  public amountItemsInOrder: number;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createStatusArrays();
    if (this.statusArray.length > 0) {
      this.changeStatusResult = this.statusArray[0];;
    }
  }

  ngOnInit(): void {

  }

  public changeName(name: string) {
    this.changeNameEmit.emit(name)
  }

  private createStatusArrays() {
    this.statusArray = [];
    this.statusArray.push({ status: "NEW", statusName: "Nowe" });
    this.statusArray.push({ status: "REALISE", statusName: "W realizacji" });
    this.statusArray.push({ status: "FINISHED", statusName: "Zakończone" });

  }

  public changeStatus(){
    this.changeStatusEmit.emit(this.changeStatusResult.status);
  }
}
