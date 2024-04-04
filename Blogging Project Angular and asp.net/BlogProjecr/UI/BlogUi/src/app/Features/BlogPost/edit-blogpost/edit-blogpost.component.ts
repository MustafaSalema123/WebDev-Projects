import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category-model';
import { AddBlogPost } from 'src/app/models/add-blog-post.model';
import { BlogPost } from 'src/app/models/blog-post.model';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit , OnDestroy{

    id: string| null= null;
    
    blogPost?: BlogPost;
    categories$?:Observable<Category[]>;
    selectedCategories?: string[];
    isImageSelectorVisible: boolean = false;


    routerSubscription?: Subscription;
    editBlogPostsubscibed?: Subscription;
    GetBlogPostbyIdsubscibed?: Subscription;
    deleteBlogPostSubscription?: Subscription;
    imageSelectSubscription?: Subscription;


  constructor(private route:ActivatedRoute , private blogPostService:BlogpostService , 
    private categoryService:CategoryService
    ,private router: Router , private imageService: ImageService){}

  ngOnDestroy(): void {
   this.routerSubscription?.unsubscribe();
   this.editBlogPostsubscibed?.unsubscribe();
   this.GetBlogPostbyIdsubscibed?.unsubscribe();
   this.deleteBlogPostSubscription?.unsubscribe();
   this.imageSelectSubscription?.unsubscribe();
  }

  ngOnInit(): void {

    this.categories$ = this.categoryService.GetAllCategory();

   this.routerSubscription = this.route.paramMap.subscribe({
      next: param=> {
        this.id = param.get('id');

        if(this.id)
        {
        this.GetBlogPostbyIdsubscibed=   this.blogPostService.GetblogPostById(this.id).subscribe({
              next: response => {
                this.blogPost = response;
                this.selectedCategories = response.categories.map(x => x.id);
              },
          });
        }

        this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
          next: response => 
          {
            if(this.blogPost){
              this.blogPost.featuredImageUrl = response.url;
              this.isImageSelectorVisible = false;
            }
          }
        })
      }
    });
  }


  onFormSubmit(){
  
    if(this.blogPost && this.id){
      var updatedBlogPost : AddBlogPost = {
        author: this.blogPost.author,
        content: this.blogPost.content,
        featuredImageUrl: this.blogPost.featuredImageUrl,
        isVisible: this.blogPost.isVisible,
        shortDescription: this.blogPost.shortDescription,
        publishedDate: this.blogPost.publishedDate,
        title: this.blogPost.title,
        urlHandle: this.blogPost.urlHandle,
        categories: this.selectedCategories ?? [],
      };

      this.editBlogPostsubscibed = this.blogPostService.UpdateblogPostById(this.id , updatedBlogPost).subscribe(
        {
          next: (response) => {
            this.router.navigateByUrl('/admin/blogposts');
            console.log("dad" , updatedBlogPost)
          }
        }
      )
    }
  }
  onDelete(){
    if(this.id){

    
    this.deleteBlogPostSubscription = this.blogPostService.DeleteblogPostById(this.id).subscribe({
      next: _ =>
      {
        this.router.navigateByUrl("admin/blogposts")
      }
    })
  }
  }

  openImageSelector(){
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() {
    this.isImageSelectorVisible = false;
  }
}
