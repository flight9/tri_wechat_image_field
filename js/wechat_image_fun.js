

jQuery( function() {
    //wx.ready(function(){
    //    alert('config ok.');
    //});
    
    wx.error(function(res){
        alert('Error:wx.config failed!');
    });    
    
    wx.config({
        debug: false,                    	//true开启调试模式。
        appId: Drupal.settings.tri_wechat_image_field.appId, 
        timestamp: Drupal.settings.tri_wechat_image_field.timestamp, 
        nonceStr: Drupal.settings.tri_wechat_image_field.nonceStr, 
        signature: Drupal.settings.tri_wechat_image_field.signature,
        jsApiList: ['chooseImage','uploadImage','scanQRCode'],	//看具体要调用的接口
    });

    in_wechat = isWeixinBrowser();
    hideOppositeControls(in_wechat);
});

function hideOppositeControls( in_wechat) {
    if( in_wechat) {
        //alert(Drupal.settings.tri_wechat_image_field.targetFields);
        var targetFields = Drupal.settings.tri_wechat_image_field.targetFields.split(',');
        for(i=0; i<targetFields.length; i++) {
            var id_target_field = '#edit-'+ targetFields[i].replace(/_/g, "-");
            //alert(id_target_field);
            var photo_field = jQuery( id_target_field);
            photo_field.find('div.image-widget-data').hide();
            photo_field.find('div.description').hide();
        }
    } else {
        var input_serverid = jQuery('input.textfield-of-serverid');
        var div_wechat_photo = input_serverid.parents('div.field-type-tri-wechat-image-field-photo');
        div_wechat_photo.hide();
    }
}

function takePhoto(alink) {
    var textfield = jQuery(alink).parent().find('input.textfield-of-serverid');
    var thumbnail = jQuery(alink).parent().find('img.thumbnail-of-serverid');
    //console.log(thumbnail.attr('src'));
    
    if( textfield.val().length != 0) {
        if(confirm("替换当前照片(Replace the photo)？") == false ) {
            return;
        }
    }
    
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'],           //'original', 'compressed'
        sourceType: ['camera'],             // 'album', 'camera'
        success: function (res) {
            var localId = res.localIds[0];  // localId可以作为img标签的src属性显示图片
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

function isWeixinBrowser(){
    return /micromessenger/.test(navigator.userAgent.toLowerCase())
}
