# botdb
Self hostable single JSON Bucket for our [Slack Bot](https://github.com/sdslabs/bot).

# Setup

1. Clone the repository
```
  git clone https://github.com/sdslabs/botdb
```

2. Install node modules and install `pm2`
```
  cd botdb
  npm i
  npm i pm2 -g
```

3. Create `config.json` inside the repository root folder with contents:
```json
{
  "token": "< secret bearer token >"
}
```

4. Start the server
```
  pm2 start index.js
```

## API

All requests must have `Content-Type` header set to `application/json` and should have a `Bearer` authentication token. Token can be any string.

* `GET /` - Get JSON contents.
* `PUT /` - Write JSON contents. Body should be a valid JSON string. 

