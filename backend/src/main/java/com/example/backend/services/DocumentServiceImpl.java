/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Document;
import com.example.backend.repository.DocumentRepository;
import com.example.backend.repository.TeacherTeachingServiceRepository;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

/**
 *
 * @author HONGGAM
 */
@Service
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private TeacherTeachingServiceRepository teacherTeachingServiceRepository;

    @Override
    public List<Map<String, Object>> findAll() {
        String sql = "SELECT * FROM Document";
        return jdbcTemplate.queryForList(sql);
    }

    @Override
    public Document getDocumentById(Integer id) {
        return documentRepository.findById(id).orElse(null);
    }

    @Override
    public Document createDocument(Document document) {
        return documentRepository.save(document);
    }

    @Override
    public Document updateDocument(Integer id, Document document) {
        Document existingDocument = documentRepository.findById(id).orElse(null);
        if (existingDocument != null) {
            existingDocument.setTitle(document.getTitle());
            // set other fields
            existingDocument.setTeacherteachingserviceID(document.getTeacherteachingserviceID());
            return documentRepository.save(existingDocument);
        }
        return null;
    }

    @Override
    public void deleteDocument(Integer id) {
        String sql = "DELETE FROM Document where DocumentId = ?";
        jdbcTemplate.update(sql,id);
    }

}
