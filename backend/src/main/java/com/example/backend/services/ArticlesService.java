package com.example.backend.services;

import com.example.backend.model.Articles;
import java.util.List;
import java.util.Map;

/**
 *
 * @author HONGGAM
 */
public interface ArticlesService {

    Articles saveArticle(Articles article);

    List<Map<String, Object>> getAllArticles();

    Articles createArticle(Articles article);

    void deleteArticles(Integer id);

    Articles createArticle(Articles article, int teacherTeachingServiceId);
}
