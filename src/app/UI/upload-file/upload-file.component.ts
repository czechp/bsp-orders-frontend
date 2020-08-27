import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpApiService} from 'src/app/Service/Http/http-api.service';
import {Category} from 'src/app/Model/Category';
import {csvItemEndpoint} from 'src/app/Service/Http/URL';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {


  @Input()
  public title: String;
  @Input()
  public categories: Category[];

  @Output()
  public getItemEventEmitter = new EventEmitter();

  public selectedCategory: Category;

  public statement: string = '';

  constructor(private httpApiService: HttpApiService) {
  }


  ngOnInit(): void {
  }

  public sendFile(categoryId: number, file: any) {
    this.statement = '';
    const formData = new FormData();
    if (file.files.length > 0) {
      formData.append('file', file.files[0]);
      this.httpApiService.uploadFile(csvItemEndpoint + categoryId, formData)
        .subscribe(
          response => {
            this.getItemEventEmitter.emit();
          },
          error => {
            this.statement = 'Błąd! Nie udało się zaimportować pliku';
          }
        );
    } else {
      this.statement = 'Błąd! Nie wybrano żadnego pliku';
    }
  }

}
