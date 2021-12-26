// 自调用函数 --  开启一个新的作用域，避免命名冲突
(function () {
  // 1.私有属性，方法
  let foodOption = {
    position: "absolute",
  };

  // 2.Food构造函数
  function Food(options = {}) {
    this.x = options.x || 100;
    this.y = options.y || 100;
    this.size = options.size || 30;
    this.color = options.color || "red";
    this.border = options.border || 10; //食物生成距离边界的距离
  }

  // 2.1正常生成食物
  Food.prototype.generate = function (map) {
    // 0.删除上一个
    let lastfood = document.querySelector("#food");
    if (lastfood) lastfood.parentNode.removeChild(lastfood);
    //1.添加食物
    let food = document.createElement("div");
    map.appendChild(food);
    food.setAttribute("id", "food");

    //2.设置相关属性
    // 2.1 随机位置【先单位化！】
    // old version
    // this.x = Tools.getRandom(0, map.offsetWidth / this.size - 2) * this.size;
    this.x = Tools.getRandom(0, map.offsetWidth / this.size - 2) * this.size;
    this.y = Tools.getRandom(0, map.offsetHeight / this.size - 2) * this.size;
    // this.y = Tools.getRandom(this.border, map.offsetHeight / this.size - this.border) * this.size;

    // 2.2 样式
    food.classList.add("christmas-tree");
    food.style.position = foodOption.position; //设置成变量，方便维护！！
    food.style.left = this.x + "px";
    food.style.top = this.y + "px";
    // food.style.backgroundColor = this.color;
    food.style.width = this.size + "px";
    food.style.height = this.size + "px";
    food.style.borderRadius = "50%";
  };

  // 2.2. 无敌模式生成食物
  // 2.2.1 添加食物
  Food.prototype.addNodeByGua = function (head) {
    // 0.删除上一个
    let lastfood = document.querySelector("#food");
    if (lastfood) lastfood.parentNode.removeChild(lastfood);
    //1.添加食物
    let food = document.createElement("div");
    map.appendChild(food);
    food.setAttribute("id", "food");

    //2.设置相关属性
    // 2.1 随机位置【先单位化！】
    console.log(head);
    this.x = head.x;
    this.y = head.y;

    // 2.2 样式
    food.classList.add("christmas-tree");
    food.style.position = foodOption.position; //设置成变量，方便维护！！
    food.style.left = this.x * this.size + "px";
    food.style.top = this.y * this.size + "px";
    // food.style.backgroundColor = this.color;
    food.style.width = this.size + "px";
    food.style.height = this.size + "px";
    food.style.borderRadius = "50%";
  };
  // 2.2.2 判断方向
  Food.prototype.kaiGua = function (snake) {
    // 这的snake还是浅拷贝？？？
    let { direction, head, size } = JSON.parse(JSON.stringify(snake)),
      playBox = document.querySelector("#playBox"),
      yNum = Math.floor((playBox.getBoundingClientRect().bottom - playBox.getBoundingClientRect().top) / size),
      xNum = Math.floor((playBox.getBoundingClientRect().right - playBox.getBoundingClientRect().left) / size);
    console.log(head);
    // 1.永远生成在前方
    switch (direction) {
      case "left":
        if (head.x < 2) head.x = xNum - 1;
        else head.x -= 2;
        this.addNodeByGua(head);
        break;
      case "right":
        // 三元表达式代替单句的if else
        head.x = head.x + 2 > xNum ? 1 : head.x + 2;
        this.addNodeByGua(head);
        break;
      case "up":
        head.y -= 2;
        head.y = head.y - 2 < 0 ? yNum - 1 : head.y - 2;
        this.addNodeByGua(head);
        break;
      case "down":
        head.y = head.y + 3 > yNum ? 1 : head.y + 2;
        this.addNodeByGua(head);
        break;
      default:
        break;
    }
    // 2.生成在周围几个方格内
  };

  // 3.把food传出去【专业说法：暴露构造函数给外部！】
  window.Food = Food;
})();

// let playbox = document.querySelector("#playBox");
// let food = new Food();
// food.generate(playbox);
