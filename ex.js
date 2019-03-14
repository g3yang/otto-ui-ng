const {of} = require('rxjs');

const source = of('I love you!');

source.subscribe(val=>{
    console.log(val);
})