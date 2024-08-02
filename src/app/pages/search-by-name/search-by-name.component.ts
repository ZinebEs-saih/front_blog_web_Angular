import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrl: './search-by-name.component.css'
})
export class SearchByNameComponent {
  result:any[] = [];
  searchName: any="";

  constructor(private postService:PostService,
    private snackBar:MatSnackBar
  ){}

  searchByName(){
    this.postService.SearchByName(this.searchName).subscribe(data => {
      this.result = data;
      this.result.forEach(post => {
        this.postService.getPostImage(post.id).subscribe(image => {
          let objectURL = URL.createObjectURL(image);
          const imgElement = document.getElementById(`post-image-${post.id}`);
          imgElement!.setAttribute('src', objectURL);
        });
      });
      console.log(data);
    },error=>{
      this.snackBar.open('Error searching for posts', 'Close')
    });
  }
}
