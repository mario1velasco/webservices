import Vue from 'vue'
import socketio from 'socket.io-client'

export class RealTimeService {
  constructor () {
    const url = Vue.config.ENV.SERVER_URL
    this.socket = socketio(url)
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
