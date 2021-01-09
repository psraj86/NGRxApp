import { MaterialModule } from './material.module';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/layout/header/header.component';
import { LayoutComponent } from './components/layout/layout/layout.component';
import { PostComponent } from './containers/post/post.component';
import { UsersComponent } from './containers/users/users.component';
import { ViewUserComponent } from './containers/view-user/view-user.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostCardComponent } from './components/post-card/post-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LayoutComponent,
    PostComponent,
    UsersComponent,
    ViewUserComponent,
    UserCardComponent,
    UserListComponent,
    UpdateUserComponent,
    PostListComponent,
    PostCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FlexModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
