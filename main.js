const carApp = {
    data() {
        return {
            cars: [], //Seed.cars,
            產地s: [],
            我要氣囊有六顆以上: false,
            我要環景: false,
            我要盲點: false,
            我要自停: false,
            我要自煞: "",
            我要後煞: "",
            我要置中: "",
            我要斜坡: "",
            我要定速: "",
            我要進口: "",
            我要產地: [],
            minPrice: 40,
            maxPrice: 300
        }
    },
    computed: {
        filteredCars() {
            var cars = this.cars;
            cars = cars.filter(function(car) {
                return car.移除 == "";
            });
            if (this.我要氣囊有六顆以上) {
                cars = cars.filter(function(car) {
                    return car.氣囊 >= 6;
                });
            }
            if (this.我要環景) {
                cars = cars.filter(function(car) {
                    return car.環景;
                });
            }
            if (this.我要盲點) {
                cars = cars.filter(function(car) {
                    return car.盲點;
                });
            }
            if (this.我要自停) {
                cars = cars.filter(function(car) {
                    return car.自停;
                });
            }
            if (this.我要自煞) {
                if (this.我要自煞 == "前預") {
                    cars = cars.filter(function(car) {
                        return car.自煞 == "前預" || car.自煞 == "自煞";
                    });
                } else if (this.我要自煞 == "自煞") {
                    cars = cars.filter(function(car) {
                        return car.自煞 == "自煞";
                    });
                }
            }
            if (this.我要後煞) {
                if (this.我要後煞 == "後警") {
                    cars = cars.filter(function(car) {
                        return car.後煞 == "後警" || car.後煞 == "後煞";
                    });
                } else if (this.我要後煞 == "後煞") {
                    cars = cars.filter(function(car) {
                        return car.後煞 == "後煞";
                    });
                }
            }
            if (this.我要置中) {
                if (this.我要置中 == "偏警") {
                    cars = cars.filter(function(car) {
                        return car.置中 == "偏警" || car.置中 == "偏維" || car.置中 == "置中";
                    });
                } else if (this.我要置中 == "偏維") {
                    cars = cars.filter(function(car) {
                        return car.置中 == "偏維" || car.置中 == "置中";
                    });
                } else if (this.我要置中 == "置中") {
                    cars = cars.filter(function(car) {
                        return car.置中 == "置中";
                    });
                }
            }
            if (this.我要斜坡) {
                if (this.我要斜坡 == "上坡") {
                    cars = cars.filter(function(car) {
                        return car.斜坡 == "上坡" || car.斜坡 == "斜坡";
                    });
                } else if (this.我要斜坡 == "斜坡") {
                    cars = cars.filter(function(car) {
                        return car.斜坡 == "斜坡";
                    });
                }
            }
            if (this.我要定速) {
                if (this.我要定速 == "定速") {
                    cars = cars.filter(function(car) {
                        return car.定速 == "定" || car.定速 == "半Ａ" || car.定速 == "全Ａ";
                    });
                } else if (this.我要定速 == "半Ａ") {
                    cars = cars.filter(function(car) {
                        return car.定速 == "半Ａ" || car.定速 == "全Ａ";
                    });
                } else if (this.我要定速 == "全Ａ") {
                    cars = cars.filter(function(car) {
                        return car.定速 == "全Ａ";
                    });
                }
            }
            if (this.我要進口) {
                if (this.我要進口 == "我要進口車") {
                    cars = cars.filter(function(car) {
                        return car.進口;
                    });
                } else if (this.我要進口 == "我不要進口車") {
                    cars = cars.filter(function(car) {
                        return !car.進口;
                    });
                }
            }
            if (this.我要產地.length != 0) {
                var 我要產地 = this.我要產地
                cars = cars.filter(function(car) {
                    return 我要產地.includes(car.進口);
                });
            }
            if (this.minPrice) {
                var minPrice = this.minPrice;
                cars = cars.filter(function(car) {
                    return Number(car.價格) >= Number(minPrice);
                });
            }
            if (this.maxPrice) {
                var maxPrice = this.maxPrice;
                cars = cars.filter(function(car) {
                    return Number(car.價格) <= Number(maxPrice);
                });
            }
            return cars;
        },
    },
    mounted() {
        var cars = this.cars;
        var 產地s = this.產地s;
        axios
            .get("https://spreadsheets.google.com/feeds/list/1mhzx27NSTiFYdhkNqU7j-tXExtz-1EzNC0ayTHFZDQc/1/public/values?alt=json")
            .then(function(response) {
                response.data.feed.entry.forEach(function(value) {
                    var car = {
                        "廠牌": value.gsx$廠牌.$t,
                        "車名": value.gsx$車名.$t,
                        "形式": value.gsx$形式.$t,
                        "價格": value.gsx$價格.$t,
                        "油耗": value.gsx$油耗.$t,
                        "定速": value.gsx$定速.$t,
                        "氣囊": value.gsx$氣囊.$t,
                        "自煞": value.gsx$自煞.$t,
                        "後煞": value.gsx$後煞.$t,
                        "置中": value.gsx$置中.$t,
                        "斜坡": value.gsx$斜坡.$t,
                        "環景": value.gsx$環景.$t,
                        "盲點": value.gsx$盲點.$t,
                        "自停": value.gsx$自停.$t,
                        "備註": value.gsx$備註.$t,
                        "馬力": value.gsx$馬力.$t,
                        "扭力": value.gsx$扭力.$t,
                        "變速": value.gsx$變速.$t,
                        "車長": value.gsx$車長.$t,
                        "車寬": value.gsx$車寬.$t,
                        "車高": value.gsx$車高.$t,
                        "行李容積": value.gsx$行李容積.$t,
                        "移除": value.gsx$移除.$t,
                        "進口": value.gsx$進口.$t,
                        "動力系統": value.gsx$動力系統.$t,
                    };
                    if (!產地s.includes(car.進口) && car.進口) 產地s.push(car.進口);
                    cars.push(car);
                });
            });
    }
};

Vue.createApp(carApp).mount("#app");

var s = ``;
// loadData(s);
function loadData(s) {
    var 廠牌 = "";
    var 車名 = "";
    var qs = s.split("\n");
    qs.forEach((q, i1) => {
        if (q == "") {
            車名 = qs[i1 + 1];
        }
        var ws = q.split(" ");
        var es = [];
        ws.forEach(w => {
            if (w != "") es.push(w);
        });
        es.forEach((e, i2) => {
            if (e.includes("[")) {
                廠牌 = e.substring(1, e.length - 1);
            } else if (i2 == 0) {
                document.write('<div>},</div>');
                document.write('<div>{</div>');
                document.write('<div>廠牌: "' + 廠牌 + '",</div>');
                document.write('<div>車名: "' + 車名 + '",</div>');
                document.write('<div>形式: "' + e + '",</div>');
            } else if (i2 == 1) {
                document.write('<div>價格: "' + e + '",</div>');
            } else if (e.includes("具")) {
                document.write('<div>氣囊: "' + e.substring(0, e.length - 1) + '",</div>');
            } else if (e.includes("定") || e.includes("半Ａ") || e.includes("全Ａ")) {
                document.write('<div>定速: "' + e + '",</div>');
            } else if (e.includes("上坡") || e.includes("自煞") || e.includes("盲點") || e.includes("斜坡")) {
                var rs = e.split(".");
                rs.forEach(r => {
                    document.write('<div>' + r + ': "' + r + '",</div>');
                });
            } else if (!isNaN(e)) {
                document.write('<div>油耗: "' + e + '",</div>');
            } else {
                document.write('<div>備註: "' + e + '",</div>');
            }
        });
    });
}