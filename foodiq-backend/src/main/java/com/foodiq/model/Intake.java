package com.foodiq.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "intake_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Intake {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_id")
    private Food food;

    private Double quantity;
    private LocalDateTime consumedAt;

    @PrePersist
    protected void onCreate() {
        if (consumedAt == null) {
            consumedAt = LocalDateTime.now();
        }
    }
}
