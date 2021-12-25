//自调用函数，开启新的作用域，之暴露需要暴露的变量，避免明明冲突
(function () {
  let that = null;
  function Game() {
    this.food = new Food();
    this.snake = new Snake();

    that = this;
  }

  Game.prototype.start = function (map) {
    console.log(map);
    // this.food.generate(map);
    runSnake(map);
  };

  function addNode() {
    // 1.判断蛇与食物相遇
    let xS = [],
      yS = [],
      food = document.querySelector("#food");
    map.childNodes.forEach((el) => {
      if (el.id === "food") return;
      //这的map哪来的？？
      xS.push(el.style.left);
      yS.push(el.style.bottom);
    });
    if (xS.includes(food.style.left) && yS.includes(food.style.bottom)) {
      console.log("eat");
      that.food.generate(map); //这的map哪来的？？
      that.snake.add();
    }
    // 2.删除食物，加新的
  }

  function stop(timerId) {
    let head = that.snake.body[0];
    console.log(head);
    if (head.x > 8 || head.x < 0 || head.y < 0 || head.y > 10) {
      alert("游戏停止");
      that.snake.body = [
        { x: 3, y: 3, color: "red" },
        { x: 2, y: 3, color: "blue" },
        { x: 1, y: 3, color: "blue" },
      ];
      clearInterval(timerId);
    }
  }

  function runSnake(map) {
    // 0.监听按键事件
    listerner();
    let timerId = setInterval(() => {
      // 1.蛇走一步
      that.snake.move(map);
      // 2.检测是否停止
      stop(timerId);
      // 3.吃到food？
      addNode(map);
    }, 100);
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

game.food.generate(map);
game.start(map);
