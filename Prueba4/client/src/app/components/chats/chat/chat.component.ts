import { Message } from './../../../shared/models/message.model';
import {  Component,  OnInit} from '@angular/core';
import {  ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';

import {  ChatService} from './../../../shared/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  id: String = "";
  message:Message =new Message();
  messages:Array<Message>=[];
  text:string = "";
  user:string = "";

  constructor(
    private chat: ChatService,
    private routes: ActivatedRoute
  ) {}


  ngOnInit() {
    this.routes
      .params.subscribe(params => {
        this.id = params['id'];
      });

    this.chat.joinChatRoom(this.id);
    this.chat.socket.on('comment:added', (comment) => {
      console.log("AÑADIDO comentario");
      console.log(comment);
      this.render(comment);
    })
    this.chat.socket.on('loadOldMessages', (mns:Array<Message>) => {
      console.log("MESSAGES = ");
      this.messages=mns;
      console.log(mns);
      this.render(mns);
      // this.messages=data;
    })
  }

  onSubmitCreateForm(form:NgForm){
    this.message.text=this.text;
    this.message.username=this.user;

    console.log("Mandar message = "+this.message);    
    this.chat.socket.emit('addComment', this.message)
  }

  render (data) {
    var html = data.map(function(mess, index) {
      return(`<div>
                <strong>${mess.username}</strong>:
                <em>${mess.text}</em>
              </div>`);
    }).join(" ");
    let d1 = document.getElementById('messages');
    d1.insertAdjacentHTML('beforeend', html);
  }
}
