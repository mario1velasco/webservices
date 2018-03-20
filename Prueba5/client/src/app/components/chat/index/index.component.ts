import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

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
