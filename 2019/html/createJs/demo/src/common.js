function imageFromPath(path) {
    let img = new Image();
    img.src = `../images/${path}`;
    return img
};

const allImage = {
    background: '../images/background.jpg',
    ball: '../images/ball.png',
};
