/*
* 本算法来自https://github.com/a710128/JapaneseMahjongJS项目，本人不能读懂本代码的有关含义，故而仅作引用及作以些微修改方便引用。
* 使用方式：
* 
*/
import FastBitSet from "fastbitset";
var make_array = function(l) {
	var ret = [];
	if (l.length == 1) {
		for (var i = 0; i < l[0]; ++i) {
			ret.push(new FastBitSet());
		}
	} else {
		for (var i = 0; i < l[0]; ++i) {
			ret.push(make_array(l.slice(1)));
		}
	}
	return ret;
}
var calc_num = function(f, hand, rest, offset, recordDeal) {
	for (var i = 1; i <= 9; ++i) {
		for (var j = 0; j < 10; ++j) {
			for (var k = 0; k < 10; ++k) {
				for (var l = 0; l < 3; ++l) {
					for (var m = 0; m < 3; ++m) {
						for (var n = 0; n < 2; ++n) {
							for (var o = -Math.min(hand[i - 1 + offset], k); o <= Math.min(rest[i - 1 + offset], j); ++o) {
								for (var r = 0; r <= n; ++r) {
									if (hand[i - 1 + offset] + o - l - m - (n - r) * 2 < 0) continue;
									var frj = j;
									var frk = k;
									var frn = hand[i - 1 + offset] + o - (n - r) * 2;
									if (o < 0) {
										frk = k + o;
									} else {
										frj = j - o;
									}
									if (f[i - 1][frj][frk][m][(frn - l - m) % 3][r].has(0)) {
										f[i][j][k][l][m][n].union(f[i - 1][frj][frk][m][(frn - l - m) % 3][r]);
										if ((o < 0 && recordDeal == 0) || (o > 0 && recordDeal == 1)) {
											f[i][j][k][l][m][n].add(i + offset);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return f;
}
var calc_st = function(f, hand, rest, offset, recordDeal) {
	for (var i = 1; i <= 7; ++i) {
		for (var j = 0; j < 10; ++j) {
			for (var k = 0; k < 10; ++k) {
				for (var n = 0; n < 2; ++n) {
					for (var o = -Math.min(k, hand[i - 1 + offset]); o <= Math.min(rest[i - 1 + offset], j); ++o) {
						for (var r = 0; r <= n; ++r) {
							if (hand[i - 1 + offset] + o - (n - r) * 2 < 0) continue;
							var frn = hand[i - 1 + offset] + o - (n - r) * 2;
							if (frn % 3 != 0) continue;

							var frj = j;
							var frk = k;
							if (o < 0) {
								frk = k + o;
							} else {
								frj = j - o;
							}
							if (f[i - 1][frj][frk][r].has(0)) {
								f[i][j][k][n].union(f[i - 1][frj][frk][r]);
								if ((o < 0 && recordDeal == 0) || (o > 0 && recordDeal == 1)) {
									f[i][j][k][n].add(i + offset);
								}
							}
						}
					}
				}
			}
		}
	}
	return f;
}
var calc_xts = function(hand, rest) {
	var needP1 = 1,
		handSum = 0;
	for (var i = 0; i < hand.length; ++i) {
		handSum += hand[i];
	}
	if (handSum == 1 || handSum == 4 || handSum == 7 || handSum == 10 || handSum == 13) needP1 = 1;
	else if (handSum == 2 || handSum == 5 || handSum == 8 || handSum == 11 || handSum == 14) needP1 = 0;
	else {
		throw "手牌输入有误";
	}
	// check hand sum
	
	//  0~9  0~9  0~8 0~2 0~2 0~1
	// f[10] [10] [9] [3] [3] [2]
	var f = make_array([10, 10, 10, 3, 3, 2]);
	f[0][0][0][0][0][0].add(0); // set 0th bit to 1

	f = calc_num(f, hand, rest, 0, needP1); // m
	var g = make_array([10, 10, 10, 3, 3, 2]);
	for (var j = 0; j < 10; ++j) {
		for (var k = 0; k < 10; ++k) {
			for (var n = 0; n < 2; ++n) {
				g[0][j][k][0][0][n] = f[9][j][k][0][0][n];
			}
		}
	}
	g = calc_num(g, hand, rest, 9, needP1); // s
	var h = make_array([10, 10, 10, 3, 3, 2]);
	for (var j = 0; j < 10; ++j) {
		for (var k = 0; k < 10; ++k) {
			for (var n = 0; n < 2; ++n) {
				h[0][j][k][0][0][n] = g[9][j][k][0][0][n];
			}
		}
	}
	h = calc_num(h, hand, rest, 18, needP1); // p
	//   0~7  0~9 0~8 0~1
	// l [8] [10] [9] [2]
	var l = make_array([8, 10, 10, 2]);
	for (var j = 0; j < 10; ++j) {
		for (var k = 0; k < 10; ++k) {
			for (var n = 0; n < 2; ++n) {
				l[0][j][k][n] = h[9][j][k][0][0][n];
			}
		}
	}
	l = calc_st(l, hand, rest, 27, needP1);
	var xts = -1;
	for (var i = 1; i < 10; ++i) {
		if (l[7][i][i - needP1][1].has(0)) {
			xts = i - 1;
			break;
		}
	}
	if (xts == -1) throw "手牌输入有误";
	var ret = {},
		ans;
	if (needP1 == 0) {
		ret = {
			"xiangTingCount": xts,
			"type": "DISCARD",
			"data": []
		};

		for (var i = 0; i < 34; ++i) {
			if (l[7][xts + 1][xts + 1][1].has(i + 1)) {
				ret.data.push(i);
			}
		}
	} else {
		ret = {
			"xiangTingCount": xts,
			"type": "DEAL",
			"data": []
		};
		for (var i = 0; i < 34; ++i) {
			if (l[7][xts + 1][xts][1].has(i + 1)) {
				ret.data.push(i);
			}
		}
	}
	return ret;
}
export default calc_xts;