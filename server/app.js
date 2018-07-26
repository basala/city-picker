const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const router = require('koa-router')();

const app = new Koa();

const request = require('request')

var city = require('./conf/city');

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    ctx.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With",
        "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
        "X-Powered-By": "3.2.1",
        "Content-Type": "application/json;charset=utf-8"
    });
    await next();
});

app.use(bodyParser());

router.get('/test', async (ctx, next) => {
    ctx.response.body = city.test;
});

router.get('/currentcity', async (ctx, next) => {
    var url = 'https://restapi.amap.com/v3/ip?key=64875f1ad2080f9020d1ae3f78c19681'
    var data = await getData(url);
    console.log(data);
    ctx.body = data;
});

router.get('/', async (ctx, next) => {
    ctx.response.body = city;
});

var getData = function(url) {
    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(response.body);
                // console.log(data)
                var currentcity = {}
                if (data.status == 1) {
                    // console.log(data)
                    console.log('ok')
                    currentcity["province"] = data["province"];
                    currentcity["city"] = data["city"];
                } else {
                    // console.log(data)
                    // console.log(data["status"])
                    // console.log(data["status"] == "1")
                    console.log('fail')
                    currentcity["province"] = "北京";
                    currentcity["city"] = "北京";
                }
                console.log(currentcity);
                resolve(currentcity);
            } else {
                console.log('2')
                reject('error');
            }
        });
    });
}

app.use(router.routes());

app.listen(8000);
console.log('app started at port 8000...');
