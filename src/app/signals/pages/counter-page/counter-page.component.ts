import { Component, computed, signal } from '@angular/core';


@Component({
  templateUrl: './counter-page.component.html',

})
export class CounterPageComponent {


  //creando una señal para que angular sepa en donde se esta utilizando el counter
  //en la vista ponemos counter() y nos regresa el valor
  //solo para lectura
  public counter = signal(10);


  //señal computada computed de solo lectura o update  se pueen cambiar el valor como en un servicio
  // funcion que retorna un valor y basado en ese valor podemos tener referencia a otra señales
  // y cuando esas señales cambia ese valor vuelve a computar

  // squareCounter esta pendiente de las señales o de todas las señales que esten dentro el
  // del metodo computado si el counter cambia o sus señales internas vuele a computar el valor
  // y actualiza todos los lugares donde se utiliza la señal
  public squareCounter = computed( () => this.counter() * this.counter() );


  increaseBy( value: number ) {
    //current es el valor actual de la señal => el value que es el nuevo valor de retorno
    this.counter.update( current => current + value );

  }

}
