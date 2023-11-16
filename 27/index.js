const figure = document.querySelector('#figure');
const animateButton = document.querySelector('#animateButton');

const animateFunc = () => {
    const styles = [
        {width: '150px'},
        {height: '150px'},
        {borderRadius: '0'},
        {transform: 'rotate(0)'},
        {transform: 'rotate(360)'},
    ] // Задаем кейфрейм

    figure.animate(styles, {duration: 3000, iterations: Infinity}) // вызываем метод animate в который передаем keyframe, а так же настройки
}

animateButton.addEventListener('click', animateFunc);
