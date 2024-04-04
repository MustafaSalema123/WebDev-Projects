import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogImage } from 'src/app/models/blog-Image.model';
import { ImageService } from 'src/app/services/image.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent  implements OnInit{

  private file?: File;

  fileName: string = '';
  title: string=''
  images$? : Observable<BlogImage[]> ;

  @ViewChild('form',{static: false}) imageUploadForm?: NgForm;

  constructor(private imageService:ImageService){}


  ngOnInit(): void {
    this.getImages();
    
  }

  OnFileUploadChange(event: Event)
  {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];

  }

  UploadImage()
  {
    if(this.file && this.fileName !== '' && this.title !== '')
    {
      //Image service to upload the image
      this.imageService.uplaodImage(this.file ,this.fileName , this.title).subscribe({
        next: response => 
        {
          //console.log(response , " resp ");
          this.imageUploadForm?.resetForm();
          this.getImages();
        }
      })

    }

  }

  SelectImage(image: BlogImage)
  {
    this.imageService.selectImage(image);
  }

  private getImages()
  {
    this.images$ = this.imageService.getAllImages();
  }
}
