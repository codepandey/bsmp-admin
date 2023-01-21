import { Component, OnInit, ViewChild } from "@angular/core";
import { Item } from "../../model/item.model";
import { Router } from "@angular/router";

import { BSProductService } from "../../service/bs-product.service";
import { BSProduct } from "../../model/bs-product.model";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
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
  @ViewChild("closebuttontwo", { static: false }) closebuttontwo: any;
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
  selectedUnitObj: any = {};
  selectedPromoCodeObj: any = {};
  selectedCategoryObj: any = {};
  selectedisSubscribableObj: any = {};
  selectedPromoCode: any;
  isSubscribableArr: any;
  selectedCategory: any;
  isEdit: boolean = false;

  

  unit = [
    { id: 0, unitName: "L" },
    { id: 1, unitName: "KG" },
  ];
  unitList = [
    { id: 0, unitName: "L" },
    { id: 1, unitName: "KG" },
  ];

  promoCodes = [
    { id: 0, promoName: "MY TWENTY", value: 20 },
    { id: 1, promoName: "SMILE THIRTY", value: 30 },
    { id: 2, promoName: "HAPPY FOURTY", value: 40 },
    { id: 3, promoName: "EXCITING FIFTY", value: 50 },
    { id: 4, promoName: "NONE", value: 0 },
  ];
  promoCode = [
    { id: 0, promoName: "MY TWENTY", value: 20 },
    { id: 1, promoName: "SMILE THIRTY", value: 30 },
    { id: 2, promoName: "HAPPY FOURTY", value: 40 },
    { id: 3, promoName: "EXCITING FIFTY", value: 50 },
    { id: 4, promoName: "NONE", value: 0 },
  ];

  category = [
    { id: 0, categoryName: "Sweets" },
    { id: 1, categoryName: "Vegetables" },
    { id: 2, categoryName: "Dairy Products" },
  ];

  categoryList = [
    { id: 0, categoryName: "Sweets" },
    { id: 1, categoryName: "Vegetables" },
    { id: 2, categoryName: "Dairy Products" },
  ];
  subscribable = [
    { id: 0, sub: 'Yes', state: true },
    { id: 1,  sub: 'No', state: false},
  ];

  subscribableList = [
    { id: 0, sub: 'Yes', state: true },
    { id: 1,  sub: 'No', state: false},
  ];
  model1: any = {};


  constructor(
    private router: Router,
    private bsProectService: BSProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getAllItems();
    this.initializeAddProductForm();
    this.initializeEditProductForm();  
  }

  initializeEditProductForm() {
    this.editForm = this.formBuilder.group({
      title: "",
      unit: "",
      stockLeft: "",
      price: "",
      discount: "",
      promoCode: "",
      image: "",
      category: "",
      subscribable: "",
      description: ""
    });
  }



  cancel() {
  console.log('cancel'); 
  this.addForm.reset(); 
  // window.location.reload();
    // this.closebuttontwo.nativeElement.click();  
  }


  

  public model = {
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
}

public onSubmit() {
  let product = this.addForm.value;


  if (!this.addForm.valid) {
    return;
}


this.bsProectService.addProduct(product)
    .subscribe(async(response) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product Added",
        showConfirmButton: true,
        timer: 3000,
        timerProgressBar: true,
      });    
      await this.getAllItems();
    });
    this.closebuttonAddProduct.nativeElement.click(); 
    this.addForm.reset();
    


}



  initializeAddProductForm() {
    this.addForm = this.formBuilder.group({
      title: ["", Validators.required],
      unit: ["", Validators.required],
      stockLeft: ["", Validators.required],
      price: ["", Validators.required],
      discount: ["", Validators.required],
      promoCodes: ["", Validators.required],
      image: ["", Validators.required],
      category: ["", Validators.required],
      subscribable: ["", Validators.required],
      description: ["", Validators.required]
    });
  }





  async getAllItems() {
    let data = await this.bsProectService.getAllProdcts();
    this.products = data;
  }

  // addItem(): void {
  //   this.router.navigate(["product/add-product"]);
  // }

  get f() { return this.addForm.controls; }



  addNewProduct(product) {
    console.log(product);
    console.log(this.addForm.valid);
    
    // this.initializeAddProductForm();
    if (!this.addForm.valid) {
      return;




  }

    
    // this.bsProectService.addProduct(product)
    // .subscribe(async(response) => {
    //   Swal.fire({
    //     position: "center",
    //     icon: "success",
    //     title: "Product Added",
    //     showConfirmButton: true,
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });    
    //   await this.getAllItems();
    // });
    // this.closebuttonAddProduct.nativeElement.click();  
    
  }

  


  




  viewProduct(product: any) { 
    this.isEdit = true;
    this.initializeEditProductForm();  
    // promocode
    this.selectedPromoCode = this.promoCodes.filter((ele) => ele.promoName === product['promoCodes']); 
    this.selectedPromoCodeObj = this.selectedPromoCode[0];
    
    // unit
    this.selectedUnit = this.unit.filter((ele) => ele.unitName === product['unit']); 
    this.selectedUnitObj = this.selectedUnit[0];

    // subscribable
    this.isSubscribableArr = this.subscribable.filter((ele) => ele.state == product['subscribable']);   
    this.selectedisSubscribableObj = this.isSubscribableArr[0]; 

    // category
    this.selectedCategory = this.category.filter((ele) => ele.categoryName == product['category']);   
    this.selectedCategoryObj = this.selectedCategory[0];
   
    


    // if (!product) {
    //   this.productForm = false;
    //   return;
    // }
    this.editedProduct = clone(product);
    
  }

  updateProduct(product: any) {    
    // console.log(product);
    
    let unit = product['unit']['unitName'];
    let category = product['category']['categoryName'];
    let promo = product['promoCodes']['promoName'];
    let isSubscribable = product['subscribable']['state'];
    product['unit'] = unit;
    product['category'] = category;
    product['promoCodes'] = promo;
    product['subscribable'] = isSubscribable;  
    
    
    this.bsProectService.updateProduct(product).subscribe(async(data) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product updated",
        showConfirmButton: true,
        timer: 3000,
        timerProgressBar: true,
      });
      this.closebutton.nativeElement.click();
     await this.getAllItems();
    //  window.location.reload();
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
          `<strong style="color:red;">Your selected Product has been deleted.</strong>`,
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your item is safe :)", "error");
      }
    });
  }




 
}
