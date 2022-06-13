# STR Booking Portal

Steps to start project locally:
- Create database "strbooking"
- Copy `.env.example` to `.env`
- Update `DB_CONNECTION` to match local pg config 
- Populate tables using command below
> npm run db:migrate
- Generate initial data by running command:
> npm run seed:run
- Run the app using this command:
> npm run dev


---
Run this command to rollback the database whenever migrate files updated
> npm run db:rollback