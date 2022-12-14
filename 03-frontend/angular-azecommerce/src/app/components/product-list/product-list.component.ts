import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html', 
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  previuosCategoryId: number = 1;
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  //properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 8;
  theTotalElements: number = 0;

  previousKeyword: string | null;

  constructor(  private productService: ProductService,
                private route: ActivatedRoute,
                private cartService: CartService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => { this.listProducts() })
  }

  listProducts() {
    this.searchMode=this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode == true){
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
    
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //if we have a different keyword than previous, set thePageNumber to 1 (reset)
    if (this.previousKeyword != theKeyword)
    {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    //search for products using keyword
    this.productService.searchProductPaginate(this.thePageNumber-1, this.thePageSize, theKeyword).subscribe(this.processResult());

  }

  handleListProducts(){
    //check if "id" parameter is available

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');


    if (hasCategoryId){
      //get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    }
    else {
      //not category id available ... default to category id 1
      this.currentCategoryId = 1; 
    }

    //check if we have a different category than previous (Angular will reuse a component if it is currently being viewed)
    if (this.previuosCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previuosCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)

    //now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber-1 , this.thePageSize, this.currentCategoryId).subscribe(this.processResult());
  
  }

  processResult(){
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number){
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);
    
    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }

}
