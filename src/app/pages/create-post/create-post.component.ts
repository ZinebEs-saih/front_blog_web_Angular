import { N } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  postForm!: FormGroup;
  tags:string[]=[];
  imgFileUrl!:string;

  constructor(private fb:FormBuilder,
              private router:Router,
              private snackBar:MatSnackBar,
              private postService:PostService
            ) { 
              
             

  }

  selectFile(event:any){
    if(event.target.files.length>0){
      let file=event.target.files[0];
      this.postForm.patchValue({
          fileSource:file,
          fileName :file.name
      });
      this.imgFileUrl = window.URL.createObjectURL(file);
    }
  }

  ngOnInit(){
    this.postForm=this.fb.group({
        name: [null,Validators.required],
        content:[null,Validators.required,Validators.maxLength(5000)],
        img:[null,Validators.required],
        postedBy:[null,Validators.required],
        fileSource: [null],
        fileName: ['']

    })
  }

  


  add(event:any){
    const value=(event.value || '').trim();
    if(value){
      this.tags.push(value);
    }

    event.chipInput.clear();

  }

  remove(tag:any){
    const index =this.tags.indexOf(tag);
    if(index >= 0){
      this.tags.splice(index,1);
    }
  }

  createPost(){
    let formData = new FormData();
   

      formData.set('img',this.postForm.value.fileSource);
      formData.set('name',this.postForm.value.name);
      formData.set('content',this.postForm.value.content);
      formData.set('postedBy',this.postForm.value.postedBy);
      formData.set('tags',JSON.stringify(this.tags));
    


    /*formData.append('content', this.postForm.get('content')!.value || '');
    formData.append('postedBy', this.postForm.get('postedBy')!.value || '');
    formData.set('tags', JSON.stringify(this.tags));
    formData.append('img', this.imgFileUrl);*/
    console.log(formData);
      
      this.postService.createdNewPost(formData).subscribe(res=>{
        this.snackBar.open("Post Created Successfully","ok")
        this.router.navigateByUrl("/");
    },error=>{
        this.snackBar.open("Somthing Went Wrong !!","ok")
    });
  }



  

  
}
