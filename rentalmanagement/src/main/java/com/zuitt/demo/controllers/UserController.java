package com.zuitt.demo.controllers;

import com.zuitt.demo.models.User;
import com.zuitt.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        String hashedpw = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedpw);
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        User foundUser = userRepository.findByUsername(user.getUsername());
        if(foundUser != null && BCrypt.checkpw(user.getPassword(), foundUser.getPassword())) {
            return foundUser;
        }
        return null;
    }
}
