import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentLayoutComponent } from './components/layout/content-layout/content-layout.component';
import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NavService } from "./services/nav.service";
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from './components/loader/loader.component';
import { CustomizerComponent } from './components/customizer/customizer.component';
import { CustomizerService } from './services/customizer.service';
import { DateLocalePipe } from './services/utils/date-locale.pipe';
import { NgxSpinnerModule } from "ngx-spinner";
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContentLayoutComponent,
    FeatherIconsComponent,
    BreadcrumbComponent,
    CustomizerComponent,
    ToggleFullscreenDirective,
    LoaderComponent,
    DateLocalePipe,
    ConfirmationModalComponent
  ],
  imports: [
    NgxSpinnerModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    FeatherIconsComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    LoaderComponent,
    DateLocalePipe,
    ConfirmationModalComponent
  ],
  providers: [
    NavService,
    CustomizerService
  ]
})
export class SharedModule { }

