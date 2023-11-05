import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';

import { NavigationComponent } from './shared/components/header/components/navigation/navigation.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NavigationComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
