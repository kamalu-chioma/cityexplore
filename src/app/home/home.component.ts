import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-page">
      <h1>Welcome to the Travel AI App!</h1>
      <p>This is the home page. Use the button below to explore the app.</p>
      <button routerLink="/use-app">Use App</button>
    </div>
  `,
  styles: [
    `.home-page { padding: 20px; text-align: center; }`
  ]
})
export class HomeComponent {}
