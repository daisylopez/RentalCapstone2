package com.zuitt.demo.controllers;

import com.zuitt.demo.models.Category;
import com.zuitt.demo.models.Product;
import com.zuitt.demo.repositories.CategoryRepository;
import com.zuitt.demo.repositories.ProductRepository;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("/")
    public Iterable<Product> getProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Integer id) {
        return productRepository.findById(id).get();
    }

    @PostMapping("/{category_id}")
    public Product addProduct(@RequestBody Product product, @PathVariable Integer category_id) {
//        System.out.println(product.getCategory_id());
        Category category = categoryRepository.findById(category_id).get();
        product.setCategory(category);
        return productRepository.save(product);
    }


//    @GetMapping(value = "/images/{image}",
//            produces = MediaType.IMAGE_JPEG_VALUE
//    )
//    public byte[] getImage(@PathVariable String image) throws IOException {
//        System.out.println(image);
//        InputStream in = getClass()
//                .getResourceAsStream("/resources/images/"+image);
//        return IOUtils.toByteArray(in);
//    }

private static String UPLOADED_FOLDER = "src/main/resources/static/images/";

    @PostMapping("/upload/{prod_id}")
    public String singleFileUpload(@PathVariable Integer prod_id, @RequestParam("file") MultipartFile file,
                                   RedirectAttributes redirectAttributes) {

        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "Please select a file to upload");
            return "error. no image uploaded.";
        }

        try {
            System.out.println(file.getOriginalFilename());
            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

            Product product = productRepository.findById(prod_id).get();
            product.setImage(file.getOriginalFilename());
            productRepository.save(product);

            redirectAttributes.addFlashAttribute("message",
                    "You successfully uploaded '" + file.getOriginalFilename() + "'");

        } catch (IOException e) {
            e.printStackTrace();
        }

        return file.getOriginalFilename();
    }
}
