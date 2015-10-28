# IPCC-Agent.js
### About
This is an official javascript library that provides a wrapper around Smile IPCC Agent API. 
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

### Getting started
1. Download and unzip library's archive
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

3. Initiate script with custom options or predefined defaults
```js
var agent = SmileSoft.Agent([options]);
```
The following options are available:

Option          | Description
----------------|----------------
`server`        | `String`. IPCC server IP address and port (if other from 80/443). Do not specify if your web app is hosted on the built-in web server, this option will be set automatically.
`websockets`    | `Boolean`. Default `true`. Set `false` to switch to `XMLHttpRequest`.
`updateInterval`| `Number`. Default `1000` ms (1 second). If `websockets` is `false`, this will define how often to request updates from IPCC server

### How to use
Library's API expose the following mothods:

### Error handling


