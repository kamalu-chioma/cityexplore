import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="about-page">
      <h1>About Us</h1>
      <p>Learn more about our app and how we use AI to find spots for your activities.</p>
      <button routerLink="/use-app">Use App</button>
    </div>
  `,
  styles: [
    `.about-page { padding: 20px; text-align: center; }`
  ]
})
export class AboutComponent {}
