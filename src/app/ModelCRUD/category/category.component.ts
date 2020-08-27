import {Component, OnInit} from '@angular/core';
import {Category} from 'src/app/Model/Category';
import {HttpApiService} from 'src/app/Service/Http/http-api.service';
import {categoryEndpoint} from '../../Service/Http/URL';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public statement: string;
  public categories: Category[];

  constructor(private httpApi: HttpApiService) {
    this.statement = '';
    this.categories = [];
  }

  ngOnInit(): void {
    this.getCategory();
  }

  public deleteCategory(id) {
    this.statement = '';
    this.httpApi.delete(categoryEndpoint, id)
      .subscribe(data => {
          this.statement = 'Sukces! Obiekt usunięty';
          this.getCategory();
        },
        error => this.statement = 'Błąd! Nie udało się usunąć obiektu');
  }

  public modifyCategory(valueArray) {
    this.statement = '';
    let category = this.createCategoryFromValueArray(valueArray);
    this.httpApi.patch(categoryEndpoint, category.id, category)
      .subscribe(data => {
          this.statement = 'Sukces! Modyfikacja zakończona powodzeniem';
          this.getCategory();
        },
        error => this.statement = 'Błąd podczas modyfikowania obiektu');
  }

  public createCategory(valueArray) {
    this.statement = '';
    let category = this.createCategoryFromValueArray(valueArray);
    category.id = null;
    this.httpApi.post(categoryEndpoint, category)
      .subscribe(data => {
          this.statement = 'Sukces! Obiekt dodany';
          this.getCategory();
        },
        error => this.statement = 'Błąd! Problem podczas zapisywania obiektu');
  }

  public getCategory() {
    this.httpApi.get(categoryEndpoint)
      .subscribe(data => {
          this.categories = data;
          this.categories = this.categories.slice();
        },
        error => this.statement = 'Błąd podczas pobierania danych z serwera');
  }

  private createCategoryFromValueArray(valueArray) {
    return {id: valueArray[0], name: valueArray[1]};
  }

}
