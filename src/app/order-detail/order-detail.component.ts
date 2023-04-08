import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatTableDataSource } from "@angular/material";
import { MatPaginator } from "@angular/material/paginator";
import { OrderService } from "../service/order.service";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit {
  displayedColumns = ["order_id", "Product_name", "quantity", "user_name", 'time'];
  //dataSource: MatTableDataSource<UserData>;
  dataSource: MatTableDataSource<OrderDetails>;
  allOrders;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private orderService: OrderService) {
    
  }
  
  ngOnInit() {    
    this.getAllOrders();
  }

  async getAllOrders() {    
    this.allOrders = await this.orderService.getAllOrders();
    this.dataSource = new MatTableDataSource(this.allOrders);
    this.ngAfterViewInit();
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  
}

export interface OrderDetails {
  order_id: string;
  Product_name: string;
  quantity: string;
  user_name: string;
  time: string;
  ip_address: string;
}
