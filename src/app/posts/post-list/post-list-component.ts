import { Component, OnInit, OnDestroy} from '@angular/core';
import {Post} from '../post.model';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls :['./post-list.component.css']
})
export class PostListComponent implements OnInit ,OnDestroy {
    // posts =[
    //     {title:"First Post", content :"This is the first content"},
    //     {title:"Second Post", content :"This is second content"},
    //     {title:"Third Post", content :"This is third content"}
       
    // ];;
   posts : Post [] =[];
   private postsSub:Subscription;
   constructor(public postsService:PostsService){}
    
   ngOnInit(){
       this.postsService.getPosts();
       this.postsSub = this.postsService.getPostUpdateListener()
       .subscribe((posts: Post[])=>{
           this.posts = posts;
       });
   }
   onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }
   ngOnDestroy(){
       this.postsSub.unsubscribe();
   }
}