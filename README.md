# hacktivpress

Hacktiv Press is a website app like blog or cms that use express, nodejs, mongoose, as backend server and vue js as frontend

# Step - step installation or running the program

1. clone dari repositori
2. cd <folder-root>/server
3. npm install
4. npm run dev
5. cd <folder-root>/client
6. npm install
7. npm run dev

# REST API
List of routes api :

| Route | HTTP | Description |
| ------ | ------ | ------ |
| /auth/signup | GET | Sign up with new user info |
| /auth/signin | GET | Sign in while get an access token based on credentials |
| /articles | GET | Get all articles data (authenticated user)|
| /articles/:id | GET | Get a single article data (authenticated user) |
| /articles | POST | Create a article (authenticated user) |
| /articles/:id | PUT | Update a data articles with new info  (authenticated user) |
| /articles/:category_name | GET | GET a data articles by category name  (authenticated user) |
| /articles/:author | GET | GET a data articles by author  (authenticated user) |
| /articles/:id | DELETE | Delete a articles (authenticated user) |
