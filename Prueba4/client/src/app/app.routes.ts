import { ChatComponent } from './components/chats/chat/chat.component';
import { IndexComponent } from './components/chats/index/index.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'chats', pathMatch: 'full' },
    { path: 'chats', component: IndexComponent },
    { path: 'chats/:id', component: ChatComponent}
];