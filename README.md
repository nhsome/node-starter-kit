## Node Starter Kit

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
