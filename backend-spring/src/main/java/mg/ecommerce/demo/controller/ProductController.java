package mg.ecommerce.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import mg.ecommerce.demo.dto.ProductDto;
import mg.ecommerce.demo.model.Category;
import mg.ecommerce.demo.model.Product;
import mg.ecommerce.demo.model.ProductDescription;
import mg.ecommerce.demo.model.ProductImages;
import mg.ecommerce.demo.services.CategoryService;
import mg.ecommerce.demo.services.FileStorageService;
import mg.ecommerce.demo.services.ProductDescriptionService;
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
    private final ProductDescriptionService productDescriptionService;

    public ProductController(
            ProductService productService,
            CategoryService categoryService,
            ProductImagesService productImagesService,
            FileStorageService fileStorageService,
            ProductDescriptionService productDescriptionService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.productImagesService = productImagesService;
        this.fileStorageService = fileStorageService;
        this.productDescriptionService = productDescriptionService;
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<Response> modifyProduct(
            @PathVariable("id") String productId,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam(value = "image1", required = false) MultipartFile image1,
            @RequestParam(value = "image2", required = false) MultipartFile image2,
            @RequestParam(value = "image3", required = false) MultipartFile image3) {

        Response response = new Response();

        try {
            Product product = productService.findById(productId).orElse(null);
            if (product == null) {
                ResponseManager.resourceUnavaible(response, "produit introuvable");
                return new ResponseEntity<>(response, response.getStatus());
            }

            // Mise à jour description
            ProductDescription productDescription = product.getProductDescription();
            productDescription.setDescription(description);
            productDescription.setProduct(product);
            productDescriptionService.update(productDescription);

            // Mise à jour catégorie
            Category category = categoryService.findById(categoryId).orElse(null);
            if (category == null) {
                ResponseManager.resourceUnavaible(response, "catégorie introuvable");
                return new ResponseEntity<>(response, response.getStatus());
            }
            product.setName(name);
            product.setCategory(category);

            // Gestion des images : seulement remplacer celles fournies
            List<ProductImages> existingImages = productImagesService.findByProductId(productId);

            if (image1 != null && !image1.isEmpty()) {
                // Supprimer ancienne image principale si existante
                existingImages.stream()
                        .filter(ProductImages::isMain)
                        .findFirst()
                        .ifPresent(img -> {
                            fileStorageService.delete(img.getImagePath());
                            productImagesService.delete(img.getId());
                        });

                String path1 = fileStorageService.save(image1);
                productImagesService.save(product, path1, true, 1);
            }

            if (image2 != null && !image2.isEmpty()) {
                existingImages.stream()
                        .filter(img -> !img.isMain() && img.getSortOrder() == 2)
                        .findFirst()
                        .ifPresent(img -> {
                            fileStorageService.delete(img.getImagePath());
                            productImagesService.delete(img.getId());
                        });

                String path2 = fileStorageService.save(image2);
                productImagesService.save(product, path2, false, 2);
            }

            if (image3 != null && !image3.isEmpty()) {
                existingImages.stream()
                        .filter(img -> !img.isMain() && img.getSortOrder() == 3)
                        .findFirst()
                        .ifPresent(img -> {
                            fileStorageService.delete(img.getImagePath());
                            productImagesService.delete(img.getId());
                        });

                String path3 = fileStorageService.save(image3);
                productImagesService.save(product, path3, false, 3);
            }

            response.setMessage("Produit mis à jour avec succès");
            response.setStatus(HttpStatus.OK);
            response.setStatus_code("200");

        } catch (Exception e) {
            e.printStackTrace();
            ResponseManager.serveurError(response);
        }

        return new ResponseEntity<>(response, response.getStatus());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Response> findById(
            @PathVariable("id") String productId) {
        Response response = new Response();
        try {
            Product product = productService.findById(productId).get();
            if (product == null) {
                ResponseManager.resourceUnavaible(response, "impossible de trouver le produit");
            } else {
                ProductDto productDto = new ProductDto(product, true);
                ResponseManager.success(response, productDto, "produit récupéré avec succès");
            }
        } catch (Exception e) {
            ResponseManager.serveurError(response);
            response.setMessage(e.getMessage());
        }
        return new ResponseEntity<>(response, response.getStatus());
    }

    @GetMapping
    public ResponseEntity<Response> findAll(
            @RequestParam(name = "page", defaultValue = "0") Integer page,
            @RequestParam(name = "size", defaultValue = "15") Integer size,
            @RequestParam(name = "search", defaultValue = "") String search,
            @RequestParam(name = "withDetails", defaultValue = "false") Boolean withDetails) {
        Response response = new Response();

        try {
            Page<Product> paginatedProduct = productService.findAllPaginated(page, size, withDetails);
            Page<ProductDto> paginatedDto = paginatedProduct.map(product -> {
                ProductDto dto = new ProductDto();
                dto.copyFrom(product, withDetails);
                return dto;
            });

            Map<String, Object> responseData = new HashMap<>();
            responseData.put("liste_produit", paginatedDto.getContent());
            responseData.put("current_page", paginatedDto.getNumber());
            responseData.put("total_page", paginatedDto.getTotalPages());
            responseData.put("page_size", paginatedDto.getSize());
            responseData.put("total_element", paginatedDto.getTotalElements());

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

            ProductDescription productDescription = productDescriptionService.save(description, description, null,
                    null);
            Product product = new Product();
            product.setCategory(category);
            product.setName(name);
            product.setPrice(price);
            product.setProductDescription(productDescription);
            this.productService.save(product);

            if (image1 != null && !image1.isEmpty()) {
                String path1 = fileStorageService.save(image1);
                productImagesService.save(product, path1, true, 1);
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

            // String fileName = file.getOriginalFilename();
            // long fileSize = file.getSize();
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response, response.getStatus());
    }
}
