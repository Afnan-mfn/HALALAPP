// 注册区
import request from "../utils/request.js";

//用户手机号码注册
export function RegisterByPhone(data){
	return request({
		url:"/user/register",
		data,
		method:"POST"
	})	
}

//用户人脸注册