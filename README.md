# HodlInfo

### Database setup (read all the steps before following)
- download and install postgres v16 for desktop
- create a database of your choice
- remember the username, password, database name, and port. We will need them for connection string

Setup database before following the steps given below.
### To run this locally:
1. clone this repo
2. `npm install`
3. make a .env in root and make a `POSTGRES_CONNECTION_STRING` variable and put the postgres connection string with username, password, host, port, and database
4. Run `npm run dev` in one terimnal and `npm run watch:css` in another terminal. You may setup concurrently instead of two separate terminals
5. Your application should start on localhost:3000