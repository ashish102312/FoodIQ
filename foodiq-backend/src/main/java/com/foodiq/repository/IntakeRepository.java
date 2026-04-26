package com.foodiq.repository;
import com.foodiq.model.Intake;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface IntakeRepository extends JpaRepository<Intake, Long> {
    List<Intake> findByUserIdAndDate(Long userId, LocalDate date);
    List<Intake> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
}
