import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatInputModule, ScrollDispatchModule, MatMenuModule,MatProgressSpinnerModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule, ScrollDispatchModule, MatMenuModule,MatProgressSpinnerModule],
})
export class MyOwnCustomMaterialModule { } 
