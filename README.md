# XML API

XML API is a server that exposes an `/analyse` endpoint. This endpoint accepts POST requests containing a link to an XML file in their body.
If the XML file contains valid Stack Overflow post data the server will return an analysis of the posts. The analysis includes the dates of the first and last posts, the total number of posts, the number of accepted posts and the average score across the posts.

Once the server is running you can test the endpoint by using curl commands, for example, such as the following: `curl -i -X POST -H "Content-Type:application/json" -d '{"url": "https://merapar-assessment-task.s3.eu-central-1.amazonaws.com/arabic-posts.xml"}' 'http://localhost:3000/analyse'
`.

This project was built as a solution to a tech test set by Merapar. Many thanks to Merapar for the opportunity. It was an interesting challenge!

## Running the app
- Install the deps with `npm install`

### Dev server
- Run `npm run dev`
- This will start a dev server with hot module reloading

### Prod build
- `npm run build` will run the prod build
- `npm run start` will serve it

### Docker
- Both dev and prod mode servers are available as Docker containers
- Make sure you have Docker installed on your system and use the commands in the Makefile to control the Docker builds:
- `make build` builds the containers
- `make up` runs the dev server container
- `make up-prod` runs the prod server container
- `make down` stops the containers

## Tests
- Tests are written using the jest framework
- Run them all with the `npm run test` command

### Component testing
- The file `analyse.xml.request.handler.spec.ts` contains a component test
- This suite tests the integrated implementation of analysis request handling, using a real version of the XML parser and real http requests, against a locally running server that serves mock data (in both valid and invalid formats).
- The mock server is implemented with express (like the main server) and is started and stopped simply as part of the running of the test.

### Unit testing
- The `xml.analyser.spec.ts` file contains a simple unit test of the XML analysis implementation.
- It tests that the analyses are correctly put together and that in the absence of valid data the class returns a date-stamped empty analysis with a fail message.

