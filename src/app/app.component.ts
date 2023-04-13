import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  nextpost: any;
  previouspost: any;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
 }
 allpost;
 notEmptyPost = true;
 notscrolly = true;
  ngOnInit() {
    this.loadInitPost();
 }
 // load the Initial 6 posts
 loadInitPost() {
  const url = 'https://pokeapi.co/api/v2/pokemon';
  this.http.get(url).subscribe(data => {
    console.log(data['next']);
    this.allpost = data['results'];
    this.nextpost = data['next'];
  });
}
onScrollDown() {
if (this.notscrolly && this.notEmptyPost) {
  this.spinner.show();
  this.notscrolly = false;
  this.loadNextPost();
 }
}

onScrollUp(){
  console.log("up ok")
  if (this.notscrolly && this.notEmptyPost) {
    this.loadPrevPost();
    console.log("up")
  }
}

// load th next 6 posts
loadNextPost() {
  const url = this.nextpost;
  // return last post from the array
  const lastPost = this.allpost[this.allpost.length - 1];
  // get id of last post
  const lastPostId = lastPost.id;
  // sent this id as key value pare using formdata()
  const dataToSend = new FormData();
  dataToSend.append('id', lastPostId);
  // call http request
  this.http.get(url)
  .subscribe( (data: any) => {
     const newPost = data['results'];
    this.nextpost = data['next'];
    this.previouspost = data['previous'];
     this.spinner.hide();
     if (newPost.length === 0 ) {
       this.notEmptyPost =  false;
     }
     // add newly fetched posts to the existing post
     this.allpost = this.allpost.concat(newPost);
     this.notscrolly = true;
   });
}

loadPrevPost(){
  const url = this.previouspost;
  this.http.get(url)
  .subscribe( (data: any) => {
     const newPost = data['results'];
    this.nextpost = data['next'];
    this.previouspost = data['previous'];
     this.spinner.hide();
     if (newPost.length === 0 ) {
       this.notEmptyPost =  false;
     }
     // add newly fetched posts to the existing post
     this.allpost = this.allpost.concat(newPost);
     this.notscrolly = true;
   });
}
}
