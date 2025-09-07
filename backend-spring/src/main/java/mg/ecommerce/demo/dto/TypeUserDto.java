package mg.ecommerce.demo.dto;

import mg.ecommerce.demo.model.TypeUser;

public class TypeUserDto {
    private Long id;
    private String name;
    private String description;
    
    public TypeUserDto(){}

    public TypeUserDto(TypeUser typeUser){
        copyFrom(typeUser);
    }

    public void copyFrom(TypeUser typeUser){
        this.id = typeUser.getId();
        this.name = typeUser.getName();
        this.description = typeUser.getDescription();
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    
}
