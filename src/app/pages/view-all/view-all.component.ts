import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.css'
})
export class ViewAllComponent {

  allPosts: any[] = [];
  images: any[] = [];

  id:any;
    constructor(private postService:PostService,
                private snackBar:MatSnackBar,
                private sanitizer: DomSanitizer
    ){}

    ngOnInit(){
      
      this.getAllPosts();
    }


    getAllPosts() {
      this.postService.getAllPosts().subscribe((data: any[]) => {
        this.allPosts = data;
        this.allPosts.forEach(post => {
          this.postService.getPostImage(post.id).subscribe(image => {
            let objectURL = URL.createObjectURL(image);
            const imgElement = document.getElementById(`post-image-${post.id}`);
            imgElement!.setAttribute('src', objectURL);
          });
        });
      }, error => {
        this.snackBar.open("Something went wrong !!", "Ok");
      });
    }
    


}
