import { Component, OnInit } from "@angular/core";
import { HttpService } from "shared/http/http.service";
import { HttpEventType } from "@angular/common/http";


@Component({
  selector: 'app-image-upload-preview',
  templateUrl: './image-upload-preview.component.html',
  styleUrls: ['./image-upload-preview.component.scss']
})
export class ImageUploadPreviewComponent implements OnInit {

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('files', this.fileData);
     
    this.fileUploadProgress = '0%';
 
    this.httpService.post('https://us-central1-tutorial-e6ea7.cloudfunctions.net/fileUpload', formData, {
      reportProgress: true,
      observe: 'events'   
    })
    .subscribe((events: any) => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
      } else if(events.type === HttpEventType.Response) {
        this.fileUploadProgress = '';
      }
         
    }) 
      
  }

}
