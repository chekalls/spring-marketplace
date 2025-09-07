package mg.ecommerce.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import mg.ecommerce.demo.dto.CategoryDto;
import mg.ecommerce.demo.model.Category;
import mg.ecommerce.demo.repository.CategoryRepository;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(
            CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDto> findAll() {
        return this.categoryRepository.findAll().stream().map(CategoryDto::new).toList();
    }

    public Optional<Category> findById(Long categoryId) {
        return this.categoryRepository.findById(categoryId);
    }

    public int countNbProduct(Long categoryId){
        return categoryRepository.countNbProduct(categoryId);   
    }
}
