/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

window.onerror = function(msg, url, linenumber) {
     console.error('Error message: '+msg+'\nURL: '+url+'\nLine number: '+linenumber);
 };


;(function(window, document){

    var agent,
        dialInput,
        callBtn,
        answerBtn,
        dropBtn,
        closeBtn,
        pauseBtn,
        confBtn,
        processInfo,
        stateInfo,
        exitCode;

    function addEvent(obj, evType, fn) {
      if (obj.addEventListener) obj.addEventListener(evType, fn, false);
      else if (obj.attachEvent) obj.attachEvent("on"+evType, fn);
    }

    function removeEvent(obj, evType, fn) {
      if (obj.removeEventListener) obj.removeEventListener(evType, fn, false);
      else if (obj.detachEvent) obj.detachEvent("on"+evType, fn);
    }

    //get agent state name from state code
    function getFriendlyState(state){
        var fstate;
        if(state === 0)
            fstate = 'Unregistered';
        else if(state === 1)
            fstate = 'Pause';
        else if(state === 3)
            fstate = 'Incoming call from';
        else if(state === 4)
            fstate = 'Outgoing call to';
        else if(state === 5 || state === 9)
            fstate = 'Connected with';
        else if(state === 6)
            fstate = 'Wrap';
        else if(state === 7)
            fstate = 'Generic Task';
        else if(state === 8)
            fstate = 'Idle';

        return fstate;
    }

    function init(){
        dialInput = document.getElementById('dial-input');
        callBtn = document.getElementById('call-btn');
        answerBtn = document.getElementById('answer-btn');
        dropBtn = document.getElementById('drop-btn');
        closeBtn = document.getElementById('close-btn');
        pauseBtn = document.getElementById('pause-btn');
        confBtn = document.getElementById('conf-btn');
        processInfo = document.getElementById('process-info');
        stateInfo = document.getElementById('state-info');
        exitCode = document.getElementById('exit-code');

        addEvent(callBtn, 'click', call);
        addEvent(answerBtn, 'click', answer);
        addEvent(dropBtn, 'click', drop);
        addEvent(closeBtn, 'click', close);
        addEvent(confBtn, 'click', conf);
        addEvent(pauseBtn, 'click', pause);
        
        agent = SmileSoft.Agent();
    }

    function call(){
        var number = dialInput.value;
        agent.call(number.toString());
    }

    function answer(){
        agent.answer();
    }

    function drop(){
        agent.drop();
    }

    function close(){
        var code = exitCode.value;
        if(code === '' || code === undefined || code === null) return;
        agent.close(agent.process.pid, parseInt(code, 10));
    }

    function pause(){
        if(agent.state === 1)
            agent.pause(0);
        else
            agent.pause(63);
    }

    function conf(){
        agent.conference();
    }

    SmileSoft.on('Error', function (params){
      console.log('Error: ', params);
    });

    SmileSoft.on('Agent.moduleInitiated', function (){
      console.log('Module initiated');
    });

    SmileSoft.on('Agent.statechange', function (params){
      console.log('onstatechange:', params);
      stateInfo.textContent = JSON.stringify(params);
    });

    SmileSoft.on('Agent.processchange', function (params){
      console.log('onprocesschange:', params);
      processInfo.textContent = JSON.stringify(params);
    });

    init();

})(window, document);
