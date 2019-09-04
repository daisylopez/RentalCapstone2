package com.zuitt.demo.controllers;

import com.zuitt.demo.models.Product;
import com.zuitt.demo.models.Rental;
import com.zuitt.demo.repositories.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rentals")
@CrossOrigin(origins = "http://localhost:3000")
public class RentalController {
    @Autowired
    RentalRepository rentalRepository;

    @GetMapping("/")
    public Iterable<Rental> getRental() {
        return rentalRepository.findAll();
    }

    @GetMapping("/{id}")
    public Rental getRentalById(@PathVariable Integer id) {
        return rentalRepository.findById(id).get();
    }

}
