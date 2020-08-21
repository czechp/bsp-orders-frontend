import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  @Input()
  title: String;
  constructor() { }

  ngOnInit(): void {
  }

}
