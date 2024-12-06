export default {
	createNhanCuuTro:async ()=>{
		const uuid = UUID.genV4();
		if(txt_noiDung.text.length>0 && txt_diaChi.text.length){
			await insertTroCap.run({id:uuid.hexNoDelim});
			// await getNhanLucByNguonLuc.run();
			showAlert("Yêu cầu của bạn đã đã gửi thành công và đang chờ xử lý!", "success");
			// closeModal(Modal1.name);
		}
		else{
			showAlert("Vui lòng nhập đầy đủ thông tin!!", "error");
		}
	}
};


