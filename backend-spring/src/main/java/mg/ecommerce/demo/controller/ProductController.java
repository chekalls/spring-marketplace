package mg.ecommerce.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import mg.ecommerce.demo.dto.ProductDto;
import mg.ecommerce.demo.model.Category;
import mg.ecommerce.demo.model.Product;
import mg.ecommerce.demo.services.CategoryService;
import mg.ecommerce.demo.services.FileStorageService;
import mg.ecommerce.demo.services.ProductImagesService;
import mg.ecommerce.demo.services.ProductService;
import mg.ecommerce.demo.utility.Response;
import mg.ecommerce.demo.utility.ResponseManager;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    private final CategoryService categoryService;
    private final ProductImagesService productImagesService;
    private final FileStorageService fileStorageService;

    public ProductController(
            ProductService productService,
            CategoryService categoryService,
            ProductImagesService productImagesService,
            FileStorageService fileStorageService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.productImagesService = productImagesService;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> findById(
        @PathVariable("id") String productId
    ){
        Response response = new Response();
        try {
            Product product = productService.findById(productId).get();
            if(product==null){
                ResponseManager.resourceUnavaible(response, "impossible de trouver le produit");
            }else{
                ProductDto productDto = new ProductDto(product);
                ResponseManager.success(response, productDto, "produit récupéré avec succès");
            }
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response,response.getStatus());
    }

    @GetMapping
    public ResponseEntity<Response> findAll(
            @RequestParam(name = "page", defaultValue = "0") Integer page,
            @RequestParam(name = "size", defaultValue = "15") Integer size,
            @RequestParam(name = "search", defaultValue = "") String search) {
        Response response = new Response();

        try {
            Page<ProductDto> paginatedProduct = productService.findAllPaginated(page, size);

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("liste_produit", paginatedProduct.getContent());
            responseData.put("current_page", paginatedProduct.getNumber());
            responseData.put("total_page", paginatedProduct.getTotalPages());
            responseData.put("page_size", paginatedProduct.getSize());
            responseData.put("total_element", paginatedProduct.getTotalElements());

            response.setMultidata(responseData);
            ResponseManager.success(response, "", "liste des produits récupéré avec succès");
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }

        return new ResponseEntity<>(response, response.getStatus());

    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Transactional
    public ResponseEntity<Response> create(
            @RequestParam("name") String name,
            @RequestParam("price") Double price,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("image1") MultipartFile image1, // obligatoire
            @RequestParam(value = "image2", required = false) MultipartFile image2,
            @RequestParam(value = "image3", required = false) MultipartFile image3) {
        Response response = new Response();
        try {
            Category category = this.categoryService.findById(categoryId)
                    .orElseThrow(() -> new Exception("Categorie introuvable"));

            Product product = new Product();
            product.setCategory(category);
            product.setName(name);
            product.setPrice(price);
            // product.setDescription(description);
            
            String newId = this.productService.save(product);
            product.setId(newId);

            if (image1 != null && !image1.isEmpty()) {
                String path1 = fileStorageService.save(image1);
                productImagesService.save(product,path1,true,1);
            }
            if (image2 != null && !image2.isEmpty()) {
                String path2 = fileStorageService.save(image2);
                productImagesService.save(product, path2, false, 2);
            }

            if (image3 != null && !image3.isEmpty()) {
                String path3 = fileStorageService.save(image3);
                productImagesService.save(product, path3, false, 3);                
            }

            ResponseManager.success(response, product, "Produit inséré avec succès");
        } catch (Exception e) {
            e.printStackTrace();
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response, response.getStatus());
    }

    @PostMapping("/addImage")
    public ResponseEntity<Object> addImage(
            @RequestParam("file") MultipartFile file) {
        Response response = new Response();
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Aucun fichier reçu");
            }

            String fileName = file.getOriginalFilename();
            long fileSize = file.getSize();
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response, response.getStatus());
    }
}
