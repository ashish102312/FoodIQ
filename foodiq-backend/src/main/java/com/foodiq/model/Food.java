package com.foodiq.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "foods")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id")
    @JsonIgnore
    private Menu menu;

    private String name;
    private Integer calories;
    private Double protein;
    private Double carbs;
    private Double fats;
    private Double fiber;
    private Double sugar;
    private Double sodium;
    private Double cholesterol;
    private String micronutrients;
    private Integer healthScore;
    private String category;

    @Column(name = "net_weight")
    private Double netWeight;
}
