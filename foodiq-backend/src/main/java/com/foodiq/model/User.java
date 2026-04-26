package com.foodiq.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @Column(unique = true)
    private String email;
    
    private String password;
    
    private Double goalProtein;
    
    private String preference; // veg/non-veg
    
    @ElementCollection
    private List<String> allergies;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Double getGoalProtein() { return goalProtein; }
    public void setGoalProtein(Double goalProtein) { this.goalProtein = goalProtein; }
    public String getPreference() { return preference; }
    public void setPreference(String preference) { this.preference = preference; }
    public List<String> getAllergies() { return allergies; }
    public void setAllergies(List<String> allergies) { this.allergies = allergies; }
}
