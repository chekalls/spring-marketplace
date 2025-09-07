package mg.ecommerce.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import mg.ecommerce.demo.model.TypeUser;
import mg.ecommerce.demo.repository.TypeUserRepository;

@Service
public class TypeUserService {
    private final TypeUserRepository typeUserRepository;
    private final static long TYPE_CLIENT_ID = 1;
    private final static long TYPE_ADMIN_ID = 2;

    public TypeUserService(
        TypeUserRepository typeUserRepository
    ){
        this.typeUserRepository = typeUserRepository;
    }

    public List<TypeUser> findAll(){
        return typeUserRepository.findAll();
    }

    public Optional<TypeUser> findById(Long id){
        return typeUserRepository.findById(id);
    }

    public Optional<TypeUser> findTypeClient(){
        return findById(TYPE_CLIENT_ID);
    }

    public Optional<TypeUser> findTypeAdmin(){
        return findById(TYPE_ADMIN_ID);
    }
}
