// Id地址更改（1/3）
const BASE_URL = 'http://192.168.100.71:5000';

// 全局请求封装
export default function request(config={}){
	let {
		url,
		data={},
		method="GET",
		header={}
	} = config
	
	url = BASE_URL+url
	
	console.log(url)
	return new Promise((resolve,reject)=>{		
		uni.request({
			url,
			data,
			method,
			header,
			success:res=>{
				// 根据状态码来输出不同的信息
				if(res.data.code === 200){
 					console.log(res.data)
					resolve(res.data)
				}else if(res.data.code === 400){
					uni.showModal({
						title:"错误提示",
						content:res.data.message,
						showCancel:false
					})
					reject(res.data)
				}
				
				//将登录后的cookie值缓存在本地
				if(res.data.message === '登录成功'){
					uni.setStorageSync('cookie', res.header['Set-Cookie']);
					console.log('Cookie保存成功');
				}
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}