import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxsStoragePluginModule, StorageOption} from "@ngxs/storage-plugin";
import {NgxsFormPluginModule} from "@ngxs/form-plugin";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsModule} from "@ngxs/store";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material.module";
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {NgxMaskModule} from "ngx-mask";

// In-Memory DB
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './services/in-memory-data.service';

// App Related Imports
import {appState} from "./store/states/app.state";
import {environment} from "../environments/environment";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuestionnaireService} from "./services/questionnaire.service";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {QuestionnaireState} from "./store/states/questionnaire.state";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxsModule.forRoot(appState, {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      storage: StorageOption.SessionStorage,
      key: [QuestionnaireState]
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    }),
    NgxsFormPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    QuestionnaireService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
