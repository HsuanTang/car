Vue.component('radar-chart', {
    extends: VueChartJs.Radar,
    props: ['carkey', '自煞', '後煞', '置中', '斜坡', '環景', '盲點', '自停'],
    methods: {
        draw() {
            var 自煞data = 0.1;
            var 後煞data = 0.1;
            var 置中data = 0.1;
            var 斜坡data = 0.1;
            var 環景data = 0.1;
            var 盲點data = 0.1;
            var 自停data = 0.1;
            if (this.自煞 == "自煞") {
                自煞data = 1;
            } else if (this.自煞 == "前預") {
                自煞data = 0.5;
            }

            if (this.後煞 == "後煞") {
                後煞data = 1;
            } else if (this.後煞 == "後警") {
                後煞data = 0.5;
            }

            if (this.置中 == "置中") {
                置中data = 1;
            } else if (this.置中 == "偏維") {
                置中data = 0.7;
            } else if (this.置中 == "偏警") {
                置中data = 0.4;
            }

            if (this.斜坡 == "斜坡") {
                斜坡data = 1;
            } else if (this.斜坡 == "上坡") {
                斜坡data = 0.5;
            }

            if (this.環景 == "環景") {
                環景data = 1;
            } else if (this.環景 == "倒顯") {
                環景data = 0.5;
            }

            if (this.盲點 == "盲點") {
                盲點data = 1;
            }

            if (this.自停 == "自停") {
                自停data = 1;
            }
            this.renderChart({
                labels: ['自煞', '後煞', '置中', '斜坡', '環景', '盲點', '自停'],
                datasets: [{
                    label: '輔助駕駛',
                    backgroundColor: '#f87979',
                    data: [自煞data, 後煞data, 置中data, 斜坡data, 環景data, 盲點data, 自停data]
                }]
            }, {
                responsive: true,
                maintainAspectRatio: true,
                scale: {
                    ticks: {
                        beginAtZero: true,
                        max: 1
                    }
                }
            });
        }
    },
    mounted: function() {
        this.draw();
    },
    watch: {
        carkey: function(newVal, oldVal) {
            this.draw();
        }
    }
})

new Vue({
    el: '#app',
    data() {
        return {
            cars: [],
            產地s: [],
            我要氣囊有六顆以上: false,
            我要環景: false,
            我要盲點: false,
            我要自停: false,
            我要自煞: "",
            我要後煞: "",
            我要置中: "",
            我要斜坡: "",
            我要環景: "",
            我要定速: "",
            我要進口: "",
            我要產地: [],
            minPrice: 40,
            maxPrice: 300,
            chartSettings: {
                dataType: {
                    '自煞': 'percent',
                    '後煞': 'percent',
                    '置中': 'percent',
                    '斜坡': 'percent',
                    '環景': 'percent',
                    '盲點': 'percent',
                    '自停': 'percent'
                }
            },
        }
    },
    computed: {
        filteredCars() {
            var cars = this.cars;
            console.log(cars.length);
            cars = cars.filter(function(car) {
                return car.移除 !== "移除";
            });
            console.log(cars.length);
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
            if (this.我要環景) {
                if (this.我要環景 == "倒顯") {
                    cars = cars.filter(function(car) {
                        return car.環景 == "倒顯" || car.斜坡 == "環景";
                    });
                } else if (this.我要環景 == "斜坡") {
                    cars = cars.filter(function(car) {
                        return car.環景 == "環景";
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
            console.log(cars);
            return cars;
        },
    },
    mounted() {
        var cars = this.cars;
        var 產地s = this.產地s;
        axios
            .get("https://sheets.googleapis.com/v4/spreadsheets/1mhzx27NSTiFYdhkNqU7j-tXExtz-1EzNC0ayTHFZDQc/values/car?key=AIzaSyDZE5gUohczbofI8O87PkWDUZPh17A0_iE")
            .then(function(response) {
                var values = convertToJSON(response.data.values);
                values.forEach(function(value, key) {
                    var car = value;
                    car.key = "car" + key;
                    if (!產地s.includes(car.進口) && car.進口) 產地s.push(car.進口);
                    cars.push(car);
                });
            });
    }
})

function convertToJSON(array) {
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
        objArray[i - 1] = {};
        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[i - 1][key] = array[i][k]
        }
    }

    return objArray;
}