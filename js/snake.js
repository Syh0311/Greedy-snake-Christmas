// 自调用函数 --  开启一个新的作用域，避免命名冲突
(function () {
  // 1.私有属性/函数
  let chunks = [],
    that = null,
    snakeOptions = {
      position: "absolute",
    };

  function runSnake(snake) {
    let timerId = setInterval(() => {
      // 1.蛇走一步
      that.snake.move();
      // 2.检测是否停止
      stop();
      // 2.重新渲染蛇
      that.snake.render(timerId);
    }, 200 * snake.level);
  }

  function stop(timerId) {
    // this.initState = JSON.parse(JSON.stringify(that.body));
    let head = that.body[0];
    if (head.x > 8 || head.x < 0 || head.y < 0 || head.y > 10) {
      alert("游戏停止");
    }
    clearInterval(timerId);
  }

  // 2.构造函数
  function Snake(options = {}) {
    this.size = options.size || 30;
    this.orientation = options.orientation || "right";
    this.level = options.level || 1;

    this.body = [
      { x: 3, y: 3, color: "red" },
      { x: 2, y: 3, color: "blue" },
      { x: 1, y: 3, color: "blue" },
    ];
    that = this;
  }

  Snake.prototype.render = function (map) {
    // 0.清空原来的
    if (chunks.length !== 0) {
      chunks.forEach((el) => {
        el.parentNode.removeChild(el);
      });
      chunks = [];
    }
    this.body.forEach((el) => {
      // 1.createElement
      let chunk = document.createElement("div");
      chunks.push(chunk);
      // 2.设置样式
      if (el.color === "red") {
        chunk.classList.add("head");
        chunk.style.position = snakeOptions.position;
        chunk.style.width = this.size + "px";
        chunk.style.height = this.size + "px";
        chunk.style.bottom = el.y * this.size + "px";
        chunk.style.left = el.x * this.size + "px";
      } else {
        chunk.classList.add("christmas-tree");
        chunk.style.position = snakeOptions.position;
        chunk.style.width = this.size + "px";
        chunk.style.height = this.size + "px";
        chunk.style.bottom = el.y * this.size + "px";
        chunk.style.left = el.x * this.size + "px";
        // chunk.style.backgroundColor = el.color;
      }

      // 3.add to parentNode
      map.appendChild(chunk);
    });
    // for (let i = 0; i < this.body.length; i++) {}
  };
  Snake.prototype.move = function (map) {
    // 0.渲染--生成
    this.render(map);
    // 1.后一个用上一个的位置【倒着来】
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
      // this.body[i] = this.body[i - 1];
    }
    // 1.2 head移动
    let head = this.body[0];
    switch (this.orientation) {
      // switch需要加break！！！
      case "left":
        head.x -= 1;
        break;
      case "right":
        head.x += 1;
        break;
      case "up":
        head.y += 1;
        break;
      case "down":
        head.y -= 1;
        break;
      default:
        break;
    }
  };
  Snake.prototype.add = function () {
    let tail = this.body[this.body.length - 1],
      newNode = JSON.parse(JSON.stringify(tail));
    switch (this.orientation) {
      case "left":
        newNode.x += 1;
        break;
      case "right":
        newNode.x -= 1;
        break;
      case "up":
        newNode.y -= 1;
        break;
      case "down":
        newNode.y += 1;
        break;
      default:
        break;
    }
    this.body.push(newNode);
  };

  // 3.暴露Snake到外部
  window.Snake = Snake;
})();

// 4.测试调用
// let map = document.querySelector("#playBox"),
//   snake = new Snake();

// snake.render(map);

// snake.move(map);
// setInterval(() => {
//   snake.move();
// }, 1000);

// let infobox = document.querySelector("#infoBox");
// infobox.addEventListener("click", () => {
//   console.log(1);
//   snake.move(map);
// });
