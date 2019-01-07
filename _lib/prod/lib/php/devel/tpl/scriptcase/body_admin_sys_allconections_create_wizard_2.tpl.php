<?php
$edit = ($this->GetVar('conn_open') === 'S');
$sgdb_list = $this->GetVar('db_dbms_short');
if ($edit) {
} else {
}
?>
<h1 class="page-title">Connection</h1>
<div id="connection-body-wrapper">
    <div id="connection-body">
        <div sc-repeater class="conn-card-wrapper">
            <div class="conn-card">
                <div class="conn-img"><div class="conn-img-container"><img /></div><span class="conn-title">Connection Settings</span><span class="close">&times;</span></div>
                <div class="conn-text"></div>
                <div class="conn-form">
                    <form>
                        <div class="ui top attached tabular menu">
                            <a class="item active" data-tab="first">Connection</a>
                            <a class="concealed item" data-tab="second">Security</a>
                            <a class="concealed item" data-tab="third">Advanced</a>
                        </div>
                        <div class="ui bottom attached tab segment active" data-tab="first">
                            <div class="ui active inline centered loader spaced"></div>
                        </div>
                        <div class="ui bottom attached tab segment" data-tab="second">

                        </div>
                        <div class="ui bottom attached tab segment" data-tab="third">

                        </div>
                        <div class="ui grid equal width">
                            <div class="column">
                                <div class="ui green button">
                                    <i class="icon wizard"></i>
                                    Test Connection
                                </div>
                                <span id="bt_nav_1">
				                    <input type="button" name="concluir" value="Save" class="ui primary button" />
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    function getSGDBList() {
        request({
            method: 'GET',
            op: 'sgdb_list',
            callback: function (data) {
                var template = $('.conn-card-wrapper[sc-repeater]').clone().removeAttr('sc-repeater');
                for (var k in data) {
                    if (data.hasOwnProperty(k)) {
                        var d = data[k];
                        var el = $(template).clone();
                        el.find('.conn-img img').attr('src', '<?php echo $nm_config['url_img']; ?>n_db_' + k + '.png');
                        el.find('.conn-text').html(data[k][k]);
                        el.on('click.openCard', function() { expandSGDB(this); });
                        el.find('.conn-img .close').on('click.closeCard', function(e) { e.stopPropagation(); collapseSGDB(this); });
                        $('#connection-body').append(el);
                        el.find('.menu .item').tab();
                    }
                }
            }
        });
    }

    function expandSGDB(self) {
        if (!$(self).hasClass('open')) {
            var t = $(self)[0].offsetTop;
            var l = $(self)[0].offsetLeft;

            $(self).css({
                'position': 'static'
            });
            $(self).find('.conn-card').attr('style', 'transform:  none; top: ' + t + 'px; left:' + l + 'px; transition: none; width: 100px;');
            $(self).toggleClass('open');
            setTimeout(function () {
                $(self).find('.conn-card').removeAttr('style');
                $(self).css({
                    'position': ''
                });
                $(self).find('.conn-form').stop().slideToggle();
                $(self).find('.conn-text').stop().fadeToggle();
            }, 10);
            $('.conn-card-wrapper').not(self).stop().fadeToggle();
            $('h1').stop().fadeToggle();
            request({
                method: 'GET',
                op: 'sgdb_list',
                callback: function (data) {
                }
            });
        }
    }

    function collapseSGDB(self) {
        self = $(self).closest('.conn-card-wrapper');
        if ($(self).hasClass('open')) {
            $(self).find('.conn-form').stop().slideToggle();
            $(self).find('.conn-text').stop().fadeToggle();
            $(self).removeClass('open');
            $('.conn-card-wrapper').not(self).stop().fadeToggle();
            $('h1').stop().fadeToggle();
        }
    }

    function request(params) {
        params = params || {};
        params.data = params.data || {};
        params.op = params.op || "";
        params.method = params.method || "GET";
        params.callback = params.callback || function () {};
        try {
            $.ajax(window.location.href.split('?')[0] + '?op=' + params.op, {
                method: params.method,
                data: $.param({
                    data: params.data
                })
            }).then(params.callback);
        } catch (e) {
            console.log(e);
        }
    }

    $(document).ready(function(){
        getSGDBList();
    });
</script>