const request = require("request-promise");
const { getBrandListUrl } = require("./urlList");

async function getBrandList() {
	const { brand } = await request({
		method: "GET",
		uri: getBrandListUrl,
		"Content-Encoding": "gzip",
		"Content-Type": " text/html; charset=utf-8",
		json: true,
	});

	return brand;
}

module.exports = getBrandList;
