const one = () => true;
const two = () => false;
const three = () => '123';
const four = () => 123;
const five = () => 'hello world';

const funcArray = [one, two, three, four, five];

const func = (funcArray) => {
    const funcStarter = (array) => {
        return array.map((func) => func());
    }

    return funcStarter(funcArray);
}

console.log(func(funcArray));
