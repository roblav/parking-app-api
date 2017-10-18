module.exports = {
	name: 'API',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	base_url: process.env.BASE_URL || 'http://localhost:3000',
	db: {
		//uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/api',
		uri: process.env.MONGODB_URI ||'mongodb://parkingapp1:EEmylnJLzK8KwyJGm1zIuYttNfh9Jq7xgktasXFn7GQE0qutTaIysqssm3kqrzmhlU3sqyyHgYARgJ2RNPvKDg==@parkingapp1.documents.azure.com:10255/?ssl=true&replicaSet=globaldb'
	},
};
