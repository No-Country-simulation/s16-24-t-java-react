package com.project.managementapi.repositories;

import com.project.managementapi.entities.WorkoutSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface WorkoutSessionRepository extends JpaRepository<WorkoutSession, Long> {
    List<WorkoutSession> findByComplexId(Long id);
    @Query("SELECT CASE WHEN COUNT(ws) > 0 THEN true ELSE false END " +
            "FROM WorkoutSession ws " +
            "WHERE ws.dayOfWeek = :dayOfWeek " +
            "AND (:startTime < ws.endTime AND :endTime > ws.startTime)")
    boolean existsOverlappingSession(@Param("dayOfWeek") Integer dayOfWeek,
                                     @Param("startTime") LocalTime startTime,
                                     @Param("endTime") LocalTime endTime);
}
