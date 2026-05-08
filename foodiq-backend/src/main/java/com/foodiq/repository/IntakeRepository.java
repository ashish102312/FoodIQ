package com.foodiq.repository;

import com.foodiq.model.Intake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface IntakeRepository extends JpaRepository<Intake, Long> {
    List<Intake> findByUserIdOrderByConsumedAtDesc(Long userId);
    
    @Query("SELECT i FROM Intake i WHERE i.user.id = :userId AND i.consumedAt >= :startDate AND i.consumedAt <= :endDate")
    List<Intake> findByUserIdAndConsumedAtBetween(
        @Param("userId") Long userId, 
        @Param("startDate") LocalDateTime startDate, 
        @Param("endDate") LocalDateTime endDate
    );
}
