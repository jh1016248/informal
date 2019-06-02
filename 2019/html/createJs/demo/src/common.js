
function imageFromPath(path) {
    let img = new Image();
    img.src = `../images/${path}`;
    return img
};
function log(msg) {
    console.log.call(console, msg)
}
const allImage = {
    background: '../images/background.jpg',
    ball: '../images/ball.png',
    paddle: '../images/paddle.png',
};


function observer() {

}