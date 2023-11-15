let i = 0;

const getMaxStackValue = (i) => {
    try {
        i++;
        getMaxStackValue(i);
    } catch (e) {
        console.log(`Максимальный обьем call stack: ${i}`)
    }
}

document.addEventListener('DOMContentLoaded', () => getMaxStackValue(i))

// Google Chrome - Максимальный обьем call stack: 7892
// Mozilla - Максимальный обьем call stack: 9853
// Opera - Максимальный обьем call stack: 6886
// Safari - Максимальный обьем call stack: 45634
