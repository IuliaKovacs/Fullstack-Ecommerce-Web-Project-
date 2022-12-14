package com.azsmarthome.ecommerce.controller;


import com.azsmarthome.ecommerce.dao.ProductCategoryRepository;
import com.azsmarthome.ecommerce.dao.ProductRepository;
import com.azsmarthome.ecommerce.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("api/products")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductCategoryRepository productCategoryRepository;

    @GetMapping
    List<Product> getProducts() {
        return productRepository.findAll();
    }

    @PostMapping
    Long createProduct(@RequestBody Product product) {
        productRepository.save(product);
        return product.getId();
    }

}
