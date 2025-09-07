package mg.ecommerce.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mg.ecommerce.demo.dto.CategoryDto;
import mg.ecommerce.demo.model.Category;
import mg.ecommerce.demo.services.CategoryService;
import mg.ecommerce.demo.utility.Response;
import mg.ecommerce.demo.utility.ResponseManager;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;
    
    public CategoryController(
        CategoryService categoryService
    ){
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<Response> findAll(){
        Response response = new Response();
        try {
            List<CategoryDto> listCategories = this.categoryService.findAll();
            ResponseManager.success(response, listCategories, "liste récupéré avec succès");
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response,response.getStatus());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> findById(
        @PathVariable("id") Long categoryID
    ){
        Response response = new Response();
        try {
            Category category = this.categoryService.findById(categoryID).get(); 
            if(category==null){
                ResponseManager.resourceUnavaible(response, "impossible de trouver la catégorie");
            }
            CategoryDto categoryDto = new CategoryDto(category);
            categoryDto.setNbProduct(categoryService.countNbProduct(categoryID));
            ResponseManager.success(response, categoryDto, "catégorie récupérée avec succès ");
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response,response.getStatus());
    }
}
