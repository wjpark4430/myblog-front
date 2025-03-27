package com.blog.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
@RequestMapping("/boards")
public class BoardController {

    @GetMapping("/{id}")
    public String getBoardDetail() {
        return "board-detail";
    }

    @GetMapping("/new")
    public String newBoard() {
        return "board-new";
    }

    @GetMapping("/{id}/edit")
    public String updateBoard(@RequestParam String param) {
        return new String();
    }
    
    
}
