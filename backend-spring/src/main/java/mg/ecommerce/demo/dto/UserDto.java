package mg.ecommerce.demo.dto;

import mg.ecommerce.demo.model.User;

public class UserDto {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phone;

    private String password;
    private Long typeUserId;

    public UserDto() {
    }

    public UserDto(User user) {
        copyFrom(user);
    }

    public void copyFrom(User user) {
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = (user.getLastName() != null) ? user.getLastName() : "";
        this.email = (user.getEmail() != null) ? user.getEmail() : "";
        this.address = (user.getAddress() != null) ? user.getAddress() : "";
        this.password = (user.getPassword() != null) ? user.getPassword() : "";
        this.typeUserId = (user.getTypeUser() != null) ? user.getTypeUser().getId() : null;
        this.phone = user.getPhone();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getTypeUserId() {
        return typeUserId;
    }

    public void setTypeUserId(Long typeUserId) {
        this.typeUserId = typeUserId;
    }

}
