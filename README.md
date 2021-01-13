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

A prompt for password will come out. Please type "holodja123" 

Then run the following commands. 

ALTER USER 'root'@'%' IDENTIFIED BY 'root' PASSWORD EXPIRE NEVER;
ALTER USER 'root'@'%' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'root';
FLUSH PRIVILEGES;

Type 'exit' to exit. 
