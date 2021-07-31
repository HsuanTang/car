Vue.component('radar-chart', {
    extends: VueChartJs.Radar,
    props: ['自煞', '後煞', '置中', '斜坡', '環景', '盲點', '自停'],
    mounted() {
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
            置中data = 0.6;
        } else if (this.置中 == "偏警") {
            置中data = 0.3;
        }

        if (this.斜坡 == "斜坡") {
            斜坡data = 1;
        } else if (this.斜坡 == "上坡") {
            斜坡data = 0.5;
        }

        if (this.環景 == "環景") {
            環景data = 1;
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
        })
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
                response.data.feed.entry.forEach(function(value, key) {
                    var car = {
                        key: "car" + key,
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
                        "動力系統": value.gsx$動力系統.$t
                    };

                    if (!產地s.includes(car.進口) && car.進口) 產地s.push(car.進口);
                    cars.push(car);
                });
            });
    }
})