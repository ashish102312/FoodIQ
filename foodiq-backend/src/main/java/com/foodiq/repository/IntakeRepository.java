package com.foodiq.repository;

import com.foodiq.model.Intake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface IntakeRepository extends JpaRepository<Intake, Long> {

    List<Intake> findByUserId(Long userId);

    @Query("SELECT i FROM Intake i WHERE i.user.id = :userId " +
           "AND i.consumedAt >= :startOfDay AND i.consumedAt < :endOfDay")
    List<Intake> findDailyIntakes(
            @Param("userId") Long userId,
            @Param("startOfDay") LocalDateTime startOfDay,
            @Param("endOfDay") LocalDateTime endOfDay
    );
}
