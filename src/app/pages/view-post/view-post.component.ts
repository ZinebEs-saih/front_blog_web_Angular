import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentServiceService } from '../../services/comment-service.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.css'
})
export class ViewPostComponent {

  postId=this.activatedRouted.snapshot.params['id'];
  postData:any;

  comments:any;

  commentForm!:FormGroup;

  constructor(private postService:PostService ,
              private activatedRouted:ActivatedRoute,
            private matSnackBar:MatSnackBar,
            private fb:FormBuilder,
            private commentService:CommentServiceService  ) { }

    ngOnInit(): void {
      console.log(this.postId);
      this.getCommentByPostId();

      this.getPostById();
      this.commentForm=this.fb.group({
        postedBy:[null,Validators.required],
        content:[null,Validators.required]
      })
    }


    publishComment(){
      const postedBy=this.commentForm.get('postedBy')?.value;
      const content=this.commentForm.get('content')?.value; 
        console.log(content);
        console.log(postedBy);
      this.commentService.createComment(this.postId,content,postedBy).subscribe(res=>{
        this.getCommentByPostId();

        this.matSnackBar.open("Comment Published Successfully","OK");
      },
      error=>{
        this.matSnackBar.open("Somthing Went Wrong","OK");
      }
    )


    }


    getCommentByPostId(){
      this.commentService.getCommentByPostId(this.postId).subscribe(res=>{
        console.log(res); 
        this.comments=res;    
     
        },
        error=>{
          this.matSnackBar.open("Somthing Went Wrong","OK");
        });
    }

    getPostById(){
      this.postService.getPostById(this.postId).subscribe((response:any)=>{

        this.postData=response;
          this.postService.getPostImage(this.postId).subscribe(image => {
            let objectURL = URL.createObjectURL(image);
            const imgElement = document.getElementById(`post-image-${this.postId}`);
            imgElement!.setAttribute('src', objectURL);
          });
        
        
      },error=>{
        this.matSnackBar.open("Somthing Went Wrong !!","OK")
      })
    }

    likePost(){
      this.postService.PostLike(this.postId).subscribe((response:any)=>{
        this.getPostById();
        this.matSnackBar.open("Post Liked Successfully :)","OK")

        },error=>{
          this.matSnackBar.open("Somthing Went Wrong !!","OK")
        });
    }
}
