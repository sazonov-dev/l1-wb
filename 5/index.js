class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

const jsonToLinkedList = (json) => {
    const parsedJson = JSON.parse(json);
    let linkedObject = null;
    let currentObject = null;

    parsedJson.forEach((obj) => {
        const node = new Node(obj); // Создаем экзепляр класса, который вернет нам список

        if (linkedObject === null) { // Если обьект null, значит мы присваиваем ему экземпляр класса node
            linkedObject = node;
        } else {
            currentObject.next = node; // Если ссылка имеется, то создаем поле .next в обьекте и присваиваем новое значение node
        }

        currentObject = node; // Присваиваем последнее значение при итерации
    })

    return linkedObject;
}

const jsonData = '[{"a": 1}, {"b": 2}, {"c": 3}]';

console.log(jsonToLinkedList(jsonData))

