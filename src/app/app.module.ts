import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { ListItemComponent } from './item/list-item/list-item.component';
import { AddUserComponent } from './user/add-user/add-user.component';


import { MyProfileComponent } from './profile/my-profile/my-profile.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { LoginComponent } from './login/login.component';
import { OTPComponent } from './otp/otp.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddBrandComponent } from './brand/add-brand/add-brand.component';
import { EditBrandComponent } from './brand/edit-brand/edit-brand.component';
import { ListBrandComponent } from './brand/list-brand/list-brand.component';
import { ImageApprovalComponent } from './image-approval/image-approval.component';
import { AuthenticationService } from './service/auth.service';
import { AlertService} from './service/alert.service';
import { UserService } from './service/user.service';
import { ProductService } from './service/product.service';
import { CustomerService } from './service/customer.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemService } from './service/item.service';
import { BrandService } from './service/brand.service';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { ListUserComponent } from './user/list-user/list-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AddItemComponent } from './item/add-item/add-item.component';
import { EditItemComponent } from './item/edit-item/edit-item.component';
import { InterceptorService } from './service/interceptorService';
import { NumberDirective } from './Directives/numberOnlyDirective';
import { PaginationComponent } from './pagination/pagination.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { BSProductService } from './service/bs-product.service';
import { OrderComponent } from './order/order.component';
import { OrderService } from './service/order.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { JwtInterceptor, ErrorInterceptor } from './_helpers';


import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AddItemComponent,
    EditItemComponent,
    ListItemComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    MyProfileComponent,
    ListOrderComponent,
    OrderDetailComponent,
    LoginComponent,
    OTPComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    AddBrandComponent,
    EditBrandComponent,
    ListBrandComponent,
    ImageApprovalComponent,
    UploadImageComponent,
    AlertComponent,
    NumberDirective,
    PaginationComponent,
    AddProductComponent,
    EditProductComponent,
    ListProductComponent,
    OrderComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    })

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
      },


    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    ProductService,
    CustomerService,
    ItemService,
    BrandService,
    BSProductService,
    OrderService,



      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
