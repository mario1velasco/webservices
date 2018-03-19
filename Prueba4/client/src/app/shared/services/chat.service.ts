import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  socket = io(environment.apiBase);
  
  constructor () {
  }

  addComment (data) {
    this.socket.emit('addComment', data)
  }

  joinChatRoom (showId) {
    this.socket.emit('join', `show-id-${showId}`)
  }

  onJoinChatRoom () {
    return new Promise((resolve, reject) => {
      this.socket.on('room:joined', (data) => {
        resolve(data)
      })
    })
  }
}