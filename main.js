const carApp = {
  data() {
    return {
      cars: Seed.cars,
      我要氣囊有六顆以上: false,
      我要自煞: false,
      我要前預: false,
      我要盲點: false,
      我要偏維: false,
      我要上坡: false,
      我要偏警: false,
      我要定速: "",
      minPrice: 40,
      maxPrice: 300
    }
  },
  computed: {
    filteredCars() {
      var cars = this.cars;
      if (this.我要氣囊有六顆以上) {
        cars = cars.filter(function (car) {
          return car.氣囊 >= 6;
        });
      }
      if (this.我要自煞) {
        cars = cars.filter(function (car) {
          return car.自煞;
        });
      }
      if (this.我要前預) {
        cars = cars.filter(function (car) {
          return car.前預;
        });
      }
      if (this.我要盲點) {
        cars = cars.filter(function (car) {
          return car.盲點;
        });
      }
      if (this.我要偏維) {
        cars = cars.filter(function (car) {
          return car.偏維;
        });
      }
      if (this.我要上坡) {
        cars = cars.filter(function (car) {
          return car.上坡;
        });
      }
      if (this.我要偏警) {
        cars = cars.filter(function (car) {
          return car.偏警;
        });
      }
      if (this.我要定速) {
        if (this.我要定速 == "定速") {
          cars = cars.filter(function (car) {
            return car.定速;
          });
        }
        else if (this.我要定速 == "半Ａ") {
          cars = cars.filter(function (car) {
            return car.定速 == "半Ａ" || car.定速 == "全Ａ";
          });
        }
        else if (this.我要定速 == "全Ａ") {
          cars = cars.filter(function (car) {
            return car.定速 == "全Ａ";
          });
        }
        cars = cars.filter(function (car) {
          return car.定速;
        });
      }
      if (this.minPrice) {
        var minPrice = this.minPrice;
        cars = cars.filter(function (car) {
          return Number(car.價格) >= Number(minPrice);
        });
      }
      if (this.maxPrice) {
        var maxPrice = this.maxPrice;
        cars = cars.filter(function (car) {
          return Number(car.價格) <= Number(maxPrice);
        });
      }
      return cars;
    },
  },
};

Vue.createApp(carApp).mount("#app");

var s = ``;
// loadData(s);
function loadData(s)
{
  var 廠牌 = "";
  var 車名 = "";
  var qs = s.split("\n");
  qs.forEach((q, i1) => {
    if (q == "")
    {
      車名 = qs[i1+1];
    }
    var ws = q.split(" ");
    var es = [];
    ws.forEach(w => {
      if (w != "") es.push(w);
    });
    es.forEach((e, i2) => {
      if (e.includes("[")) {
        廠牌 = e.substring(1, e.length-1);
      }
      else if (i2 == 0) {
        document.write('<div>},</div>');
        document.write('<div>{</div>');
        document.write('<div>廠牌: "' + 廠牌 + '",</div>');
        document.write('<div>車名: "' + 車名 + '",</div>');
        document.write('<div>形式: "' + e + '",</div>');
      }
      else if (i2 == 1) {
        document.write('<div>價格: "' + e + '",</div>');
      }
      else if (e.includes("具")) {
        document.write('<div>氣囊: "' + e.substring(0, e.length-1) + '",</div>');
      }
      else if (e.includes("定") || e.includes("半Ａ") || e.includes("全Ａ")) {
        document.write('<div>定速: "' + e + '",</div>');
      }
      else if (e.includes("上坡") || e.includes("自煞") || e.includes("盲點") || e.includes("斜坡")) {
        var rs = e.split(".");
        rs.forEach(r => {
          document.write('<div>' + r + ': "' + r + '",</div>');
        });
      }
      else if (!isNaN(e)) {
        document.write('<div>油耗: "' + e + '",</div>');
      }
      else {
        document.write('<div>備註: "' + e + '",</div>');
      }
    });
  });
}