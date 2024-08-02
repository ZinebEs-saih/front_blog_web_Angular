import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const BASIC_URL="http://localhost:9292/";

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(
    private http:HttpClient,

  ) { }
  
  createComment(postId:number , content:string , postedBy:string):Observable<any>{
    const params={
      postId:postId,
      postedBy:postedBy,
    }

    return this.http.post<any>(BASIC_URL+`api/comment/create`,content, {params});
  }

  getCommentByPostId(postId:number):Observable<any>{
    return this.http.get<any>(BASIC_URL+`api/comments/${postId}`);
  }
}
