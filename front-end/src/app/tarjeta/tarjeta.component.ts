import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css'
})
export class TarjetaComponent {
  @Input() name = 'Tu nombre';
  @Input() age = 0;

  likes = 0;

  incrementarLikes(): void {
    this.likes += 1;
  }

}
