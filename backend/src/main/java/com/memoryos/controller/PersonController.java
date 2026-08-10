package com.memoryos.controller;

import com.memoryos.dto.PersonRequest;
import com.memoryos.dto.PersonResponse;
import com.memoryos.security.SecurityUtils;
import com.memoryos.service.PersonService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/people")
public class PersonController {
    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping
    public List<PersonResponse> listPeople() {
        return personService.listPeople(SecurityUtils.currentUserId());
    }

    @GetMapping("/{id}")
    public PersonResponse getPerson(@PathVariable UUID id) {
        return personService.getPerson(SecurityUtils.currentUserId(), id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PersonResponse createPerson(@Valid @RequestBody PersonRequest request) {
        return personService.createPerson(SecurityUtils.currentUserId(), request);
    }

    @PutMapping("/{id}")
    public PersonResponse updatePerson(@PathVariable UUID id, @Valid @RequestBody PersonRequest request) {
        return personService.updatePerson(SecurityUtils.currentUserId(), id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePerson(@PathVariable UUID id) {
        personService.deletePerson(SecurityUtils.currentUserId(), id);
    }
}
