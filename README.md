#MusicMate

<br>

# MusicMate

<br>

## Description

**MusicMate** is an app where musicians can display their skills and potencially arranje meetups to jam with each other.

## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anonymous user I can sign up on the platform so that I can start meeting other musicians.
-  **Login:** As a user I can login to the platform so that I can access my profile and meet other musicians.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Profile Page**: As a logged in user I can visit my profile page so that I can edit the information I display to other musicians or delete my profile.
- **Homepage:** As a logged in user I can scroll through other musicians profiles, allowing  to pick a good music match for me.
-  **Create matches:** As a logged in user I can like other musicians profiles, invinting them to have a conversation and arranje a jam.
-  **Matches page:** As a logged in user I can access my private matches page where I can see if other musicians accepted my match creation request and delete matches that didn't come to fruition.
-  ** Single match page:** As a logged in user I can privately chat with a musician that matched with me.





## Backlog

- Add weather widget
- lottie interactions
- users can bet
- add geolocation to events when creating


<br>


# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page or edit profile page(?) after login.           |
| `/signup`                    | SignupPage           | anon only  `<AnonRoute>`   | Signup form, navigates to login page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page. Navigates to log in or sign up forms.                                                |
| `/main`                          | MainPage             | user only `<PrivateRoute>`           | Main page. Displays other users profiles.                                                |
| `/user-profile/:id`              | ProfilePage          | user only `<PrivateRoute>` | User profile.             |
| `/user-profile/edit`         | EditProfilePage      | user only `<PrivateRoute>` | Edit user profile form.                                   |
| `/user-profile/matches`               | MatchesListPage   | user only `<PrivateRoute>` | Matches list.                                         |
| `/user-profile/matches/:matchId` | MatchDetailPage | user only `<PrivateRoute>` | Match details. Shows text area where two players can talk with each other |
                                 





## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- MainPage

- ProfilePage

- EditProfilePage

- MatchesListPage

- MatchDetailPage

- UserDetailsPage

  

**Components:**

- UserCard
- MatchCard
- Navbar

  

<br>


# Server / Backend


## Models

**User model**

```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
    userName: {type: String, required: true, unique:true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    profileImg: {type: String, default: ADD DEFAULT}
    profileVideos:[String], 
    spotifyAcessToken: {type: String},
    MatchReceived: [{type: Schema.Types.ObjectId, ref: "User"}],
    MatchSent: [{type: Schema.Types.ObjectId, ref: "User"}]
}
```



**Match model**

```javascript
 {
  userOne: {type: Schema.Types.ObjectId, ref: "User"},
    userTwo: {type: Schema.Types.ObjectId, ref: "User"},
    messages: [{type: Schema.Types.ObjectId, ref: "Messages"}]
 }
```



**Message model**

```javascript
{
  text: {type: string},
    sender: {type: Schema.Types.ObjectId, ref: "User"}
}
```




<br>


## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/verify    `    |Authorization Bearer <JWT>               |            |          |           |
| POST        | `/auth/signup`         | {userName, firstName, LastName, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {email, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| GET         | `/api/user`     |                              |                | 400          | Show users                                      |
| GET         | `/api/user/:id` |                              |                |              | Show specific user                                   |
| PUT         | `/api/user/:id` | { firstName, LastName, profileImg, profileVideos, password }       | 200            | 400          | edit user profile                                              |
| DELETE      | `/api/user/:id` |                              | 201            | 400          | delete user                                            |
| GET         | `/api/matches`     |                              |                |              | show matches                                         |
| GET         | `/api/matches/:id`     | {userOne, userTwo, messages }                | 200            | 400          | see specific match                                                  |
| DELETE      | `/api/matches/:id`     |                              | 200            | 400          | delete matches                                               |
| POST        | `/api/matches/:id`           | {sender, text} |                |              | add new message                                                     |


<br>

## API's
[Spotify ](https://developer.spotify.com/console/get-current-user-top-artists-and-tracks/)

<br>

## Packages

<br>
  
### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/Simaodosreislima/project-3-client)

[Server repository Link](https://github.com/Simaodosreislima/project-3-server)

Deployed App Link
  (https://musicmates.netlify.app)

### Slides



### Contributors

Simão Lima - [Github](https://github.com/Simaodosreislima)  - [LinkedIn](https://www.linkedin.com/in/simao-lima/)

