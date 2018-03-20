import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from './../../../shared/services/chat.service';
import { Message } from './../../../shared/models/message.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message:Message=new Message();
  previousComments:Array<Message>=[];
  id: String = "";
  user: String = "";
  texto: String = "";
  lengua: String = "";

  constructor(
    private chat:ChatService,
    private routes: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.routes
    .params.subscribe(params => {
      this.id = params['id'];
    });
    
    this.chat.joinChatRoom(this.id);

    this.previousComments = this.chat.socket.on('previousComments',comments=>{
      this.previousComments= comments;
      this.render(comments);
    });
    
    this.chat.socket.on('comment:added', (comment) => {
      console.log("AÑADIDO comentario");
      console.log(comment);
      this.render(comment);
    })
  }

  onSubmitCreateForm(form:NgForm){
    this.message.created_by=this.user;
    this.message.text=this.texto;
    this.message.lenguage=this.lengua;
    console.log("Mandar message = ");
    console.log(this.message);
        
    this.chat.socket.emit('addComment', this.message)
  }

  disconnect(){
    console.log("Disconnect.");
    this.chat.socket.disconnect();
    this.router.navigate(['/chats']);
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
