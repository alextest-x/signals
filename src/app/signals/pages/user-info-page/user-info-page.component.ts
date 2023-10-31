import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {


  //para ocupar mi servico lo injectamos
  //buscar el usuario por el id donde el usuario inicial es el 1
  //donde mandamos el valor a la vista con userId()

  private usersService = inject(UsersServiceService);
  public userId = signal(1);

  //puede tener un User(valor de tipo User) o un undefined
  public currentUser = signal<User|undefined>(undefined);

  //otra señal con true
  public userWasFound = signal(true);

  //ponemos el fullName en la vista para que muestre el valor
  public fullName = computed<string>( () => {
    //sino tenems el usaurio entonces muestra mensaje 'Usuario no encontrado';
    if ( !this.currentUser() ) return 'Usuario no encontrado';

    //aqui tenemos simepre al usaurio
    return `${ this.currentUser()?.first_name } ${ this.currentUser()?.last_name }`;
  });


  //el metodo ngOnInit es para ejecutar la peticion httpClient
  //this.userId() es el valor de la señal
  ngOnInit(): void {
    this.loadUser( this.userId() )
  }


  loadUser( id: number ) {

    if ( id <= 0 ) return;

     //si es mayor que cero entonces pone el valor de la señal con el  id
    this.userId.set(id);

    //quita al usuario en la vista mientras se hace la consulta
    this.currentUser.set(undefined);

    //haciendo la peticion http
    this.usersService.getUserById( id )
      .subscribe({
        //emite la siguiente emision
        next: (user) => {
          //cuando no interesa el valor anterior usamos el set()
         this.currentUser.set( user );
         this.userWasFound.set(true);
        },

        //en caso de error
        error: () => {
          this.userWasFound.set(false);  //usuario no encontrado
          this.currentUser.set(undefined);  //limpando la informacion del usuario
        },
      });


  }

}
