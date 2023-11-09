import { NgModule } from '@angular/core';
import { B2bHeaderComponent } from './components/header/b2b-header.component';
import { AgentDetailsComponent } from './components/agent-details/agent-details.component';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
    declarations: [B2bHeaderComponent, AgentDetailsComponent, LeftMenuComponent, NavigationComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    FlexLayoutModule,
    // BrowserAnimationsModule,
    MatButtonModule
  ],
  exports: [B2bHeaderComponent,NavigationComponent],
})
export class B2bHeaderModule {}
