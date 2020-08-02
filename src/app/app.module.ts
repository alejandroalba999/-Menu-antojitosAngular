import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriaComponent } from './component/categoria/categoria.component';
import { FormsModule } from '@angular/forms';
import { PlatilloComponent } from './component/platillo/platillo.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    PlatilloComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
