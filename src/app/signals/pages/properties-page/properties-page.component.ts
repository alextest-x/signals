import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnDestroy, OnInit {


  //otra señal
  public counter = signal(10);


  //señal con valor de User
  public user = signal<User>({
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  });

  public fullName = computed( () => `${ this.user().first_name } ${ this.user().last_name }` );


  // creando una efecto que se ejecuta cada vez que la dependecia cambia y solo tiene un callback
  // la primera vez siempre se crea y la siguiente vez cuando
  // se hace una modificaccion a una señal referencia adentro del codigo
  // se vuelve a ejecutar
  public userChangedEffect = effect( () => {
    // este no se vuelve a disparar porque no tiene una señal interna
    // console.log('userChangedEfefects triggered');
    // nuevo nombre del usuari hace refencia a la señal y solo imprime el nombre del usuario
    // y cada vez que cambia se dispara en la impresion de la consola
    console.log( this.user().first_name );       //aqui si cambia el valor porque cada vez que se escribe
    console.log(`${ this.user().first_name} - ${ this.counter() } `);
  });


  //cada segundo se ejecuta limpiando el efecto
  ngOnInit(): void {
    setInterval(() => {
      this.counter.update( current => current + 1 );

      //se limpia cuando llega a 14 y no continua las emisiones del efecto
        if ( this.counter() == 15 )
        this.userChangedEffect.destroy();
    },1000)
  }


  //para eliminar el efecto para que no se ejecute de nuevo
  ngOnDestroy(): void {
    // this.userChangedEffect.destroy();
  }

  increaseBy( value: number) {
    this.counter.update( current => current + value );
  }


 //keyof valida que no cree nuevos campos
  onFieldUpdated( field: keyof User, value: string ) {

    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });



    // current => regresa el nuevo valor del usuario
    // el nuevo valor de la señal
    // podria haber un error porque se manda el campo id y el campo value es un string
    // entonces asigna un string al id y es un valor incorrecto
    this.user.update( current => {
      return {
        ...current,  //...current operador spred
        [field]: value
      };
    });

    // cualquier mutacion que suceda en este objeto current (valor del usuario)
    // va a ejecutar un nuevo valor en la señal current = 'Hola Mundo'
    //   this.user.mutate( current => {
    //    current.first_name = 'Hola Mundo';
    //   })



    //se hace un switch para detreminar el campo id
    //y evalua el tipo de dato
    // this.user.mutate( current => {

    //   switch( field ) {
    //     case 'email':
    //       current.email = value;
    //     break;

    //     case 'first_name':
    //       current.first_name = value;
    //     break;

    //     case 'last_name':
    //       current.last_name = value;
    //     break;

    //     case 'id':
    //     lo pasamo a un numero poque veni a en un string
    //       current.id = Number(value);
    //     break;
    //   }


    // });

  }

}
