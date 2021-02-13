# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

Steps to run this project through docker:

Run docker-compose up -d --build
Run docker PS to get the container id of the mysql container

Run docker exec -it containerID /bin/bash 

Run the following commands 

mysql -u root -p

A prompt for password will come out. Please type your mysql password

Execute the following query in MYSQL Workbench

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

Where root as your user localhost as your URL and password as your password

Then run this query to refresh privileges:

flush privileges;

Type 'exit' to exit. 
