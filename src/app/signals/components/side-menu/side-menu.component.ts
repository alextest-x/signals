import { Component, signal } from '@angular/core';


interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  // se define una señal es de tipo primitivo como un bolean
  // public menuItems = signal(1);
  // lleva un valor 1 o cualquier valor que nos indica en donde se esta usando ese valor
  // y notifica y actualiza en el html
  // nos avisa en donde se estan usando esa señal o se ha cambiado ese valor  y actualiza

  // menuItems se define como una señal
  public menuItems = signal<MenuItem[]>([
    { title: 'Contador',   route: 'counter' },
    { title: 'Usuario',    route: 'user-info' },
    { title: 'Mutaciones', route: 'properties' },
  ]);

  // de forma tradicional
  // public menuItems: MenuItem[] = [
  //   { title: 'Contador', route: 'counter' },
  //   { title: 'Usuario', route: 'user-info' },
  //   { title: 'Mutaciones', route: 'properties' },
  // ];

}
