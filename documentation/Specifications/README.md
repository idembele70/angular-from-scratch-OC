# Specifications

# Template

Use the same syntax as the template below to write a new use case:

- Use case title with four "#" characters
- "Quick description" and "Nominal process" with five "#" characters
- Depending, on the section (follow these links for [front-end]() and [back-end]()), the correct number (NXX)
- Add your new use case at the end of the appropriate section

```
#### NXX - Name of the use case
##### Short description :
- Add a short description of the action, and also add the link to the related issue for the feature
##### Nominal process:
1. Connect to front-end/back-end with user...
2. Go to the homepage...
3. Execute the action...
4. The user should see this...
...
```

# Numbering rules

## Front-End

| Number | Page(s) name            | Related route(s)   |
| ------ | ----------------------- | ------------------ |
| 0XX    | Login                   | /sign-\*\*         |
| 1XX    | Home                    | /appareils         |
| 2XX    | Appareils management    | /appareils/id\*\*  |
| 3XX    | Users management        | /users/\*\*        |
| 4XX    |                         |                    |
| 5XX    |                         |                    |
| 6XX    |                         |                    |
| 7XX    |                         |                    |
| 8XX    |                         |                    |
| 9XX    | Other pages and actions | Every other routes |

Note:
All the routes will follow the **BaseURL** : http://localhost:4200/
