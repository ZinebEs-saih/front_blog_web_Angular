import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from'@angular/material/toolbar';
import {MatIconModule} from'@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from  '@angular/material/form-field' ;
import { FormGroup, FormControl, ReactiveFormsModule, } from '@angular/forms';
import { FormsModule } from '@angular/forms';  // <<<< import it here
import { CreatePostComponent } from './pages/create-post/create-post.component';
import {MatChipsModule} from  '@angular/material/chips' ;
import {MatInputModule} from '@angular/material/input';
import {MatGridList,MatGridTile} from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { SearchByNameComponent } from './pages/search-by-name/search-by-name.component'; // Importer HttpClientModule




@NgModule({
  declarations: [
    AppComponent,
    CreatePostComponent,
    ViewAllComponent,
    ViewPostComponent,
    SearchByNameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatChipsModule,MatInputModule,
    HttpClientModule,
    MatGridList ,
    MatGridTile,
    MatInput,
    FormsModule 
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
