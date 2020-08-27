import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ItemInOrder} from 'src/app/Model/ItemInOrder';
import {HttpApiService} from 'src/app/Service/Http/http-api.service';
import {itemInOrderEndpoint} from 'src/app/Service/Http/URL';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  public itemInOrder: ItemInOrder;
  public statement: string = '';
  private id: number;

  constructor(private activatedRoute: ActivatedRoute,
              private httpApi: HttpApiService) {
  }

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.httpApi.getElement(itemInOrderEndpoint, this.id)
      .subscribe(
        response => {
          this.itemInOrder = response;
        },
        error => {
          this.statement = 'Błąd! Nie udało się pobrać elementu';
        }
      );
  }

}
