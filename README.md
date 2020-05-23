# Node Starter Kit

## Usage:

**For development use CLI: https://github.com/nhsome/nsk-cli**

**Requirements:**

1. node.js > 12 (+ npm)
2. Database for Sequelize (Postgres recommended)
3. RabbitMQ
4. pm2 installed globally for development

**Firstly:**

	 copy ecosystem.example.config.js to ecosystem.config.js and edit them

**Run:**

	 $ npm run dev

**Start:**

	 $ npm run start

**Create migration:**

	 $ npm run makemigration -- --<Usage>

	 Usage:

     --preview (-p)     Show migration preview (does not change any files)
     --name (-n)        Set migration name (default: "noname")
     --comment (-c)     Set migration comment
     --execute (-x)     Create new migration and execute it
     --help             Show this message

**Run migrations:**

	 $ USER=root PASSWORD=123 DATABASE=db_name npm run migrations -- --<Usage>

	 Usage:

	 --rev (-r)     Set migration revision (default: 0)
	 --pos (-p)     Run first migration at pos (default: 0)
	 --one          Do not run next migrations
	 --list (-l)    Show migration file list (without execution)
	 --help         Show this message

## Default API Requests:

- **Login by password:**
	 
	 	 POST /api/1.0/login
	 	 Host: localhost:8080
	 	 Content-Type: application/json
     
	 	 {
	 	    "email": "user@example.com",
	 	    "password": "password"
	 	 }
	 	 
- **Login by sso token:**

	 	 POST /api/1.0/login
	 	 Host: localhost:8080
	 	 Content-Type: application/json
	 	 
	 	 {
	 	   "sso_token": "token"
	 	 }

- **Who am i:**

	 	 GET /api/1.0/whoami HTTP/1.1
	 	 Host: localhost:8080
	 	 Authorization: Bearer <token>

- **Create local user:**

	 	 POST /api/1.0/user
	 	 Host: localhost:8080
	 	 Content-Type: application/json
	 	 Authorization: Bearer <token>

	 	 {
	 	 	"email": "user@example.com",
	 	 	"firstName": "Ivan",
	 	 	"lastName": "Pupkin",
	 	 	"password": "password",
	 	 	"role": "MODERATOR"
	 	 }

- **Update local user:**

	 	 PUT /api/1.0/user/:id
	 	 Host: localhost:8080
	 	 Content-Type: application/json
	 	 Authorization: Bearer <token>

	 	 {
	 	 	"firstName": "Ivanna",
	 	 	"role": "ADMIN"
	 	 }
	 	 
- **Get local users:**

	 	 GET /api/1.0/users
	 	 Host: localhost:8080
	 	 Authorization: Bearer <token>
