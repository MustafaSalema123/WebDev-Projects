import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/models/blog-post.model';
import { BlogpostService } from 'src/app/services/blogpost.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  BlogPost$?: Observable<BlogPost[]>

  constructor(private blogPostService:BlogpostService){}

  ngOnInit(): void {
    
    this.BlogPost$ = this.blogPostService.GetAllBlogPost();
    //console.log(this.BlogPost$, "  ''")
  }


}
