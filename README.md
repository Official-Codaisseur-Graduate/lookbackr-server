# Lookbackr-server
This repository contains the server-side of the LookBackR app. It's a tool to facilitate Codaisseur students with their retrospective meetings after a project.

# Set-Up
In order to run this App follow the following steps;

1. Clone the repository using the command `git clone https://github.com/Official-Codaisseur-Graduate/lookbackr-server.git`

2. Install all the relevant dependencies using the command `npm install`

3. Start the server using `npm start` or `npm run start`

# Technologies Used 
* Json-sse
* Body-Parser
* Cors
* Express
* Pg
* Sequelize
* Httpie (for testing endpoints)

# Models and Relations
## The models which were used for the current project include;

* Retro 
    *The Retro model contains a Name, Description, Active status and Done property 

* User 
    *The User model contains a Username and a Done property

* Card
    *The card model contains a Text and a Type (being either sad, mad, glad, stop, start or keep) property

## The relational maping between the aforementioned models is as follows;

* Retro
    *`Retro.hasMany(Card)`
    *`Retro.hasMany(User)`

* User
    *`User.hasMany(Card)`

# Api Resources

User can test the following endpoints in the backend by making requests via httpie to either your local server `localhost:5000` or the heroku server `https://salty-shelf-72145.herokuapp.com` 
## Note:
This heroku server link may not be valid by the time you test. If thats the case be sure to setup your heroku server <instructions on how to do so can be seen on THINGS TO NOTE BEFORE TESTING ENDPOINTS point 4.>. Furthermore, examples on how to make request (via your localserver) are illustrated below the respective endpoints.

## THINGS TO NOTE BEFORE TESTING ENDPOINTS: 
1. Make sure to have the httpie module installed first before testing. Use `npm install httpie` to install the relevant module. 

2. If your testing locally, make sure to have your postgres database set-up and properly linked via sequelize. The standard format used for this project was `docker run -p 5432:5432 --name postgres -e POSTGRES_PASSWORD=secret -d postgres`

3. Dont forget to start the server using the command `npm start` before making requests.

4. If you want so switch testing from the heroku server, make sure to set-up your heroku server via your terminal as follows; - Use the command `heroku login` to log in,
- Use the command `heroku create --region eu` to create a heroku app (NOTE: a heroku link will be given - for example `https://salty-shelf-72145.herokuapp.com` - be sure to keep this for later.)
- Use the command `git push heroku master` to build your heroku app using the app version on the master git repository
- Use the command `heroku open` to open your app. 
- If all goes well then your server should be deployed on heroku. For the last step, simply concatenate the heroku link which was given before your endpoints for example; `http post <Heroku link goes here>/rooms name=<name> description=<description> active=<true>`

## The Endpoints 

* GET/stream
    * Initializes the streaming of all application data and provides the data which is logged to the stream
    * Httpie request format:
    `http get :5000/stream --stream`
    * Httpie response format:
    The initial response will be `id: 0 data: []` and the response updates everytime the stream is updated (For example when a new room is created) 

* POST/rooms
    * Creates a new retro room 
    *Httpie request format:
    `http post :5000/rooms name=<name> description=<description> active=<true>`
    * Httpie response format:
    ```{
    "active": true,
    "description": "description",
    "done": false,
    "id": 1,
    "name": "username"
    }```


* POST/users
    * Creates a user with an initial retroId of null
    * Httpie request format:  
    `http post :5000/users username=<name>`
    * Httpie response format:
    ```{
    "done": false,
    "id": 1,
    "retroId": null,
    "username": "username"
    }```

* PUT/enter-room/:id
    * Allows a user to join a room in the lobby and updating the users retroId with the associated retro id specified in the params
    * Httpie request format:
     ` http put :5000/enter-room/:id user:='{"id":<userId>,"username": <username>}' ` IMPORTANT: Mind the qoutation marks!!!
     * Httpie response format:
     ```{
    "done": false,
    "id": 1,
    "retroId": 1,
    "username": "name"
    }```

* PUT/room/:id
    * Updates a users done property to true and the retro-rooms done property to true once every user in the room is done.
    * Httpie request format:
    `http put :5000/room/1 user:='{"id":<userId>,"username": "<username>"}'` 
    * Httpie response format:
    {
    "done": true,
    "id": 1,
    "retroId": 1,
    "username": "name"
    }

* POST/cards
    * Creates a new card with a retroId and a userId 
    * Httpie request format:  
    `http post :5000/cards retroId=<retroId>  userId=<userId> text=text type=type` 
    NOTE: Type can only be one of the following; mad, sad, glad, start, stop or keep
    * Httpie response format:
    {
    "id": 1,
    "retroId": 1,
    "text": "text",
    "type": "type",
    "userId": 1
    }


* PUT/reset/:id
    * Resets the users done property to false and respectively the rooms done property to false.
    * Httpie request format:
    `http put :5000/reset/1 user:='{"id":1}'`
    * Httpie response format: 
    {
    "done": false,
    "id": 1,
    "retroId": 1,
    "username": "name"
    }


#Contributors
* Marten Bonnema 
* Andrew Omajuwa
* Brigitte Hennequin
* Gulia Munari