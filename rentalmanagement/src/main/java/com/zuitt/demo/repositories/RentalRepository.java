package com.zuitt.demo.repositories;

import com.zuitt.demo.models.Rental;
import org.springframework.data.repository.CrudRepository;

public interface RentalRepository extends CrudRepository<Rental, Integer> {
}
