import { Component  , OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/models/blog-post.model';
import { BlogpostService } from 'src/app/services/blogpost.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  blogs$?: Observable<BlogPost[]>;

  constructor(private blogPostService: BlogpostService) {}
  ngOnInit(): void {
    this.blogs$ = this.blogPostService.GetAllBlogPost();
  }
}
