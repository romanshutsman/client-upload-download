import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Subscription } from 'rxjs/Subscription';
import {saveAs} from 'file-saver';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  files: any;
  file: any;
  message = {};
  constructor (private api: ApiService) {
    this.getFiles();
  }

  getFiles() {
    this.api.getFiles().subscribe(
      data => {
        this.files = data;
        console.log(data);
    });
  }
  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
        const file = fileList[0];
        this.file = file;
    }
}
  uploadFiles(file) {
    const dataFile = new FormData();
    dataFile.append('file', this.file);
    dataFile.append('filename', this.file.name);
    this.api.uploadFiles(dataFile).subscribe(
      data => {
        this.message = data;
        console.log(data);
    });
  }
  download(file) {
    console.log(file);
    const dataFile = new FormData();
    dataFile.append('file', file);
    dataFile.append('filename', file.name);
    const body = {
      filename: file.name
    };
    
    this.api.download(file.name).subscribe(
      data => {
        saveAs(data, file.name);
      },
      error => {
      console.log(error);
      }
    );
  }
}
