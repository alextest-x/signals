import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  //este selector va al html como una directiva para el mensaje personalizado
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {




    //creamos htmlElement? para tener control del elemento 'el' del constructor
    //donde va al span de la etiqueta
    //htmlElement?: es de tipo HTMLElement
  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;


  //para recibir el color de ese componente ponemos @input
  //se pone set para cambiar el valor a donde va hacer el cambio de la directiva
  @Input() set color( value: string ) {
    this._color = value;
    //se manda llamar cada vez que el color cambie
    this.setStyle();
  }

  @Input() set errors( value: ValidationErrors | null | undefined ) {
    this._errors = value;
    this.setErrorMessage();
  }

    //hace una inyeccion de dependencias
  constructor( private el: ElementRef<HTMLElement> ) {
    //console.log('constructor de la directiva');
    console.log( el );
    this.htmlElement = el;

    //envia a la vista desde la directiva que llamo al constructor
    //cambio su valor internamente y podemos tener el control de ese elemento
    this.htmlElement.nativeElement.innerHTML='HolaMundo';

  }

  ngOnInit(): void {
    console.log('Directiva - NgOnInit');
    //aqui se inicializa el componente y cambia el color
    this.setStyle();
  }


  setStyle():void {
    //sino tare nada se sale
    if ( !this.htmlElement )return;

     //cambia el estilo
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage():void {
    if ( !this.htmlElement )return;
    if ( !this._errors ) {
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }

    //arreglo con los errores
    const errors = Object.keys(this._errors);
    console.log(errors)

    if ( errors.includes('required') )  {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido.';
      return;
    }

    if ( errors.includes('minlength') )  {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];

      this.htmlElement.nativeElement.innerText = `Mínimo ${current}/${ min } caracteres.`;
      return;
    }


    if ( errors.includes('email') )  {
      this.htmlElement.nativeElement.innerText = 'No tiene formato de correo.';
      return;
    }


  }


}
