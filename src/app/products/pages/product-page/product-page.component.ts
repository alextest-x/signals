import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-page.component.html',

})
export class ProductPageComponent {

  // constructor( private fb: FormBuilder ) {}
  //nuevo tipo de inyeccion se manda la clase que se quiere inyectar
  //se utiliza en señales
  private fb = inject( FormBuilder );

  public color:string = 'green';


  //la validacion cuando es mayor de una lleva llaves []
  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(6), Validators.email ] ]
  });


  changeColor() {

    //const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    //this.color=color;

    //simplificado
    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  }





}
