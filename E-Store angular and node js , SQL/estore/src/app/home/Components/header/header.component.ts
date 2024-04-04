import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CategoriesStoreItem } from '../../services/CategoriesStoreItem';
import { SearchKeyword } from '../../types/searchKeyword.type';
import { Subscription,  forkJoin  } from 'rxjs';
import {  filter  } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { CartStoreItem } from '../../services/Cart/cart.storeItem';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnDestroy {

  //faSearch = faSearch;
  subscriptions: Subscription = new Subscription();

  @Output()
  searchClicked: EventEmitter<SearchKeyword> =
    new EventEmitter<SearchKeyword>();

  displaySearch: boolean = true;
  isUserAuthenticated: boolean = false;
  userName: string = '';

  constructor(public categoryStore: CategoriesStoreItem , private router: Router  ,public cartStore: CartStoreItem  ,public userService: UserService
    ) {
    router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event) => {
          this.displaySearch =
            (event as NavigationEnd).url === '/home/products' ? true : true;
        });

        
    this.subscriptions.add(
      this.userService.isUserAuthenticated$.subscribe((result) => {
        this.isUserAuthenticated = result;
      })
    );
      
    this.subscriptions.add(
      this.userService.loggedInUser$.subscribe((result) => {
        this.userName = result.firstName;
      })
    );

    }



  onClickSearch(Keyword : string , categoryId: string)
  {
    this.searchClicked.emit({categoryId: parseInt(categoryId) , Keyword: Keyword});
  }

  navigateToCart()
  {
    this.router.navigate(['home/cart']);
  }

  pastOrders()
  {
    this.router.navigate(['home/pastorders']);
  }
  logout(): void {
    this.userService.logout();
    this.router.navigate(['home/products']);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
