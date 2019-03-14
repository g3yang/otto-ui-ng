

const countingZoneSpec = {
    name: 'counterZone',
    onScheduleTask: function(delegate, current, target, task){
        this.data.count+=1;
        delegate.scheduleTask(target, task);
    },
    onInvokeTask: function(delegate, current, target, task, applyThis, applyArgs){
        delegate.invokeTask(target, task, applyThis, applyArgs);
        this.data.count -=1;
    },
    onHasTask: function (delegate, current, target, hasTask) {
        if (this.data.count === 0 && !this.data.flushed) {
          this.data.flushed = true;
          target.run(this.onFlush);
        }
    },
    counter: function () {
        return this.data.count;
    },
    data: {
        count: 0,
        flushed: false,
        tasks:[]
    },
    onFlush: function () { }
}

const outputElem = document.getElementById('output');

const myCountingZone = Zone.current.fork(countingZoneSpec).fork({
    onScheduleTask (parent, current, target, task){
        parent.scheduleTask(target, task);
        console.log('Scheduled '+ task.source +' => '+ task.data.handleId);
        outputElem.innerText = countingZoneSpec.counter();
    },
    onInvokeTask(parent, current, target, task){
        console.log('Invoking ' + task.source + ' => ' + task.data.handleId);
        parent.invokeTask(target, task);
        outputElem.innerText = countingZoneSpec.counter();
    },
    onHasTask(parent, current, target, hasTask) {
        if (hasTask.macroTask) {
          console.log("There are outstanding MacroTasks.");
        } else {
          console.log("All MacroTasks have been completed.");
        }
    }
}).run(()=>{
    b1.addEventListener('click', ()=>{
        setTimeout(()=>{
            alert('Nicolas')
        },1000)
    })
});

const recur = (x, t)=>{
    if(x>0){
        setTimeout((str)=>{
            console.log(str);
            recur(x-1, t)
        }, t)
    }
}
