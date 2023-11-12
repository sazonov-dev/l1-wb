const one = () => true;
const two = () => true;
const three = () => true;
const four = () => true;
const five = () => true;

const funcArray = [one, two, three, four, five];


const funcStarter = (array) => {
    array.forEach((func, index) => {
        func();
        console.log(`func index ${index}`)
    })
}

funcStarter(funcArray);
