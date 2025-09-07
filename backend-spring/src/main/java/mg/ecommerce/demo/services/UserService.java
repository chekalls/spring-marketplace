package mg.ecommerce.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import mg.ecommerce.demo.model.User;
import mg.ecommerce.demo.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;


    public UserService(
        UserRepository userRepository
    ){
        this.userRepository = userRepository;
    }

    public List<User> findAllByTypeUser(Long typeUserId){
        return userRepository.findByTypeUserId(typeUserId);
    }

    public User create(
        String firstName,
        String lastName,
        String email,
        String address,
        String phone,
        String password
    ) throws Exception{
        try {
            User user = new User();
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setEmail(email);
            user.setAddress(address);
            user.setPhone(phone);
            user.setPassword(password);
            return userRepository.save(user);
        } catch (Exception e) {
            throw new Exception("Impossible de créer l'utilisateur : "+e.getMessage());
        }
    }

    public Optional<User> findById(String id){
        return userRepository.findById(id);
    }

    public Optional<User> findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public boolean login(String email,String password){
        User user = findByEmail(email).orElse(null);
        if(user==null){
            return false;
        } 
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(password, user.getPassword());
    }
}
