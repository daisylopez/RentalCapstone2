package com.zuitt.demo.controllers;

import com.zuitt.demo.models.Category;
import com.zuitt.demo.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("/")
    public Iterable<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Integer id) {
        return categoryRepository.findById(id).get();
    }

    @PostMapping("/")
    public Category addCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }
}
