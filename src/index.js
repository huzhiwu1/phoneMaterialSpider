const xlsx = require("node-xlsx");
const fs = require("fs");
const getBrandList = require("./getBrandList");
const getModelList = require("./getModelList");
const getMaterialList = require("./getMaterialList");
let materialList = [];
async function init() {
	/**
	 * 1. 获取品牌列表
	 */
	const brandList = await getBrandList();
	/**
	 * 2.遍历品牌列表，拿到品牌id,根据品牌id去获取手机型号
	 */
	let promiseArr = [];
	brandList.forEach(async (item) => {
		promiseArr.push(getModelList(item.id));
	});
	let modelList = [];
	let result = await Promise.all(promiseArr);
	result.forEach((item) => {
		modelList = modelList.concat(item.data);
	});

	/**
	 * 遍历手机型号列表，根据type_id(id),brand_id(brand_id)
	 */

	await getAllMaterial(modelList);
	let materialData = [
		[
			"品牌",
			"型号",
			"材质名",
			"高度",
			"宽度",
			"左边距",
			"上边距",
			"型号图片",
			"圆角",
		],
	];

	for (let props in materialList) {
		let item = materialList[props];

		if (item.brand_name) {
			let data = [
				item.brand_name,
				item.type_name,
				item.stuff_id.name,
				item.height,
				item.width,
				item.left,
				item.top,
				item.material_path,
				item.round,
			];
			materialData.push(data);
		}
	}

	let xlsxObj = [
		{
			name: "手机材质型号图",
			data: materialData,
		},
	];

	fs.writeFileSync("material.xlsx", xlsx.build(xlsxObj), "binary");
}
async function getAllMaterial(list) {
	if (list.length == 0) return;

	const item = list.splice(0, 1)[0];

	const result = await getMaterialList({
		brand_id: item.brand_id,
		type_id: item.id,
	});
	for (let prop in result.data) {
		materialList.push(result.data[prop]);
	}

	await getAllMaterial(list);
}
init();
