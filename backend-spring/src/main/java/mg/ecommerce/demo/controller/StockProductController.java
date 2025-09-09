package mg.ecommerce.demo.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import mg.ecommerce.demo.dto.StockProductDto;
import mg.ecommerce.demo.model.Product;
import mg.ecommerce.demo.model.StockProduct;
import mg.ecommerce.demo.services.ProductService;
import mg.ecommerce.demo.services.StockProductService;
import mg.ecommerce.demo.utility.Response;
import mg.ecommerce.demo.utility.ResponseManager;

@RestController
@RequestMapping("/stock")
public class StockProductController {
    private final StockProductService stockProductService;
    private final ProductService productService;

    public StockProductController(
            StockProductService stockProductService,
            ProductService productService) {
        this.stockProductService = stockProductService;
        this.productService = productService;
    }

    @GetMapping("{idProduct}")
    public ResponseEntity<Response> getProductStock(
            @PathVariable("idProduct") String idProduct) {
        Response response = new Response();
        try {
            List<StockProductDto> stockProductDtos = stockProductService.findByProductId(idProduct)
                    .stream()
                    .map(StockProductDto::new)
                    .toList();
            ResponseManager.success(response, stockProductDtos, "stocks du produit récupérer avec succès");
        } catch (Exception e) {
            ResponseManager.serveurError(response);
        }
        return new ResponseEntity<>(response, response.getStatus());
    }

    @PostMapping("{idProduct}")
    public ResponseEntity<Response> supplyStock(
            @PathVariable("idProduct") String idProduct,
            @RequestBody StockProductDto request) {

        Response response = new Response();

        try {

            Integer quantity = request.getQuantity();
            String serialNumber = request.getSerialNumber();
            LocalDate expirationDate = request.getExpirationDate();

            Optional<Product> optionalProduct = productService.findById(idProduct);

            if (optionalProduct.isEmpty()) {
                ResponseManager.resourceUnavaible(response, "Produit introuvable");
                return new ResponseEntity<>(response, response.getStatus());
            }

            Product product = optionalProduct.get();

            if (quantity == null || quantity <= 0) {
                ResponseManager.badRequest(response, "Quantité invalide");
                return new ResponseEntity<>(response, response.getStatus());
            }

            StockProduct stockProduct = stockProductService.save(product, quantity, serialNumber, expirationDate);

            ResponseManager.success(response, stockProduct, "Stock réapprovisionné avec succès");

        } catch (Exception e) {
            e.printStackTrace();
            ResponseManager.serveurError(response);
        }

        return new ResponseEntity<>(response, response.getStatus());
    }

}
