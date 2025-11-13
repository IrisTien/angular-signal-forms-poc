import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="navigation">
      <div class="nav-container">
        <h2>Angular Forms Demo</h2>
        <div class="nav-links">
          <a 
            routerLink="/basic-signal" 
            routerLinkActive="active"
            class="nav-link signal-link">
            👩🏻‍💻 Basic Signal Form
          </a>
          <a 
            routerLink="/basic-traditional" 
            routerLinkActive="active"
            class="nav-link signal-link">
            🙇 Basic Reactive Traditional Form
          </a>
          <a 
            routerLink="/signal-forms" 
            routerLinkActive="active"
            class="nav-link signal-link">
            🚀 Signal Forms
          </a>
          <a 
            routerLink="/traditional-forms" 
            routerLinkActive="active"
            class="nav-link traditional-link">
            📝 Traditional Forms
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navigation {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
      }
    }

    h2 {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }

    .nav-links {
      display: flex;
      gap: 20px;
    }

    .nav-link {
      padding: 12px 24px;
      border-radius: 25px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      
      &.signal-link {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        
        &:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }
        
        &.active {
          background: #007acc;
          border-color: white;
        }
      }
      
      &.traditional-link {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        
        &:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }
        
        &.active {
          background: #ff6b35;
          border-color: white;
        }
      }
    }
  `]
})
export class NavigationComponent {}