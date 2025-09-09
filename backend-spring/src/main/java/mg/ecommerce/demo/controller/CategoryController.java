package mg.ecommerce.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import mg.ecommerce.demo.dto.CategoryDto;
import mg.ecommerce.demo.model.Category;
import mg.ecommerce.demo.services.CategoryService;
import mg.ecommerce.demo.services.FileStorageService;
import mg.ecommerce.demo.utility.Response;
import mg.ecommerce.demo.utility.ResponseManager;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final FileStorageService fileStorageService;


    public CategoryController(
            CategoryService categoryService,
            FileStorageService fileStorageService) {
        this.categoryService = categoryService;
        this.fileStorageService = fileStorageService;
    }

    @PutMapping("/image/{categoryId}")
    @Transactional
    public ResponseEntity<Response> editImage(
            @PathVariable("categoryId") Long categoryId,
            @RequestParam(value = "image", required = true) MultipartFile image) {
        Response response = new Response();
        try {
            Category category = categoryService.findById(categoryId).get();
            if (category == null) {
                ResponseManager.resourceUnavaible(response, "catégorie introuvable");
            } else {
                String path = fileStorageService.save(image);
                category.setImagePath(path);
                categoryService.update(category);
                ResponseManager.success(response, category, "catégorie modifié avec succès");
            }
        } catch (Exception e) {
            ResponseManager.serveurError(response);
            response.setMessage("blablabla");
        }
        return new ResponseEntity<>(response, response.getStatus());
    }

    @GetMapping
    public ResponseEntity<Response> findAll() {
        Response response = new Response();
        try {
            List<CategoryDto> listCategories = this.categoryService.findAll();
            ResponseManager.success(response, listCategories, "liste récupéré avec succès");
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response, response.getStatus());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> findById(
            @PathVariable("id") Long categoryID) {
        Response response = new Response();
        try {
            Category category = this.categoryService.findById(categoryID).get();
            if (category == null) {
                ResponseManager.resourceUnavaible(response, "impossible de trouver la catégorie");
            }
            CategoryDto categoryDto = new CategoryDto(category);
            categoryDto.setNbProduct(categoryService.countNbProduct(categoryID));
            ResponseManager.success(response, categoryDto, "catégorie récupérée avec succès ");
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response, response.getStatus());
    }
}
