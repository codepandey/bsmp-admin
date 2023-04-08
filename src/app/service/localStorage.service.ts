import { Injectable } from "@angular/core";
import { v4 as uuid } from "uuid";


@Injectable({
    providedIn: 'root'
  })


export class LocalStorageService {
    // public list: string[] = [];
    public create_UUID() {
     return  uuid();
    }
  
    // create_UUID() {
    //   let dt = new Date().getTime();
    //   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    //     var r = (dt + Math.random() * 16) % 16 | 0;
    //     dt = Math.floor(dt / 16);
    //     return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    //   });
    // }
  }
  