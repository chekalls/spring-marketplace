package mg.ecommerce.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import mg.ecommerce.demo.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,String>{
    Optional<User> findByEmail(String email);


    @Query("SELECT u FROM User u WHERE u.typeUser.id = :type_user_id")
    List<User> findByTypeUserId(@Param("type_user_id") Long typeUserId);
}