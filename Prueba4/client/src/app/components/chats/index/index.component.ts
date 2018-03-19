import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  // room:String="";

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  renderRoom(room:String){
    console.log(room);
    this.router.navigate(['/chats', room]);
  }

}
