import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone: true,
  template: `
    <div class="blog-page">
      <h1>Our Blog</h1>
      <p>Read about the latest trends in travel and AI-powered recommendations.</p>
      <button routerLink="/use-app">Use App</button>
    </div>
  `,
  styles: [
    `.blog-page { padding: 20px; text-align: center; }`
  ]
})
export class BlogComponent {}
