// 自调用函数 --  开启一个新的作用域，避免命名冲突
(function () {
  function Food(options = {}) {
    this.x = options.x || 100;
    this.y = options.y || 100;
    this.size = options.size || 30;
    this.color = options.color || "red";
    this.border = options.border || 10; //食物生成距离边界的距离
  }

  let foodOption = {
    position: "absolute",
  };

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
    this.x = Tools.getRandom(0, map.offsetWidth / this.size - 2) * this.size;
    this.y = Tools.getRandom(0, map.offsetHeight / this.size - 2) * this.size;
    // this.y = Tools.getRandom(this.border, map.offsetHeight / this.size - this.border) * this.size;

    // 2.2 样式
    food.classList.add("christmas-tree");
    food.style.position = foodOption.position; //设置成变量，方便维护！！
    food.style.left = this.x + "px";
    food.style.bottom = this.y + "px";
    // food.style.backgroundColor = this.color;
    food.style.width = this.size + "px";
    food.style.height = this.size + "px";
    // food.style.borderRadius = "50%";
  };

  // 3.【私有方法】删除食物，写在原型外，不是谁都能删除的！！
  function deleteFood() {}

  // setInterval(() => {
  //   food.generate(playbox);
  //   deleteFood();
  // }, 2000);

  //4.把food传出去【专业说法：暴露构造函数给外部！】
  window.Food = Food;
})();

// let playbox = document.querySelector("#playBox");
// let food = new Food();
// food.generate(playbox);
