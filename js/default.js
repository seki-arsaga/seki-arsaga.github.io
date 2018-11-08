var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

//変数の設定と初期化
var target = {x: 250, y: 100, dir:1}; // ターゲット（位置と移動方向）
var player = {x: 250, y: 400}; // プレイヤー（位置）
var point = 0; // 得点
var ballTypes = ["circle", "rect", "triangle", "text", "arc", "line"];
var balls = [{x: -10, y: -10, type: ballType()}];// ボール（位置）
var myBullet = [];
setInterval(anime, 50);

function anime(){ //アニメ関数

  //画面をクリア
  myClear();
  //targetを描画
  myTarget(target.x, target.y);
  //得点表示
  myPoint(point, target.x, target.y);
  //playerを描画
  myPlayer(player.x, player.y);
  //ballを描画
  moveBullet();

  //移動計算
  target.x += target.dir;

  //壁衝突計算
  if (target.x < 25 || 295 < target.x) target.dir *= -1;

}

//独自関数
function myClear(){
  c.clearRect(0, 0, canvas.width, canvas.height);
}

function myTarget(x,y){
  c.fillStyle = "black";
  c.fillRect(x - 25, y - 5, 50, 10);
}

function myPoint(point,x,y){
  c.fillStyle = "black";
  c.font = "20px sans-serif ";
  c.fillText(point, x, y - 5);
}

function myPlayer(x, y){
  c.fillStyle = "blue";
  c.fillRect(x - 25, y - 5, 50, 10);
}

function ballType() {
  return ballTypes[Math.floor( Math.random() * ballTypes.length)];
}

function moveBullet() {
  for(let i = 0; i < balls.length; i++) {
    myBullet[balls[i].type](balls[i].x - 5, balls[i].y);
    balls[i].y -= 5;
    //得点ゲット
    if ((100 == balls[i].y) && (Math.abs(target.x - balls[i].x) < 25)){
      point++;
      balls.splice(i, 1);
    }
  }
}

myBullet.rect = function(x, y) {
  c.fillStyle = "red";
  c.fillRect(x - 5, y - 5, 10, 10);
};

myBullet.circle = function(x, y) {
  c.beginPath();
  c.moveTo(x, y);
  c.arc(x, y, 10, 0, 2*Math.PI, false);
  c.closePath();
  c.fillStyle = "pink";
  c.fill();
};

myBullet.line = function(x, y) {
  c.beginPath();
  c.moveTo(x, y);
  c.lineTo(x - 5, y - 5);
  c.lineWidth = 1; //線の太さ
  c.strokeStyle = "green";
  c.stroke(); //枠を塗ります
};

myBullet.arc = function(x, y) {
  var angle = 10/180 * Math.PI;
  var r = 10;
  c.beginPath();
  c.arc(x, y, r, angle, angle * 30, false); //angle 0, PI, 1.5PI, 2PI, false 逆時計
  c.strokeStyle = "blue";
  c.lineWidth = 1;
  c.stroke();
};

myBullet.text = function(x, y) {
  c.fillStyle = "black";
  c.font = "12px serif";
  c.fillText("Wow!", x, y);
};

myBullet.triangle = function(x, y) {
  c.beginPath();
  c.moveTo(x, y);
  var height = Math.cos(30 * (Math.PI / 180)) * 10;
  c.lineTo(x + 5, y + height);
  c.lineTo(x - 10, y + height);
  c.closePath(); //原点に戻す
  c.fillStyle = "orange";
  c.fill(); //中身を塗ります
};

//シュートする関数
function addBullet() {
  balls.push({x: player.x - 10, y: player.y - 10, type: ballType()});
}

function addBulletWithKeyBoard(e) {
  if (e.keyCode === 32) addBullet();
}

function movePlayer(e) {
  let rect = e.target.getBoundingClientRect();
  player.x = e.clientX-rect.left;
}

function movePlayerWithKeyBoard(e) {
  let rect = e.target.getBoundingClientRect();
  if (player.x > 300) {
    player.x = 0;
  } else if (player.x < 0) {
    player.x = 300;
  }
  if (e.keyCode === 37) {
    player.x -= 5;
  } else if (e.keyCode === 39) {
    player.x += 5;
  }
}


canvas.addEventListener("mousedown", addBullet, false);
document.addEventListener("keydown", addBulletWithKeyBoard, true);

canvas.addEventListener("mousemove", movePlayer, false);
document.addEventListener("keyup", movePlayerWithKeyBoard, true);
