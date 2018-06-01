import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolver implements Resolve<IProduct> {

    constructor(private productService: ProductService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<IProduct> {
        let id = route.params['id'];
        if (isNaN(id)) {
            console.log(` id was not found : ${id}`);
            this.router.navigate(['/products']);
            return Observable.of(null);
        }
        return this.productService.getProduct(+id)
        .map( product => {
            if (product) {
                return product
            }
            console.log(`product was not found Sir: ${id}`);
            this.router.navigate(['/products']);
            return null;
        })
        .catch( error => {
            console.log(`error is : ${error}`);
            this.router.navigate(['/products']);
            return Observable.of(null)
        })
    }

}