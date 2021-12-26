//自调用函数，开启新的作用域，之暴露需要暴露的变量，避免明明冲突
(function () {
  let that = {},
    head = null,
    score = 0,
    scoreSpan = document.querySelector("#score"),
    kaigua = false;
  function Game() {
    this.food = new Food();
    this.snake = new Snake();

    that = this;
    head = this.snake.body[0];
  }

  Game.prototype.start = function (map) {
    // // 1.生成第一个食物
    // // 1.1正常生成食物
    that.food.generate(map);
    // // 1.2. 无敌模式生成食物
    // // that.food.kaiGua(map);
    scoreSpan.innerT;
    xt = score;
    // 2.snake相关
    // 2.1.监听按键事件
    listerner();
    // 2.2 setInterval
    let timerId = setInterval(() => {
      // 1.蛇走一步
      that.snake.move(map);

      // 2.检测是否停止
      if (kaigua === false) stop(timerId);
      else kaiGua(timerId);

      // 3.吃到food？
      addNode(map);
    }, 300);
  };

  function addNode() {
    // 1.判断蛇与食物相遇
    let food = document.querySelector("#food"),
      headX = head.x * that.snake.size + "px",
      headY = head.y * that.snake.size + "px";
    if (headX == food.style.left && headY == food.style.top) {
      // console.log("eat");
      // 分数加1
      score += 1;
      scoreSpan.innerText = score;
      // 2.删除食物，加新的

      if (kaigua === false) {
        // 2.1正常生成食物
        that.food.generate(map); //这的map哪来的？？
      } else {
        // 2.2. 无敌模式生成食物
        let tempSnake = {
          direction: that.snake.orientation,
          head: that.snake.body[0],
          size: that.snake.size,
        };
        that.food.kaiGua(tempSnake);
      }

      // 3 蛇加一节
      that.snake.add();
    }
  }

  function stop(timerId) {
    let playBox = document.querySelector("#playBox"),
      headX = head.x * that.snake.size,
      headY = head.y * that.snake.size,
      boxheight = playBox.getBoundingClientRect().bottom - playBox.getBoundingClientRect().top,
      boxwidth = playBox.getBoundingClientRect().right - playBox.getBoundingClientRect().left;

    if (headX > boxwidth || headX < -that.snake.size || headY < -that.snake.size || headY > boxheight) {
      alert("Game Over!");
      that.snake.body = [
        { x: 3, y: 3, color: "red" },
        { x: 2, y: 3, color: "blue" },
        { x: 1, y: 3, color: "blue" },
      ];
      clearInterval(timerId);
    }
  }

  function kaiGua() {
    let playBox = document.querySelector("#playBox"),
      // head = that.snake.body[0],
      size = that.snake.size,
      headX = head.x * size,
      headY = head.y * size,
      boxheight = playBox.getBoundingClientRect().bottom - playBox.getBoundingClientRect().top,
      boxwidth = playBox.getBoundingClientRect().right - playBox.getBoundingClientRect().left;

    //不死之身
    //x轴
    // console.log([headX, boxwidth]);
    if (headX < -size / 2) {
      that.snake.body[0].x = Math.floor(boxwidth / size) - 1;
    } else if (headX > boxwidth) {
      // headXNum = 0;//无用，这是简单类型，直接赋值的！！
      that.snake.body[0].x = 0;
    }
    // Y轴
    if (headY < -size / 2) {
      that.snake.body[0].y = Math.floor(boxheight / size) - 1;
    } else if (headY > boxheight - size) {
      that.snake.body[0].y = 0;
    }

    //幸运儿，食物诞生在眼前
  }

  function listerner() {
    document.addEventListener(
      "keydown",
      (e) => {
        // console.log(e.key);
        switch (e.key) {
          case "ArrowLeft":
            that.snake.orientation = "left";
            break;
          case "ArrowUp":
            that.snake.orientation = "up";
            break;
          case "ArrowRight":
            that.snake.orientation = "right";
            break;
          case "ArrowDown":
            that.snake.orientation = "down";
            break;
          default:
            break;
        }
      },
      false //false是冒泡还是
    );
  }

  // 暴露到外部
  window.Game = Game;
})();

let game = new Game(),
  map = document.querySelector("#playBox");

game.start(map);
