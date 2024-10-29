// 数据录入区
import request from "../utils/request.js";

// 获取全部配料表
export function AllIngredientData(data) {
  return request({
    url: '/api/ingredients',
	header: {
	  "Content-Type": "application/json"
	},
	data
  });
}

//配料存储
export async function SaveIngredientsData(ingredients) {
  return request({
    url: '/api/isHalal', 
    method: 'POST',
    header: {
      "Content-Type": "application/json"
    },
    data: {ingredients}, // 将 words 放在请求体中
  });
}

//获取配料解释
export async function IngredientExplanationData(name) {
  return request({
    url: `/api/getHalalStatus?ingredient=${encodeURIComponent(name)}`,
	header: {
	  "Content-Type": "application/json"
	},
  });
}

