import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category-model';
import { AddBlogPost } from 'src/app/models/add-blog-post.model';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-addblogpost-list',
  templateUrl: './addblogpost-list.component.html',
  styleUrls: ['./addblogpost-list.component.css']
})
export class AddblogpostListComponent implements OnInit , OnDestroy  {

  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;

  imageSelectorSubscription?: Subscription;

  constructor(private blogPostService:BlogpostService , private router: Router,
    private categoryService: CategoryService , private imageService:ImageService) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: [],
    };
  }

  ngOnInit(): void {
   this.categories$ = this.categoryService.GetAllCategory();

    this.imageSelectorSubscription = this.imageService
      .onSelectImage()
      .subscribe({
        next: (selectedImage) => {
          this.model.featuredImageUrl = selectedImage.url;
          this.isImageSelectorVisible = false;
        },
      });
  }
  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
  onFormSubmit(){
    //console.log('ths m ' , this.model);
    this.blogPostService.AddBlogPost(this.model).subscribe({
      next: response=>
      {
        this.router.navigateByUrl('admin/blogposts');
      }
    });

  }

  openImageSelector(){
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() {
    this.isImageSelectorVisible = false;
  }
}
