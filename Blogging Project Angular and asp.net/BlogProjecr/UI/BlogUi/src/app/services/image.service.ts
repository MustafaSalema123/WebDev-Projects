import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogImage } from '../models/blog-Image.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {


  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileExtension: '',
    fileName: '',
    title: '',
    url: '',
  });


  baseUrl =  'http://192.168.5.148:5222/api/';

  constructor(private http: HttpClient) { }

  getAllImages() 
  {
   return this.http.get<BlogImage[]>(this.baseUrl + 'images');
  }


  uplaodImage(file: File , fileName:string , title:string)
  {
    const formData = new FormData();
    
    formData.append('file',file);
    formData.append('fileName',fileName);
    formData.append('title',title);

    return this.http.post<BlogImage>(this.baseUrl + 'images' , formData);

  }

  selectImage(image: BlogImage): void {
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
}
