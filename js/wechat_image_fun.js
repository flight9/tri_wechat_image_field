
//wx.ready(function(){
//    alert('config ok.');
//});

//wx.error(function(res){
//    alert('failed');
//});

jQuery( function() {
    wx.config({
        debug: true,                    	//true开启调试模式。
        appId: Drupal.settings.tri_wechat_image_field.appId, 
        timestamp: Drupal.settings.tri_wechat_image_field.timestamp, 
        nonceStr: Drupal.settings.tri_wechat_image_field.nonceStr, 
        signature: Drupal.settings.tri_wechat_image_field.signature,
        jsApiList: ['chooseImage','uploadImage','scanQRCode'],	//看具体要调用的接口
    });    
});

function takePhoto() {
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], //'original', 'compressed'
        sourceType: ['camera'], 			// 'album', 'camera'
        success: function (res) {
            var localIds = res.localIds; // localId可以作为img标签的src属性显示图片
            uploadPhoto(localIds[0]);
        }
    });
}

function uploadPhoto( localId) {
    wx.uploadImage({
        localId: localId, 
        isShowProgressTips: 1, // 显示进度提示
        success: function (res) {
            var serverId = res.serverId; 
            jQuery('input.textfield-of-serverid').val(serverId);
        }
    });
}

function scanUrl() {
    wx.scanQRCode({
        needResult: 1, // 1则直接返回扫描结果，
        scanType: ["qrCode"], 
        success: function (res) {
            var result = res.resultStr;
            alert(result);
        },
    });
}
		
