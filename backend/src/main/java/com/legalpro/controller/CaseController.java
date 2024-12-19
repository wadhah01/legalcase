package com.legalpro.controller;

import com.legalpro.dto.CaseDTO;
import com.legalpro.model.CaseStatus;
import com.legalpro.service.CaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients/{clientId}/cases")
@RequiredArgsConstructor
public class CaseController {

    private final CaseService caseService;

    @GetMapping
    public ResponseEntity<List<CaseDTO>> getCasesByClientId(@PathVariable Long clientId) {
        return ResponseEntity.ok(caseService.getCasesByClientId(clientId));
    }

    @GetMapping("/{caseId}")
    public ResponseEntity<CaseDTO> getCaseById(@PathVariable Long clientId, @PathVariable Long caseId) {
        return ResponseEntity.ok(caseService.getCaseById(clientId, caseId));
    }

    @PostMapping
    public ResponseEntity<CaseDTO> createCase(@PathVariable Long clientId, @RequestBody CaseDTO caseDTO) {
        return ResponseEntity.ok(caseService.createCase(clientId, caseDTO));
    }

    @PutMapping("/{caseId}")
    public ResponseEntity<CaseDTO> updateCase(
            @PathVariable Long clientId,
            @PathVariable Long caseId,
            @RequestBody CaseDTO caseDTO) {
        return ResponseEntity.ok(caseService.updateCase(clientId, caseId, caseDTO));
    }

    @PatchMapping("/{caseId}/status")
    public ResponseEntity<CaseDTO> updateCaseStatus(
            @PathVariable Long clientId,
            @PathVariable Long caseId,
            @RequestBody CaseStatus status) {
        return ResponseEntity.ok(caseService.updateCaseStatus(clientId, caseId, status));
    }

    @DeleteMapping("/{caseId}")
    public ResponseEntity<Void> deleteCase(@PathVariable Long clientId, @PathVariable Long caseId) {
        caseService.deleteCase(clientId, caseId);
        return ResponseEntity.ok().build();
    }
}