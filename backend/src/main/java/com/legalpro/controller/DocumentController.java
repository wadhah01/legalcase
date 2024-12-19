package com.legalpro.controller;

import com.legalpro.dto.DocumentDTO;
import com.legalpro.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/clients/{clientId}/cases/{caseId}/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @GetMapping
    public ResponseEntity<List<DocumentDTO>> getDocuments(
            @PathVariable Long clientId,
            @PathVariable Long caseId) {
        return ResponseEntity.ok(documentService.getDocuments(clientId, caseId));
    }

    @PostMapping
    public ResponseEntity<DocumentDTO> uploadDocument(
            @PathVariable Long clientId,
            @PathVariable Long caseId,
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(documentService.uploadDocument(clientId, caseId, file));
    }

    @PostMapping("/scan")
    public ResponseEntity<DocumentDTO> uploadScannedDocument(
            @PathVariable Long clientId,
            @PathVariable Long caseId,
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(documentService.uploadScannedDocument(clientId, caseId, file));
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<Void> deleteDocument(
            @PathVariable Long clientId,
            @PathVariable Long caseId,
            @PathVariable Long documentId) {
        documentService.deleteDocument(clientId, caseId, documentId);
        return ResponseEntity.ok().build();
    }
}