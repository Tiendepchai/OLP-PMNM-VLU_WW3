export default {
	generatePasswordHash: async () => {
		var password_hash = dcodeIO.bcrypt.hashSync(input_pass.text, 10);
		console.log(password_hash);
		return password_hash;
	},

	createToken: async (user) => {
		var token = jsonwebtoken.sign(user, 'secret');
		await storeValue("tokenAdmin", token);
		// await storeValue("id_admin", 11111);
		return token;
	},
	checklogin:  async () => {
		const check = appsmith.store.id_user;
		if(check){
			navigateTo("Trang Chủ");
		}
	},
	comparePassword: async (password, hash) => {
		return dcodeIO.bcrypt.compareSync(password, hash)
	},

	actionLogin: async () => {
		try{
			const [user] = await finUser.run();
			var check = await this.comparePassword(input_pass.text, user.password);
			storeValue("id_user", user.id);

			if(check) {
				// user.token = await this.createToken(user)
				// .then( async () => await UpdateToken.run(user));
				showAlert("Đăng nhập thành công", "success");
				navigateTo('Trang Chủ');
			} else {
				showAlert("Email hoặc mật khẩu không đúng", "error");
			}
		}catch(error){
			showAlert("Email hoặc mật khẩu không đúng", "error");
		}
	},
}