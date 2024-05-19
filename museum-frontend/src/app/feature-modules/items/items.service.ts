import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/env/environment";
import { Item } from "./model/item.model";
import { Room } from "./model/room.model";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient,private router: Router) { }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(environment.apiHost + 'items', item);
  }

  getItems(): Observable<Item> {
    return this.http.get<Item>(environment.apiHost + 'items');
  }

  getItem(itemId : number) : Observable<Item>{
    return this.http.get<Item>(environment.apiHost + 'items/' + itemId);
  }

  getItemsForDisplay() : Observable<Item>{
    return this.http.get<Item>(environment.apiHost + 'items/forDisplay');
  }

  updateItem(item: Item) : Observable<Item>{
    return this.http.put<Item>(environment.apiHost + 'items', item);
  }

  putIntoRoom(itemId: number, roomId: number) : Observable<Item>{
    return this.http.put<Item>(environment.apiHost + 'items/putIntoRoom/' + itemId + '/' + roomId, null);
  }

  getAllRooms() : Observable<Room>{
    return this.http.get<Room>(environment.apiHost + 'rooms');
  }


  searchItemsByName(name: string): Observable<Item> {
    return this.http.get<Item>(environment.apiHost + 'items/search/' + name);
  }

}
