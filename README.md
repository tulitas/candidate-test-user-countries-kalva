# Overview

This task is designed to evaluate your skills in **Spring Boot**, **JPA**, **WebClient**, **Liquibase**, and **Angular**. The task is divided into two parts:

1. **Spring Boot Task**: You will implement backend functionality to retrieve a user's favorite countries and fetch detailed country data from an external API (https://restcountries.com/).
2. **Angular Task**: You will implement frontend functionality to display a list of users and their data in a table.

---

# Spring Boot Task: User Countries

This task is designed to evaluate your skills in **Spring Boot**, **JPA**, **WebClient**, **Liquibase**. You will be working with an existing database schema and implementing business logic to fetch users' favorite countries along with detailed country data from an external API (https://restcountries.com/).

## Task Overview:

You will implement a **GET endpoint** to retrieve a user's favorite countries and integrate it with an external API to fetch country details like name, code, and capital city. After completing the Spring Boot task, you will implement the Angular task to display the data.

---

### Tasks:

#### 1. Retrieve Favorite Countries by User ID:
- **Implement a GET endpoint** that returns a **list of favorite countries** for a user based on their `userId`.
  - Each **UserEntity** has a `Set<CountryEntity>` representing the user's favorite countries.
  - The list should contain **country names**, **country codes**, and **capital cities**.

- **Use the existing repositories** to fetch the **user** and their associated **favorite countries**:
  - The `UserRepository` will provide access to the user.
  - The **favorite countries** are stored as a **many-to-many relationship** between users and countries.

- **WebClient Integration**:
  - **WebClient** should be used to **fetch detailed data** about the countries (name, code, capital) from the **REST Countries API**.
  - You should implement a **WebClient service** that makes a request to the API and retrieves the required country details for each country linked to the user.

#### 2. Liquibase Changelog:
- **Add a Liquibase changelog** to insert a **new user** and their **favorite countries** into the database.
  - The changelog should:
    - Insert a **new user** with a unique `id` and `username`.
    - Link the user to at least **two countries** using the `favorite_country` junction table.

---
### Example Data:
- **User**:
  - `id`: 4
  - `username`: `alice_smith`

- **Countries**:
  - `Germany` (code `DE`)
  - `France` (code `FR`)

---

# Angular Task: User List
This task is designed to evaluate your skills in **Angular**.

### Task Overview:
You will implement functionality in **Angular** to list users and display their data. The application should retrieve the list of users from the **Spring Boot backend** and display it in a simple table.

---

### Tasks:

#### 1. Implement User List Component:
- **Create a `UserListComponent`** that displays a list of users, showing their **ID** and **username**.
  - Use a basic HTML table to structure the user data, for example:
    ```html
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>john_doe</td>
        </tr>
        <tr>
          <td>2</td>
          <td>jane_doe</td>
        </tr>
        <tr>
          <td>3</td>
          <td>bob_smith</td>
        </tr>
      </tbody>
    </table>
    ```
  - The users should be fetched from the **`GET /users` endpoint** that retrieves all users from the Spring Boot backend.
  - Make sure you handle:
    - **Loading states** (e.g., show a loading spinner or message).


#### 2. Routing Setup:
- Set up Angular routing to navigate to the **`UserListComponent`**.
  - The path for the `UsersModule` should be set to **`''`** (empty string) in the **`AppRoutingModule`**.
  - Ensure you are able to navigate to the user list view when accessing the root path of the app.

---

# Submission Instructions:
1. **Fork** the repository.
2. **Implement** the `GET /users/{userId}/favorite-countries` endpoint in the controller and service layer.
3. **Implement** the `WebClient` method to fetch country data from the external API (name, code, capital).
4. **Create** a **Liquibase changelog** to insert a new user and link them to at least two favorite countries.
5. **Implement** the `UserListComponent` in Angular and set up the routing as described.
6. **Push** your changes to your repository.
7. During the video call, we’ll walk through your implementation and discuss your approach.

---

### Good luck! 😊
