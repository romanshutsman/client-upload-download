import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Subscription } from 'rxjs/Subscription';
import {saveAs} from 'file-saver';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  files: any;
  fileLength = 0;
  file: any;
  message = {};
  constructor (private api: ApiService) {
    this.getFiles();
  }

  getFiles() {
    this.api.getFiles().subscribe(
      data => {
        this.files = data;
        if (data) {
          this.fileLength = this.files.length;
        }
        console.log(data);
        this.message = {};
    });
  }
  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
        const file = fileList[0];
        this.file = file;
    }
}
  uploadFiles(form: NgForm) {
    const dataFile = new FormData();
    dataFile.append('file', this.file);
    dataFile.append('filename', this.file.name);
    this.api.uploadFiles(dataFile).subscribe(
      data => {
        this.message = data;
        console.log(data);
      }, error => {
        console.log(error);
      });
    form.reset();
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
