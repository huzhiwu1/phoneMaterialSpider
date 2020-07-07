const request = require("request-promise");
const { getMaterialListUrl } = require("./urlList");
async function getMaterialList({
	brand_id = 37,
	type_id = 500,
	agent_id = 747,
}) {
	return request({
		method: "POST",
		uri: getMaterialListUrl,
		body: {
			brand_id,
			type_id,
			agent_id,
		},
		"Content-Type": "application/json; charset=utf-8",
		json: true,
	});
}

module.exports = getMaterialList;
