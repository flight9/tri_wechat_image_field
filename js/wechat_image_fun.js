
//wx.ready(function(){
//    alert('config ok.');
//});

jQuery( function() {
    wx.config({
        debug: false,                    	//true开启调试模式。
        appId: Drupal.settings.tri_wechat_image_field.appId, 
        timestamp: Drupal.settings.tri_wechat_image_field.timestamp, 
        nonceStr: Drupal.settings.tri_wechat_image_field.nonceStr, 
        signature: Drupal.settings.tri_wechat_image_field.signature,
        jsApiList: ['chooseImage','uploadImage','scanQRCode'],	//看具体要调用的接口
    });
    
    wx.error(function(res){
        alert('Error:wx.config failed!');
    });
});

function takePhoto(alink) {
    var textfield = jQuery(alink).parent().find('input.textfield-of-serverid');
    var thumbnail = jQuery(alink).parent().find('img.thumbnail-of-serverid');
    //console.log(thumbnail.attr('src'));
    
    if( textfield.val().length != 0) {
        alert('not empty!');
    }
    
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], //'original', 'compressed'
        sourceType: ['camera'],             // 'album', 'camera'
        success: function (res) {
            var localId = res.localIds[0];      // localId可以作为img标签的src属性显示图片
            uploadPhoto( localId);
        }
    });
    
    function uploadPhoto( localId) {
        wx.uploadImage({
            localId: localId, 
            isShowProgressTips: 1, // 显示进度提示
            success: function (res) {
                var serverId = res.serverId; 
                textfield.val(serverId);
                thumbnail.attr('src', localId);
            }
        });
    }
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
		
