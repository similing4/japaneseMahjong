# 线上

已开放线上工具，URL(Post)：http://maj.lntusoft.com 推荐使用手机查看

微信小程序、QQ小程序搜索《日麻点数计算器》即可搜到对应小程序~ 如果有问题欢迎直接到小程序中反馈~ 我每天都会看哦-v-

# 日本麻将番符计算器

一个轻量级的，用于日麻的番数、符数、点数、向听数计算与何切判断的js库。

## 安装

```
npm i shengxinyumaj
```

## 使用

### 引入

使用import方式引入：

```
import JapaneseMaj from "shengxinyumaj";
```

使用require方式引入：

```
const JapaneseMaj = require("shengxinyumaj").default;
```

### 配置相关

```
{
	changFeng = 1; // Number类型，东风场为1，南风场为2，西风场为3，北风场为4
	ziFeng = 1; // Number类型，自风，东1南2西3北4
	dora = []; //Array[Pai]类型，宝牌数组，注意这里是宝牌数组不是宝牌指示牌数组
	lidora = []; //Array[Pai]类型，里宝牌数组，注意这里是里宝牌数组不是里宝牌指示牌数组
	isLiangLiZhi = false; //是否两立直
	isLiZhi = false; //是否立直
	isYiFa = false; //是否一发
	isLingShang = false; //是否领上
	isZimo = false; //是否自摸 
	isLast = false; //是否是河底/海底
	isQiangGang = false; //是否是抢杠
	isTianHe = false; //是否是天和
	isDiHe = false; //是否是地和
}
```

### 判断和牌并计算番符

```
//计算22334455667788万的役种和番、符数。
var maj = new JapaneseMaj({
	dora: [JapaneseMaj.getPai("Wanzi",1)] //这里设置配置相关的参数
});
var paixing = JapaneseMaj.getPaixingFromString("22334455667788m"); //将字符串转换成牌型对象
var res = maj.getYakuCalculator(paixing); //获取役计算器
if(res) //如果没和牌会返回false
	console.log(res.calcYaku(maj.state)); //拿到役、番、符计算结果
```

### 计算向听数并得出何切

```
//计算1112222456778万的何切。
var maj = new JapaneseMaj({
	dora: [JapaneseMaj.getPai("Wanzi",1)] //这里设置配置相关的参数
});
var paixing = JapaneseMaj.getPaixingFromString("22334455667788m"); //将字符串转换成牌型对象
console.log(maj.calcXiangting(paixing)); //如果是待牌状态会返回待牌列表，如果是听牌状态会返回听牌列表。如果是待打牌状态会返回可切牌列表。
```

## LICENSE

本库默认采用GPL2.0协议，如有特殊需要请在微信或QQ小程序中通过反馈联系我哦~
