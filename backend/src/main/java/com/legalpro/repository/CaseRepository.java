package com.legalpro.repository;

import com.legalpro.model.Case;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CaseRepository extends JpaRepository<Case, Long> {
    List<Case> findByClientId(Long clientId);
}