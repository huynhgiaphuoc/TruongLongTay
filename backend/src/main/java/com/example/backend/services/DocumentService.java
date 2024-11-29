/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Document;
import java.util.List;
import java.util.Map;

/**
 *
 * @author HONGGAM
 */
public interface DocumentService {

    List<Map<String, Object>> findAll();

    Document getDocumentById(Integer id);

    Document createDocument(Document document);

    Document updateDocument(Integer id, Document document);

    void deleteDocument(Integer id);

}
