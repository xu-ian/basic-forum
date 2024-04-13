# Basic Forum Project
Basic forum website that I created while learning Angular, typescript, and ASP.NET core. Built with a 2-tier architecture consisting of frontend client and backend logic plus database.

## Frontend

Frontend is written in Angular. Includes a page to browse and create forums, a page to sign up, a page to log in, a page to post and view messages in a forum.

## Backend

Implements a REST api backend for forums , messages , and users. Uses a session cookie to remember user login and logout. Uses an in memory database to store data due to simplicity.

## How to start
- Make sure your computer has Node.js and angular installed.
- Open the project on some version of visual studio.
- Make sure the following packages are installed from Nuget package manager.
	- Microsoft.EntityFrameworkCore
	- Microsoft.AspNetCore.SpaProxy
	- Microsoft.AspNet.Cors
	-  Microsoft.EntityFrameworkCore.InMemory
	- Swashbuckle.AspNetCore
- Open the BasicForum.client folder using a CLI and run 'npm install'
- Go into visual studio and start the application by pressing Ctrl + F5.
