import { NgModule } from '@angular/core';
import { BaseWidget } from './components/base-widget.component';

import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BaseWidget],
  imports: [
    CommonModule
  ],
  exports: [BaseWidget]
})
export class EfLibraryModule { }