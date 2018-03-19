import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { routes } from './app.routes';
import { ChatService } from './shared/services/chat.service';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/chats/index/index.component';
import { ChatComponent } from './components/chats/chat/chat.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
