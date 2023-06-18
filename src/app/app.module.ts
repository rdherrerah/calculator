import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyboardComponent } from './calculator/keyboard/keyboard.component';
import { DisplayComponent } from './calculator/display/display.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { HistoryComponent } from './calculator/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    DisplayComponent,
    CalculatorComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
