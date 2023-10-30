import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomLabelDirective } from './directives/custom-label.directive';



@NgModule({
  declarations: [
    CustomLabelDirective
  ],
  imports: [
    CommonModule
  ],

  //para utilizar las directivas en otros lados hay que exportalas
  exports: [
    CustomLabelDirective,
  ]
})

//SharedModule hay que importalo en products.module
//para utilizar todo lo que ese modulo exporte
export class SharedModule { }
