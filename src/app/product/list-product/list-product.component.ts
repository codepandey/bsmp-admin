import { Component, OnInit, ViewChild } from "@angular/core";
import { Item } from "../../model/item.model";
import { Router } from "@angular/router";

import { BSProductService } from "../../service/bs-product.service";
import { BSProduct } from "../../model/bs-product.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { clone } from "lodash";
import Swal from "sweetalert2";
import { first } from "rxjs/operators";
import { async } from "rxjs/internal/scheduler/async";

@Component({
  selector: "app-list-product",
  templateUrl: "./list-product.component.html",
  styleUrls: ["./list-product.component.scss"],
})
export class ListProductComponent implements OnInit {
  @ViewChild("closebutton", { static: false }) closebutton: any;
  @ViewChild("closebuttonAddProduct", { static: false }) closebuttonAddProduct: any;
  public popoverTitle = "Are You Sure to Delete??";
  public popoverMessage = `<strong>This will delete parmanently</strong>`;
  public confirmClicked = false;
  public cancelClicked = false;
  editForm: FormGroup;
  public products: BSProduct[] = [];
  addForm!: FormGroup;
  loading = false;
  submitted = false;
  

  name: string;
  err;
  item: any;

  productForm: boolean = false;
  editProductForm: boolean = false;
  isNewForm: boolean;
  addProduct: any = {};
  editedProduct: any = {};
  data;
  selectedUnit: any;
  selectedPromoCode: any;

  unit = [
    { id: 1, unitName: "L" },
    { id: 2, unitName: "Kg" },
  ];

  promoCodes = [
    { id: 0, promoCode: "MY TWENTY", value: 20 },
    { id: 1, promoCode: "SMILE THIRTY", value: 30 },
    { id: 2, promoCode: "HAPPY FOURTY", value: 40 },
    { id: 3, promoCode: "EXCITING FIFTY", value: 50 },
    { id: 4, promoCode: "NONE", value: 0 },
  ];

  category = [
    { id: 1, categoryName: "Sweets" },
    { id: 2, categoryName: "Vegetables" },
    { id: 3, categoryName: "Dairy Product" },
  ];
  subscribable = [
    { id: 1, value: 'Yes', state: true },
    { id: 2,  value: 'No', state: false},
  ];

  constructor(
    private router: Router,
    private bsProectService: BSProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllItems();
    this.initializeAddProductForm();

    this.editForm = this.formBuilder.group({
      title: "",
      unit: "",
      stockLeft: "",
      price: "",
      discount: "",
      promoCodes: "",
      image: "",
      category: "",
      subscribable: "",
      description: ""
    });
  }


initializeAddProductForm() {
  this.addForm = this.formBuilder.group({
    title: "",
    unit: "",
    stockLeft: "",
    price: "",
    discount: "",
    promoCodes: "",
    image: "",
    category: "",
    isSubscribable: Boolean,
    description: ""
  });
}



  async getAllItems() {
    let data = await this.bsProectService.getAllProdcts();
    this.products = data;
  }

  addItem(): void {
    this.router.navigate(["product/add-product"]);
  }



  addNewProduct(product) {
    this.bsProectService.addProduct(product)
    .subscribe((response) => {
      console.log('response ', response);      
    });
    this.closebuttonAddProduct.nativeElement.click();  
    
  }

  


  filterPromoCodeIndex() {
    const avengers = this.promoCodes.filter(code => code.promoCode === 'Avengers');
  }




  viewProduct(product) {    
    let pCode = this.promoCodes.filter(code => code.promoCode === product['promoCodes']);
    console.log('pCode ', pCode);
    
    this.selectedPromoCode = this.promoCodes[pCode[0]['id']];
    console.log('selectedPromoCode ', this.selectedPromoCode);    
    this.selectedUnit = this.unit[product.unit== "L" ? 0 : 1];    
    console.log("selectedUnit ", this.selectedUnit);


    if (!product) {
      this.productForm = false;
      return;
    }
    this.editedProduct = clone(product);
  }

  updateProduct(product: any) {
    this.bsProectService.updateProduct(product).subscribe((data) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item updated",
        showConfirmButton: true,
        timer: 3000,
        timerProgressBar: true,
      });
      this.closebutton.nativeElement.click();
      this.getAllItems();
    });
  }

  Search() {
    if (this.name !== "") {
    } else if (this.name === "") {
      this.ngOnInit();
    }
    this.products = this.products.filter((res) => {
      return res.title.toLowerCase().match(this.name.toLowerCase());
    });
  }

  trackUser(item: { id: any }) {
    return item ? item.id : undefined;
  }

  deleteProduct(product) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        this.bsProectService.deleteProduct(product.id).subscribe(async(data) => {
         await this.getAllItems();
        });
        Swal.fire(
          "Deleted!",
          `<strong style="color:red;">Your selected Item has been deleted.</strong>`,
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your item is safe :)", "error");
      }
    });
  }
}
