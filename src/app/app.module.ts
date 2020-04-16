import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,
 } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DrumMachineComponent } from './drum-machine/drum-machine.component';


@NgModule({
  imports:      [ BrowserModule,     ReactiveFormsModule,
 ],
  declarations: [ AppComponent, HelloComponent, DrumMachineComponent ],
  bootstrap:    [ AppComponent ],
  providers: []
})
export class AppModule { }
