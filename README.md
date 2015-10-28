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

### Getting started
1. Download and unzip library's files
2. Add script `IPCCAgent.js` or minified version of it `IPCCAgent.min.js` to your web application's html flies
```
<script src="IPCCAgent.js"></script>
```
or
```
<script src="IPCCAgent.min.js"></script>
```
3. 

Note: If you are using Smile IPCC built-in web server for your web application, than your destination directory on the server would be

`<path to Smile IPCC directory on the server>/web/`

otherwise put files to your web server accordingly to your web application structure.

### How to use
Library's API expose the following mothods:
