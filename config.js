module.exports = {
	name: 'API',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3001,
	base_url: process.env.BASE_URL || 'http://localhost:3001',
	db: {
		uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/api',
		//uri: process.env.MONGODB_URI ||'mongodb://parkingapp:dxrxDer4WUle0s3zeqsobAp4AxdYuWYVXxNF4tyeGj8gY38uxW05atIv31vpvXZBLzGZUZphITsa2JdCeetwPw==@parkingapp.documents.azure.com:10255/?ssl=true&replicaSet=globaldb'
	},
};
