const request = require("request-promise");
const { getModelListUrl } = require("./urlList");
async function getModelList(id = 37) {
	return request({
		method: "POST",
		uri: getModelListUrl,
		body: {
			brand_id: id,
		},
		"Content-Type": "application/x-www-form-urlencoded",
		json: true,
	});
}

module.exports = getModelList;
