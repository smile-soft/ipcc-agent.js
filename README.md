# IPCC-Agent.js
### About
This is an official javascript module that provides a wrapper around Smile IPCC Agent API. 
It exposes a simple API to operate main Agent's functionality, such as:
- Answer to incoming call
- Initiate outgoing call
- Drop current call
- Set Agent into PAUSE state
- Switch from WRAP to IDLE state
- Press the conference button
- Press the hold butto
- Close specified process
- Get current state and process

### Features implemented out of the box
- Websocket connection and events management
- Websocket recconection exponential backoff algorithm
- Fallback to XMLHttpRequest if browser has no Websocket protocol support
- Pub/Sub implementation for custom event management

### Installation
1. Download and unzip module's archive
2. Add script `IPCCAgent.js` or minified version of it `IPCCAgent.min.js` to your web application's html flies
```html
<script src="IPCCAgent.js"></script>
```
or
```html
<script src="IPCCAgent.min.js"></script>
```
Note: include lib's script before your web application javascript flies

Note: If you are using Smile IPCC built-in web server for your web application, than your destination directory on the server would be
```
<path to Smile IPCC directory on the server>/web/
```
otherwise put files to your web server accordingly to your web application structure.

### Getting started
Module exposes one global object `SmileSoft`, which emits global events from all connected modules. It has three public methods:
- `on`: subscribe for global events
- `emit`: emit global event
- `Agent`: function that when called return module public API

#### Initiate module
```js
var agent = SmileSoft.Agent(options);
```
`options` is an optional object, which could contain the following parameters:

Option          | Description
----------------|----------------
`server`        | `String`. IPCC server IP address and port (if other from 80/443). Do not specify if your web app is hosted on the built-in web server, this option will be set automatically.
`websockets`    | `Boolean`. Default `true`. Set `false` to switch to `XMLHttpRequest`.
`updateInterval`| `Number`. Default `1000` ms (1 second). If `websockets` is `false`, this will define how often to request updates from IPCC server

#### Event management
Ways to subscribe for event
- Subscribe for global event

```js
SmileSoft.on([moduleName.]eventName, callback);
```
- Subscribe for module event

```js
var agent = SmileSoft.Agent();
agent.on(eventName, callback);
```

Ways to emit event
- Emit global event

```js
SmileSoft.emit([moduleName.]eventName, parameters);
```
- Emit module event

```js
var agent = SmileSoft.Agent();
agent.emit(eventName, parameters);
```

Unsubscribe from event
```js
var agent = SmileSoft.Agent();
var event = agent.on(eventName, callback);

// Some time in the future
event.off();
```

Currently module emits the following events:
##### `ready` - module initiated
##### `statechange` - agent state changed (e.g. from WRAP to IDLE)
Parameters:
- `state`: agent state (see Agent states) 
- `substate`: agent substate (see Agent substates)

##### `processchange` - process changed (e.g. when receive or init call)
Parameters:
- `pid`: process id
- `type`: process type (see process types)
- `task`: task name
- `caller`: caller number
- `called`: called number
- `username`: caller name (if identified)
- `userinfo`: list of fields of client's card like "<param>:<value>"

### API
Your can use module's API like this:
```js
// First initiate the module
var agent = SmileSoft.Agent([options]);
// Than for example
agent.call('380951234567');
```
API expose the following methods:
#### `on`
Subscribe for module events
#### `emit`
Emit module event
#### `process`
Returns current process parameters
#### `state`
Returns agebt current state
#### `substate`
Returns agent current substate
#### `call`
Initiate outgoing call to specified number
#### `answer`
Answer to current incoming call
#### `hold`
Press hold button
#### `idle`
Switch to IDLE state (only from WRAP or PAUSE states).
#### `conference`
Press conference button
#### `drop`
Drop current call
#### `close`
Close current process with specified exit code
#### `pause`
Switch to PAUSE state with the specified pause code

### Error handling
To handle errors you can subscribe for `Error` event.
```js
SmileSoft.on('Agent.Error', handler);
or
agent.on('Error', handler);
```
Parameters:
- `module`: module name, which emit the error
- `error`: error object

### Lisence
MIT
