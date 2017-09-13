import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartService } from './services/chart/chart.service';
import { BootstrapService } from './services/common/bootstrap-service';
import { ComponentHolderService } from './services/common/component-holder.service';
import { CustomReuseStrategy } from './services/common/custom-reuse-strategy';
import { AuthGuard } from './shared';
import { RestURLUtilService } from './services/common/rest-urlutil.service'
import { RestUtilService } from './services/common/rest-util.service';
import { UserService } from './services/user/user.service';
import { CustomToastOptions } from './util/custom-toast-options';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { DashboardService } from './services/dashboard/dashboard.service';
import { FilterService } from './services/filter/filter-service';
import { RouteReuseStrategy } from '@angular/router';
import { CookieService } from 'angular2-cookie';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(httpClient, '/assets/i18n/', '.json');
}
@NgModule({
    declarations: [
    AppComponent,
    ],
    imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    ToastModule.forRoot(),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
    ],
    providers: [
    AuthGuard,
    RestURLUtilService,
    RestUtilService,
    UserService,
    DashboardService,
    FilterService,
    CookieService,
    ChartService,
    ComponentHolderService,
    BootstrapService,
    { provide: ToastOptions, useClass: CustomToastOptions },
    //    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
