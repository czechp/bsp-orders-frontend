import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from 'src/app/Model/Order';
import {HttpApiService} from '../../Service/Http/http-api.service';
import {addOrderCommentBySuperUser, orderEndpoint} from '../../Service/Http/URL';

@Component({
  selector: 'app-order-superuser-details-info',
  templateUrl: './order-superuser-details-info.component.html',
  styleUrls: ['./order-superuser-details-info.component.css']
})
export class OrderSuperuserDetailsInfoComponent implements OnInit {

  @Input()
  public order: Order;
  @Output()
  public refreshEmit = new EventEmitter();
  public statement = '';

  constructor(
    private httpApiService: HttpApiService
  ) {
  }

  ngOnInit(): void {
  }

  public addCommentary(commentary: string): void {
    this.statement = '';
    if (commentary.length > 5) {
      this.httpApiService.patchWithParams(orderEndpoint + addOrderCommentBySuperUser,
        this.order.id,
        {},
        'commentary',
        commentary).subscribe(
        (next: any) => {
          this.refreshEmit.emit();
        },
        (error: any) => {
          this.statement = 'Błąd podczas dodawania komentarza';
        },
      )
      ;
    } else {
      this.statement = 'Błąd za krótki komentarz. Minimum 5 znaków';
    }
  }

}
