/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.backend.services;

import com.example.backend.model.Articles;
import com.example.backend.repository.ArticlesRepository;
import com.example.backend.repository.TeacherTeachingServiceRepository;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.model.TeacherTeachingService;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import org.springframework.jdbc.core.JdbcTemplate;

@Service
public class ArticlesServiceImpl implements ArticlesService {

    @Autowired
    private ArticlesRepository articlesRepository;

    @Autowired
    private JdbcTemplate jdbctemplate;

    @Autowired
    private TeacherTeachingServiceRepository teacherTeachingServiceRepository;

    @Override
    public List<Map<String, Object>> getAllArticles() {
        String sql = "Select * from Articles";
        return jdbctemplate.queryForList(sql);
    }

    @Override
    public Articles createArticle(Articles article) {
        LocalDate today = LocalDate.now();  // Set current date for creation
        return articlesRepository.save(article);
    }

    public Articles updateArticle(int id, Articles articleDetails) {
        Articles article = articlesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        article.setTitle(articleDetails.getTitle());
        article.setContent(articleDetails.getContent());
        article.setCategory(articleDetails.getCategory());
        article.setUpdateat(articleDetails.getUpdateat());
        article.setPublished(articleDetails.getPublished());
        article.setNamefile(articleDetails.getNamefile());
        return articlesRepository.save(article);
    }

  

    @Override
    public Articles saveArticle(Articles article) {
        return articlesRepository.save(article);
    }

    @Override
    public void deleteArticles(Integer id) {
        String sql = "DELETE FROM Articles where Articlesid = ?";
        jdbctemplate.update(sql,id);
    }

    @Override
    public Articles createArticle(Articles article, int teacherTeachingServiceId) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
