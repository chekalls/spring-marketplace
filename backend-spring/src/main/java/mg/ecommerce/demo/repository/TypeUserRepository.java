package mg.ecommerce.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import mg.ecommerce.demo.model.TypeUser;

@Repository
public interface TypeUserRepository extends JpaRepository<TypeUser,Long> {
    
}
