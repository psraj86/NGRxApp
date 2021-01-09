import { ViewUserComponent } from './containers/view-user/view-user.component';
import { PostComponent } from './containers/post/post.component';
import { UsersComponent } from './containers/users/users.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'users', component: UsersComponent
      },
      {
        path: 'user/:id', component: ViewUserComponent
      },
      {
        path: 'post', component: PostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
