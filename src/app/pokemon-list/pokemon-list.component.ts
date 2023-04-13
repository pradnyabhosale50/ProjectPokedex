import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { PokeserveService } from '../service/pokeserve.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  nextpokemon: any;
  previouspokemon: any;
  allpokemon;
  notEmptyPokemon = true;
  notscrolly = true;
  exportedata: any;
  exdata: any=[];
  exdata1: any=[];
  // allpokemon = [{"name":"bulbasaur","url":"https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80"},
  //         {"name":"ivysaur","url":"https://picsum.photos/200/300?grayscale"},
  //         {"name":"venusaur","url":"https://picsum.photos/200/300/?blur"},{"name":"charmander","url":"https://picsum.photos/id/870/200/300?grayscale&blur=2"},{"name":"charmeleon","url":"https://picsum.photos/id/237/200/300"},{"name":"charizard","url":"https://picsum.photos/seed/picsum/200/300"}]
  constructor(private http: HttpClient, private spinner: NgxSpinnerService,private pokeserveService: PokeserveService,) {
 }

  ngOnInit() {
    //load List
    this.loadInitPokemon();
 }

 // load the Initial 20 pokemon
 loadInitPokemon() {
  this.pokeserveService.getallpokemon().subscribe(data => {
    console.log(data['next']);
    if(data['count'] != 0){
      data['results'].forEach(element => {
        this.exdata.push({
          'name': element.name,
          'url': element.url.replace('https://pokeapi.co/api/v2/pokemon/' , 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/')
        })
      });
      console.log("exdata:",this.exdata);
      this.exdata.forEach(element => {
        this.exdata1.push({
          'name': element.name,
          'url': element.url.replace(/\/$/, ".png")
        })
      });
      console.log("exdatanew:",this.exdata1);
      this.allpokemon = this.exdata1;
      this.nextpokemon = data['next'];
    }else{
      window.alert("No List To Show!")
    }
    
  },(error: HttpErrorResponse) => {
    //we can add router here when error accurs.
    window.alert("HTTP Error")
  });
}

//scroll down
onScrollDown() {
if (this.notscrolly && this.notEmptyPokemon) {
  this.spinner.show();
  this.notscrolly = false;
  this.loadNextPost();
 }
}

//scroll up
onScrollUp(){
    this.loadPrevPost();
    console.log("up")
  
}

// load th next 20 pokemon
loadNextPost() {
  const url = this.nextpokemon;
  console.log("url:",url);
  // call Service
  this.pokeserveService.getallnextprevpokemon(url)
  .subscribe( (data: any) => {
    if(data['count'] != 0){
    //code for image path
    data['results'].forEach(element => {
      this.exdata.push({
        'name': element.name,
        'url': element.url.replace('https://pokeapi.co/api/v2/pokemon/' , 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/')
      })
    });
    console.log("exdata:",this.exdata);
    this.exdata.forEach(element => {
      this.exdata1.push({
        'name': element.name,
        'url': element.url.replace(/\/$/, ".png")
      })
    });
     const newPost = this.exdata1;
    this.nextpokemon = data['next'];
    this.previouspokemon = data['previous'];
     this.spinner.hide();
     if (newPost.length === 0 ) {
       this.notEmptyPokemon =  false;
     }
     // add newly fetched posts to the existing post
     this.exdata1 = this.exdata1.concat(newPost);
     this.notscrolly = true;
    }else{
      window.alert("No Pokemon To Show!")
    }
   },(error: HttpErrorResponse) => {
    //we can add router here when error accurs.
    window.alert("HTTP Error")
  });
}

//load prev 20 pokemon
loadPrevPost(){
  const url = this.previouspokemon;
  this.pokeserveService.getallnextprevpokemon(url)
  .subscribe( (data: any) => {
    if(data['count'] != 0){
    //image path code
    data['results'].forEach(element => {
      this.exdata.push({
        'name': element.name,
        'url': element.url.replace('https://pokeapi.co/api/v2/pokemon/' , 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/')
      })
    });
    console.log("exdata:",this.exdata);
    this.exdata.forEach(element => {
      this.exdata1.push({
        'name': element.name,
        'url': element.url.replace(/\/$/, ".png")
      })
    });
     const newPost = this.exdata1;
    this.nextpokemon = data['next'];
    this.previouspokemon = data['previous'];
     this.spinner.hide();
     if (newPost.length === 0 ) {
       this.notEmptyPokemon =  false;
     }
     
     this.exdata1 = this.exdata1.concat(newPost);
     this.notscrolly = true;
    }else{
      window.alert("No Pokemon To Show!")
    }
   } );
}

}
