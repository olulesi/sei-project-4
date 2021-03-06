# Project 4 - Costanza
## Overview
For my fourth and final project, my partner and I decided to use the drag and drop functionality on a professional level that promotes productivity and user interaction with our site [Costanza](https://kanban-costanza.herokuapp.com/).

The concept is that users can organize their projects into different kanbans whilst tracking progress with the use of columns and tickets with a drag and drop user interaction. 
Users can add their teammates that have and accounts as well as applying deadlines, priority flags, comments, assign labels to different tickets and add their own todo list.


## Brief
* *Build a full-stack application* by making your own backend and your own front-end.
* *Use a Python Django API* using Django REST Framework to serve your data from a Postgres database.
* *Consume your API with a separate front-end* built with React.
* *Be a complete product* which most likely means multiple relationships and CRUD functionality for at least a couple of models.


## Collaborators
* Isaac Lundie-Fallon - [Github](https://github.com/isaac-lf)

## Technologies Used
* JavaScript ES6
* React.js
* HTML5 & CSS3
* SASS
* React 
* React-Router-Dom
* Framer Motion
* Bulma CSS Framework
* Axios 
* Font Awesome 
* Beautiful dnd (react-beautiful-dnd (drag and drop))
* Date Time Picker (react-datetime-picker)
* React Selector (react-select)
* Django
* Django REST framwork
* Postgre SQL

### Dev Tools

* Todoist
* Trello
* Git 
* GitHub
* Insomnia
* VSCode
* Eslint
* Git
* GitHub & Github Pages
* Google Chrome Dev Tools
* Google Fonts
* Heroku
* Table Plus


## Getting Started
* Clone or download the repo.
* Install back-end dependencies: `pipenv`.
* Enter the project shell: `pipenv shell`.
* Make migrations: `python manage.py makemigrations`.
* Migrate: `python manage.py migrate`.
* Load seed data for Users: `python manage.py loaddata jwt_auth/seeds.json`.
* Load seed data for Kansans: `python manage.py loaddata kanbans/seeds.json`.
* Load seed data for columns: `python manage.py loaddata columns/seeds.json`.
* Load seed data for tickets: python `manage.py loaddata tickets/seeds.json`.
* Load seed data for comments: `python manage.py loaddata comments/seeds.json`.
* Start back end server: `python manage.py runserver`.
* Install dependencies in the client folder: `cd client && yarn`.
* Start the server (remaining in client folder): `yarn start`.

## Demonstration of the App Flow 


<img src="images/appFlowProject4.gif">

* First displays the landing page which gives you the option to log in or register.

* Upon signing in you go to the user profile page with the option to create a new board.
* Upon clicking on the create new board they are given a form to enter the kanban title as well as selecting a background of their kanban. 
* Once the have clicked on "create new kanban" they are taken to the kanban with their background with the option to add their new column.
* This is then where the user can create their columns and tickets and start building their planning workspace by creating priorities to tickets or assigning members to different tickets or creating a todo list within the ticket.

## Process
We started brainstorming ideas of what kind of website we wanted to do. Our aim was to try to go for something unconventional to previous projects we had seen or done before where it could potentially be a real product if done well. We both liked the drag and drop functionality of one of the websites we had seen so we came up with a kanban project planning concept similar to the Todoist and Trello apps or kanban apps in general.

### Plan

As soon as we came up with the kanban idea we then started to plan out our ER diagram thinking about the functionality we were going to include. Since we only had a week we knew we had to have a clear vision of the specific features we wanted as we wouldn’t have enough time to completely clone a Trello board with all its functionality.

<img src="images/erDiagram.png">

We then further planned out our idea by going on google docs and elaborating on our concept going through the functionality on specific pages. 

<img src="images/googleDocPlan.png" height="600" >

In addition, we created a Trello board to get accustomed to the functionality of a kanban app as well as planning our project ourselves dividing the sections of our work having the models on the back end and hooking them up to the front end with the drag and drop functionality we had dragged them to the done section upon completing it and renamed the columns once we had finished the back end to plan the styling and animations for the pages.

<div style="display:flex">
  <img src="images/trelloPlan.png"  height="400">
  <img src="images/trelloPlanFirst.png" height="400">
</div>

### Division of Work

Since we had a project with a lot of features to implement we knew that we wouldn’t be able to work together for much of the project as we would need to work on so many features. Therefore we prioritised our functionality and divided it up based on strengths. 

We started with Isaac focusing on the back end setting up the models whilst I worked on using the drag and drop functionality and how we can hook it up to the backend. We then to proceed on working on different features of the board based on priority. Isaac proceeded to work on the ticket view with all its features whilst I worked on the profile page as well as the styling and animations of all the pages. However, we still worked problems together as I was able to depend on his guidance with the backend set up.


### Back End (Kanban Model)

On the back end as mentioned before Isaac worked on the majority of the back end whilst I had to work on the front end in order to finish the app time but I did manage to add to the kanban model. 

Creating a tuple of options for the backgrounds assigning them values of 123 with a default so that when the user tries to select a background it already has the default in the background.

```
from django.db import models

class Kanban(models.Model):
    BACKGROUNDS = (
        (0, 'Default Background'),
        (1, 'Background 1'),
        (2, 'Background 2'),
        (3, 'Background 3'),
        (4, 'Background 4'),
    )

    name = models.CharField(max_length=30)
    background = models.PositiveIntegerField(choices=BACKGROUNDS, default=BACKGROUNDS[0][0])
    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name = 'kanbans_owner_of',
        on_delete=models.CASCADE
    )
    members = models.ManyToManyField(
        'jwt_auth.User',
        related_name='kanbans_member_of',
        blank=True
    )

```

### User Model Edit Profile

Had to create a nested user serialiser for the edit profile request to show the editable and required fields only.

```
class NestedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'full_name', 'role', 'avatar')

```

```
class ProfileView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request):
        current_user = User.objects.get(pk=request.user.id)
        serialized_current_user = PopulatedUserSerializer(current_user)
        return Response(serialized_current_user.data, status=status.HTTP_200_OK)

    def put(self, request):
        current_user = User.objects.get(pk=request.user.id)
        edited_current_user = NestedUserSerializer(current_user, data=request.data)
        if edited_current_user.is_valid():
            edited_current_user.save()
            return Response(edited_current_user.data, status=status.HTTP_202_ACCEPTED)
        return Response(edited_current_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


```


### Front End 

#### Drag and Drop Functionality

<div style="display:flex">
  <img src="images/dndPlay1.gif">
  <img src="images/dndPlay2.gif" >
</div>

To implement the drag and drop functionality enabling the features, we wanted such as adding a new ticket and column I had to create a separate code base to understand the documentation of react-beautiful-dnd.

After spending time researching the different ways of applying the drag and drop functionality. I had originally wanted to use [react-dnd](https://react-dnd.github.io/react-dnd/about) dependency originally based on recommendations but after researching youtube tutorials and further reading their documentation I realised Atlassian’s [react beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) was the best option as it is  specifically built for lists (vertical, horizontal, movement between lists, nested lists and so on)”.

I then proceeded to create a separate code base test the functionality of react beautiful-dnd. However, I still needed to read [Jason Brown’s article](https://codedaily.io/tutorials/186/Multi-List-Drag-and-Drop-With-react-beautiful-dnd-Immer-and-useReducer) on the multi-list drag and drop breaking down each function used helping mead the functionality of adding a new ticket and adding a new column.

#### Profile Page

<img src="images/profilePage4p4.gif">

For the profile page, the main challenge was creating the background option selector and hooking each option to the back end as well as the change of images at the same time.

I assigned each background option to a CSS class with a number value at the end of each. Those numbers had to match the numbers I assigned to each background on the back end for the values to be saved and shown on the kanban page.

```
// Backgrounds for profile and kanban view 

.kanban-background-0 {
  background: url('https://images.unsplash.com/photo-1486728297118-82a07bc48a28?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1401&q=80');
  background-size: cover;
  background-position: center;
}
.kanban-background-1{
  background: url('https://images.pexels.com/photos/3880526/pexels-photo-3880526.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
  background-size: cover;
  background-position: center;
}

.kanban-background-2 {
  background: url('https://images.pexels.com/photos/1165991/pexels-photo-1165991.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
  background-size: cover;
  background-position: center;
}
.kanban-background-3{
  background: url('https://images.pexels.com/photos/4946965/pexels-photo-4946965.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
  background-size: cover;
  background-position: center;
}


```

Due to the background options being represented as values on the back end I just had to assign the value of background to the end of each class name to represent each background image on the front end.

```
{profile.kanbansOwnerOf ?
              <>
                {profile.kanbansOwnerOf.map(kanban => (
                  <div key={kanban.id} className="kanban-card">
                    <div className={`kanban-background kanban-background-${kanban.background}`}>
                      <Link  to={`/kanbans/${kanban.id}`}>
                        <div className="card-header-title">
                          {kanban.name}
                        </div>
                      </Link> 
                      <button 
                        onClick={ () => {
                          handleDelete(kanban.id)
                        }}

```

On the create new board I treated it as it was a form with radio options that assigned a value to the background once checked therefore changing the background image.

```
<div className="control-background-options">
            <div className="background-option kanban-background-0">
              <input
                type="radio"
                name="background"
                value="0"
                onChange={handleChange}
                checked={formdata.background === '0'}
                className="background-0" 
              />
              <label>
              </label>
            </div>
            <div className="background-option kanban-background-1">
              <input
                type="radio"
                name="background"
                value="1"
                onChange={handleChange}
                checked={formdata.background === '1'}
                className="background-1" 
              />
              <label>
              </label>
            </div>
            <div className="background-option kanban-background-2">
              <input
                type="radio"
                name="background"
                value="2"
                onChange={handleChange}
                checked={formdata.background === '2'}
                className="background-2" 
              />
              <label>
              </label>
            </div>
            <div className="background-option kanban-background-3">
              <input
                type="radio"
                name="background"
                value="3"
                onChange={handleChange}
                checked={formdata.background === '3'}
                className="background-3" 
              />
              <label>
              </label>
            </div>
          </div>
        </div>

```


#### NavBar

<img src="images/navBar.png">
<img src="images/Screenshot 2021-02-19 at 01.44.16.png">


For the case of our project, we had the NavBar at the top of every page component, not above the switch router in the App.js file. This is because the navbar on the kanban view page is completely different to the navbar on any other page due to the features of working on a project such as adding members search bar, project name and project members.

```
 return (
    <>
      <MainNav page={'register'}/>
      <section 
        className={`register-form-container ${hasErrorAnimationClass ? 'error-animation' : ''}`}
      >

```


```
 return (
    <>
      <MainNav page={'profile'}/>
      <div className="profile-section">
        <div className="profile-header"
```

For this reason, I made 2 navbar files. One for the kanban view page and the other for the rest of the app. I then passed a prop on the main navbar file assigning the prop page a name of each page on this project for each page to have its specific nav bar icons. I also used a ternary multi case for when the user is logged in or not as well.

```
 return (
    <>
      <nav className="main-navbar" role="navigation" aria-label="main navigation">
        {page === 'homePage' ?
          <>
            <div className="navbar-end">
              {!isLoggedIn ?
                <>
                  <span className="navbar-item-log-in">
                    <Link to="/login" className="button log-in-main-navbar">
                      <span>Log In</span>
                    </Link>
                  </span>
                  <span className="navbar-item-register">
                    <Link to="/register" className="button register-main-navbar">
                      <span>Register</span>
                    </Link>
                  </span>
                </>
                :
                <>
                  <span className="navbar-item-log-out-home-page">
                    <button onClick={handleLogout} to="/login" className="button log-out-main-navbar">
                      <span>Log Out</span>
                    </button>
                  </span>
                  <div className="user-icon-container-home-page">
                    <Link to={`/profile/${getUserId()}`}>
                      <span className='icon user-icon-main-navbar'>
                        <FontAwesomeIcon icon={faUserCircle}/>
                      </span>
                    </Link>
                  </div>
                </>
              }
            </div>
          </>
          : page === 'login' ?
            <>
              <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                  <div className="dice-icon-container">
                    <Link to="/">
                      <span className="icon dice-icon-main-navbar">
                        <FontAwesomeIcon icon={faDiceD20}/>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="navbar-end">
                  <>
                    <span className="navbar-item-register">
                      <Link to="/register" className="button register-main-navbar">
                        <span>Register</span>
                      </Link>
                    </span>
                  </>
                </div>
              </div>
            </>
            : page === 'register' ?
              <>
                <div id="navbarBasicExample" className="navbar-menu">
                  <div className="navbar-start">
                    <div className="dice-icon-container">
                      <Link to="/">
                        <span className="icon dice-icon-main-navbar">
                          <FontAwesomeIcon icon={faDiceD20}/>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="navbar-end">
                    <>
                      <span className="navbar-item-log-in">
                        <Link to="/login" className="button log-in-main-navbar register-page-button">
                          <span>Log In</span>
                        </Link>
                      </span>
                    </>
                  </div>
                </div>
              </>
              :
              <>
                <div id="navbarBasicExample" className="navbar-menu">
                  <div className="navbar-start">
                    <div className="dice-icon-container">
                      <Link to="/">
                        <span className="icon dice-icon-main-navbar">
                          <FontAwesomeIcon icon={faDiceD20}/>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="navbar-end">     
                    <span className="navbar-item-log-out">
                      <button onClick={handleLogout} to="/login" className="button log-out-main-navbar">
                        <span>Log Out</span>
                      </button>
                    </span>
                    <div className="user-icon-container">
                      <Link to={`/profile/${getUserId()}`}>
                        <span className='icon user-icon-main-navbar'>
                          <FontAwesomeIcon icon={faUserCircle}/>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
        }
      </nav>
    </>
  )
}

```

### Styling and Animations

Regarding the styling of the app [Bulma CSS frame work](https://bulma.io/) was used mainly as well as it’s [extensions](https://bulma.io/extensions/).

Regarding the animations, I used framer motion for the slide in on the kanban view and I also used keyframe animations for the transitions into each page as well.

```
 <motion.div 
                className='kanBan-container'
                animate={{ x: 0 }}
                initial={{ x: 1900 }}
                transition={{ type: 'spring', stiffness: 30, ease: 'easeOut', duration: 0.5 }}>

```


```
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  60% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
      opacity: 1;
      transform: translateX(0);
  }
}

@keyframes fly-in {
  0% {
    opacity: 0;
    transform: translateY(300px);
  }
  15% {
    opacity: 0;
    transform: translateY(100px);
  }
  55% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
      opacity: 1;
      transform: translateY(0);
  }
}
```

### Deployment

The deployment process was a challenge configuring Django for [Heroku](https://dashboard.heroku.com/apps)  and fixing the bugs of the website post-deployment as certain features such as the ticket modal were not working after being deployed.

## Challenges
* *Team Git*: Dealing with the conflicts when merging into the development branch was a challenge that took time to solve however with consistent communication Isaac and I were able to make sure no work was lost.
* *Drag and Drop*: Understanding the react beautiful dnd took time to get accustomed to in order to apply it to the project’s functionality requirement but thanks to using multiple resourcing it gave me a solid understanding on how to apply it to this project and future ones if needed.
* *Time Frame*: working in the time frame with all the functionality provided on Costanza took long days of consistency, being able to work with Isaac was extra helpful with his work ethic.
* *Deployment*: solving the bugs post-deployment as well as configuring a database to run on a live server.

## Wins
* *Working as a Pair*: Being able to work with Isaac was a joy. Learning from him as well as rising to his standards brought out the best in me and resulted in a well done 4th project. The whole process required a lot of time spent working individually focusing on certain aspects of the app and reconvening at certain times of the day to update each other checking in on progress which required a lot of trust in one another. However, we always took the time to stop and help on another with any issues we had throughout the project which is a key aspect in pair programming and worked out in producing a polished product that we did in the time frame.
* *Functionality of the App*: Costanza is a complete product where the application can be used for real project planning similar to Trello. Being able to add professional functionality to our website was a big win for me.

## What I Learned 
* How to build a full-stack application in another way to MERN.
* Understanding react-dnd and react-beautiful-dnd.
* Deeper understanding of React Hooks with the navBar functionality.

## Future Features
* Drag and Drop functionality on the columns.
* Spinners on all pages.



