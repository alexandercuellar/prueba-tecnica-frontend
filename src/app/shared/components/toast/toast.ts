import { Component,signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
visible = signal(false);
title = signal('');
message = signal('');
type = signal<'success' | 'error' | 'warning'>('success');

show(
    title: string,
    message: string,
    type: 'success' | 'error' | 'warning' = 'success'
  ) {
    this.title.set(title);
    this.message.set(message);
    this.type.set(type);
    this.visible.set(true);

    setTimeout(() => {
      this.visible.set(false);
    }, 3000);
  }

  close() {
    this.visible.set(false);
  }
}
