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

  updateItem(item: Item) : Observable<Item>{
    return this.http.put<Item>(environment.apiHost + 'items', item);
  }

  getAllRooms() : Observable<Room>{
    return this.http.get<Room>(environment.apiHost + 'rooms');
  }

  getAvailableItems(startDate: string, endDate: string): Observable<Item[]> {
    const params = { startDate, endDate };
    return this.http.get<Item[]>(environment.apiHost + 'items/available', {params});
  }

  getAvailableItemsForUpdate(startDate: string, endDate: string, exhibitionId: number): Observable<Item[]> {
    const params = { startDate, endDate, exhibitionId: exhibitionId.toString() };
    return this.http.get<Item[]>(environment.apiHost + 'items/availableForUpdate', {params});
  }


  searchItemsByName(name: string): Observable<Item> {
    return this.http.get<Item>(environment.apiHost + 'items/search/' + name);
  }

}
