# XML API

XML API is a server that exposes an `/analyse` endpoint. This endpoint accepts POST requests containing a link to an XML file in their body.
If the XML file contains valid Stack Overflow post data the server will return an analysis of the posts. The analysis includes the dates of the first and last posts, the total number of posts, the number of accepted posts and the average score across the posts.

Once the server is running you can test the endpoint by using curl commands, for example, such as the following: `curl -i -X POST -H "Content-Type:application/json" -d '{"url": "https://merapar-assessment-task.s3.eu-central-1.amazonaws.com/arabic-posts.xml"}' 'http://localhost:3000/analyse'
`. This request returns the following response: `{"analyseDate":"2021-08-10T11:13:00.950Z","details":{"firstPost":"2015-07-14T18:39:27.757","lastPost":"2015-09-14T12:46:52.053","totalPosts":160,"totalAcceptedPosts":14,"avgScore":2.975}}%`

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
- Make sure you have Docker installed on your system and use the commands in the Makefile:
- `make build` builds the containers
- `make up` runs the dev server container
- `make up-prod` runs the prod server container
- `make down` stops the containers

## Tests
- Tests are written using the jest framework
- Run them all with the `npm run test` command

### Component testing
- The file `analyse.xml.request.handler.spec.ts` contains a component test suite that tests the integrated implementation of analysis request handling, using a real version of the XML parser and real http requests, against a locally running server that serves mock data (in both valid and invalid formats).
- The mock server is implemented with express (like the main server) and is started and stopped simply as part of the running of the test.

### Unit testing
- The `xml.analyser.spec.ts` file contains a simple unit test of the XML analysis implementation.
- It tests that the analyses are correctly put together and that in the absence of valid data the class returns a date-stamped empty analysis with a fail message.

## Implementation details
### Streaming
- One of the most important things to get right, it seemed to me, was the ability of the server to be able to process files that are >1Gb in size.
To do this, my app reads the XML file as a stream, which is then piped through an XML parser. The parser converts the raw XML to JSON, which is stored temporarily in an array before being forwarded to the XmlAnalyser class for analysis.
- I used the `got` library to make requests to the XML servers because it provides a very neat way of streaming data: `got.stream(url)` returns a node.js Readable stream.
- One obstacle I faced was that the parser I used, node-expat, is implemented in such a way that it was impossible for me to use the node.js `stream/promises` API, which allows stream events to be "awaited" as Promises. This forced me to use the `wait-for-event`
library, with its handy `waitFor` API. With more time, however I would have liked to find an alternative way of doing this.

### Error handling
- POST requests to the `/analyse` endpoint that do not contain a valid URL will receive a 400 response.
- Errors thrown by the request handler will be caught and forwarded to the user in a 500 response.
- Errors thrown "in-stream" by XML processing system are logged rather than thrown. This allows the server to return an empty analysis rather than an error in cases where the URL it receives is perfectly formed but the response the URL returns can't be parsed.
