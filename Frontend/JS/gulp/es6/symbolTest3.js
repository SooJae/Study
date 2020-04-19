const BLUE =Symbol('blue');
const cat ='blue';

function getColor(color){
    switch(color){
        case BLUE:
            return 'low';
        default:
            console.log("error");
    }
}

getColor(BLUE);