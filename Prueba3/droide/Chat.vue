<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Chat room: {{showId}}
        </p>
        <a class="card-header-icon">
      <span class="icon">
        <i class="fa fa-angle-down"></i>
      </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">
          <ul ref="content-list">
            <!-- <li v-for="message in messages">
              Message: {{message.message}}
              <small>User: {{message.user}}</small>
            </li> -->
          </ul>
          <div class="editor">
            <div class="editor-section">
              <div class="user">User</div>
              <div class="msg">Message</div>
            </div>
            <div class="editor-section">
              <div @input="onUserChange"
                   class="user content-editable"
                   ref="user"
                   contenteditable="true"></div>
              <div @input="onMsgChange"
                   class="msg content-editable"
                   ref="message"
                   contenteditable="true"
                   @keypress="onAddComment"></div>

              <a contenteditable="false"
                 class="button is-primary" @click="onAddComment">Send</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { RealTimeService } from '../../services/'

  export default {
    name: 'Chat',
    props: {
      showId: {
        type: Number
      }
    },
    data () {
      return {
        user: '',
        message: '',
        messages: [],
        service: null
      }
    },
    methods: {
      ...mapActions([
        'addComment',
        'joinChatRoom'
      ]),
      moveScroll: function () {
        const $ref = this.$refs['content-list']
        const lastLi = $ref.querySelector('li:last-child')
        if (lastLi !== null) {
          $ref.scrollTop = lastLi.offsetTop - 50
        }
      },
      onAddComment (event) {
        const isUserEmpty = this.user === ''
        const isMessageEmpty = this.message === ''
        if (event.which === 13 || event instanceof MouseEvent) {
          event.preventDefault()
          if (!isUserEmpty && !isMessageEmpty) {
            const comment = {
              showId: this.showId,
              user: this.user,
              message: this.message
            }
            this.service.addComment(comment)
            this.$refs.user.textContent = ''
            this.$refs.message.textContent = ''
            this.user = ''
            this.message = ''
            this.messages.push(comment)
            this.moveScroll()
          }
        }
      },
      initSocket () {
        this.service = new RealTimeService()
        this.service.joinChatRoom(this.showId)
        this.service.socket.on('comment:added', (comment) => {
          this.messages.push(comment)
          this.moveScroll()
        })
      },
      onUserChange ({target}) {
        this.user = target.innerText
      },
      onMsgChange ({target}) {
        this.message = target.innerText
      }
    },
    mounted () {
      this.initSocket()
    }
  }
</script>

<style lang='scss' scoped src="./Chat.scss"></style>
