# Lookbackr-server

This repository contains the server-side of the LookBackR app. It's a tool to facilitate Codaisseur students with their retrospective meetings after a project. Want to see to final result? [Click](https://agile-citadel-00591.herokuapp.com) here

## Preface

This readme contains a global overview of the LookBackR project, describing the goals of the project and relations between the front- and back end. The repo (and readme) for the front end can be found here: https://github.com/Official-Codaisseur-Graduate/lookbackr-client. The deployed app (running client) can be found here: https://agile-citadel-00591.herokuapp.com. This project was started by members of Codaisseur class 27.

Check the overview readme for further information on the goals and architecture of the project HERE:  
https://github.com/Official-Codaisseur-Graduate/lookbackr-client/blob/development/overview.md

Check the [Change log](https://github.com/Official-Codaisseur-Graduate/lookbackr-server/blob/readmefix/CHANGELOG.md) for details on the changes implemented by Class-32.

# Set-Up

In order to run this App follow the following steps;

1. Set up a Postgres database with docker running on port 5432 using password secret:
   `$ docker run -p 5432:5432 --name lookbackr-server-api -e POSTGRES_PASSWORD=secret -d postgres`

2. Clone the repository using the command `git clone https://github.com/Official-Codaisseur-Graduate/lookbackr-server.git`

3. Install all the relevant dependencies using the command `npm install`

4. Start the server using `npm start` or `npm run start`

# Technologies Used

- Json-sse
- jsonwebtoken
- Body-Parser
- Cors
- Express
- Pg
- Sequelize
- Httpie (for testing endpoints)

# Models and Relations

The models which were used for the current project include;

- Retro
  The Retro model contains a Name, Description, Active status and Done property

- User
  The User model contains a Username and a Done property

- Card
  The card model contains a Text and a Type (being either sad, mad, glad, stop, start or keep) property

The relational mapping between the aforementioned models is as follows;

- Retro
  `Retro.hasMany(Card)`
  `Retro.hasMany(User)`

- User
  `User.hasMany(Card)`

![Image of ERD](/ERD.png)

# Api Resources

User can test the following endpoints in the backend by making requests via httpie to either your local server `localhost:5000` or the heroku server `https://agile-citadel-00591.herokuapp.com` (NOTE: this heroku server link may not be valid by the time you test. If thats the case be sure to setup your heroku server <instructions on how to do so can be seen on THINGS TO NOTE BEFORE TESTING ENDPOINTS point 4.>). Furthermore, examples on how to make request (via your localserver) are illustrated below the respective endpoints.

THINGS TO NOTE BEFORE TESTING ENDPOINTS:

1. Make sure to have httpie installed first before testing. Use `npm install httpie` to install the relevant module.

2. If you're testing locally, make sure to have your postgres database set-up and properly linked via sequelize. The standard format used for this project was `docker run -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=secret -d postgres`

3. Dont forget to start the server using the command `npm start` before making requests.

4. If you want so switch testing from the heroku server, make sure to set-up your heroku server via your terminal as follows; - Use the command `heroku login` to log in,

- Use the command `heroku create --region eu` to create a heroku app (NOTE: a heroku link will be given - for example `https://agile-citadel-00591.herokuapp.com` - be sure to keep this for later.)
- Use the command `git push heroku master` to build your heroku app using the app version on the master git repository
- Use the command `heroku open` to open your app.
- If all goes well then your server should be deployed on heroku. For the last step, simply concatenate the heroku link which was given before your endpoints for example; `http post <Heroku link goes here>/rooms name=<name> description=<description> active=<true>`

* GET/stream

  - Initializes the streaming of all application data and provides the data which is logged to the stream
  - Httpie request format:
    `http get :5000/stream --stream`
  - Httpie response format:
    The initial response will be `id: 0 data: []` and the response updates everytime the stream is updated (For example when a new room is created)

* POST/rooms

  - Creates a new retro room
    \*Httpie request format:
    `http post :5000/rooms name=<name> description=<description> active=<true>`
  - Httpie response format:

  ````{
  "active": true,
  "description": "description",
  "done": false,
  "id": 1,
  "name": "username"
  }```
  ````

* POST/users

  - Creates a user with an initial retroId of null
  - Httpie request format:  
    `http post :5000/users username=<name> password=<password>`
  - Httpie response format:

  ````{
  "done": false,
  "id": 1,
  "retroId": null,
  "username": "username"
  "password": "$2a$10$rqVbpQxhfa6gp7Lr7mjyfe6esaloAscChby8BPB7HUsLa/PpiH9Bi"
  }```

  ````

* POST/login

  - Validates user and password and provides a JWT key for a valid user
  - Httpie request format:  
    `http post :5000/login username=<name> password=<password>`
  - Httpie response format:

  ````{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTUzNTM2MjIzMCwiZXhwIjoxNTM1MzY5NDMwfQ.DxFRClbZLP0L-fczkSiNHEiLqYI4HGbC8Ezrh3JhlG8"
  }```

  ````

* PUT/enter-room/:id

  - Allows only an authenticated user to join a room in the lobby and updating the users retroId with the associated retro id specified in the params
  - Httpie request format:
    `http put :5000/room/<id> "Authorization":"Bearer <jwt>"` IMPORTANT: Mind the quotation marks!!!
  - Httpie response format:

  ````{
  "done": false,
  "id": 1,
  "retroId": 1,
  "username": "name"
  }```

  ````

* PUT/room/:id

  - Updates a users done property to true and the retro-rooms done property to true once every user in the room is done.
  - Httpie request format:
    `http put :5000/room/1 user:='{"id":<userId>,"username": "<username>"}'`
  - Httpie response format:
    {
    "done": true,
    "id": 1,
    "retroId": 1,
    "username": "name"
    }

* POST/cards

  - Creates a new card with a retroId and a userId
  - Httpie request format:  
    `http post :5000/cards retroId=<retroId> userId=<userId> text=text type=type`
    NOTE: Type can only be one of the following; mad, sad, glad, start, stop or keep
  - Httpie response format:
    {
    "id": 1,
    "retroId": 1,
    "text": "text",
    "type": "type",
    "userId": 1
    }

* PUT/reset/:id

  - Resets the users done property to false and respectively the rooms done property to false.
  - Httpie request format:
    `http put :5000/reset/1 user:='{"id":1}'`
  - Httpie response format:
    {
    "done": false,
    "id": 1,
    "retroId": 1,
    "username": "name"
    }

* DELETE/card/:id

  - You can delete a card
  - Httpie request format:
    `http delete :5000/card/<id>`

* DELETE/room/:id

  - You can delete a room
  - Httpie request format:
    `http delete :5000/room/<id>`

## To be implemented

- The /login route currently sends the userId to the frontend.
  As this might be a security risk, restrict the endpoint from sending user id to the frontend. The frontend will also require a change to accommodate this fix.

## Contributors

- Class 27:

  - [Marten Bonnema](https://github.com/Fraxcelsior)
  - [Andrew Omajuwa](https://github.com/AndrewOmajuwa)
  - [Brigitte Hennequin](https://github.com/QuinB6248)
  - [Gulia Munari](https://github.com/Astrid88)

- Class 28:

  - Diana Dias [Github](https://github.com/dianadiasds)
  - Meryl Geugies [Github](https://github.com/MerylGeugies)

- Class 32:
  - Lavanya Jayapalan [Github](https://github.com/LavanyaJay)
  - Cynthia Meiring [Github](https://github.com/cynthiameiring)
  - Alastair Haigh [Github](https://github.com/ahaigh9877)
