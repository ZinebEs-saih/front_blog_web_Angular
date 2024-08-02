import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL="http://localhost:9292/";
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http:HttpClient,
  ) { }

  createdNewPost(data:any): Observable<any>{
    return this.http.post(BASIC_URL+"api/posts",data);
  }


  getAllPosts(): Observable<any>{
    return this.http.get(BASIC_URL+"api/posts");
  }

  getPostImage(postId: number) {
    return this.http.get(BASIC_URL+`api/posts/${postId}/image`, { responseType: 'blob' });
  }
  getPostById(postId:number): Observable<any>{
    return this.http.get(BASIC_URL+`api/posts/${postId}`);
  }
  PostLike(postId:number){
    return this.http.put(BASIC_URL+`api/posts/${postId}/like`,{});
  }

  SearchByName(name:string):Observable<any>{
    return this.http.get(BASIC_URL+`api/posts/search/${name}`);
  }



}
