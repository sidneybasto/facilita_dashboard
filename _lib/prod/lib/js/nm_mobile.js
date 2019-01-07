function closeAllModalPanes() {
    $('.modal-pane-container').each(function (ix,el){
        $(el).toggleModalPane(false, true);
    })
}

function isMobile() {
    //console.log('isMobile');
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

function bootstrapMobile() {
    var app = getAppData();

    //console.log('bootstrapMobile');

    if (isMobile() && app.improvements) {
        var rSearch = $('#id_resumo_search');
        var rSearchTr = rSearch.parent('tr');
        var rRefinedSearch = $('.scGridRefinedSearchPadding');
        var rOrder = $('#sc_id_order_campos_placeholder_top');
        var rSaveSearch = $('#Salvar_filters_top').parent().parent();
        var rColumns = $('#sc_id_sel_campos_placeholder_top');
        var rGridDet = $('#sc_grid_det');

        var appendTo = 'body';
        var bodyClass = 'scGridPage';
        var headerClass = 'scGridHeader';
        var toolbarClass = 'scGridToolbar';
        var toolbarPaddingClass = 'scGridToolbarPadding';

        var toggleHandler = function (e) {
            $('#__mp_' + e.data.baseID).toggleModalPane(true);
            e.data.options.onOpen($('#' + e.data.baseID + '.modal-pane-content'), e.data.openButton, e.data.closeButton);
            toggleToolbar();
        };

        switch (app.appType) {
            case 'grid':
            case 'detail':
            case 'summary':
                appendTo = 'body';
                bodyClass = 'scGridPage';
                headerClass = 'scGridHeader';
                toolbarClass = 'scGridToolbar';
                toolbarPaddingClass = 'scGridToolbarPadding';
                break;
            case 'search':
                appendTo = 'form[name="F1"]';
                bodyClass = 'scFilterPage';
                headerClass = 'scFilterHeader';
                toolbarClass = 'scFilterToolbar';
                toolbarPaddingClass = 'scFilterToolbarPadding';
                break;
        }

        rOrder.openInModalPane({
            openingButton: '#ordcmp_top',
            paneTitleText: 'Sorting',
            onReady: function (paneContent, openButton, closeButton) {
                var btnID = 'applyBtnOrdFields';
                if (!$('#' + btnID)[0]) {
                    var applyBtn = paneContent.find('#f_sel_sub');
                    // paneContent.find('#f_sel_sub').attr('style', 'display: none !important');
                    paneContent.find('#Bsair').attr('style', 'display: none !important');
                    // paneContent.find('.scAppDivToolbar').append('<a id="' + btnID + '" class="' + applyBtn.attr('class') + '" title="' + applyBtn.attr('title') + '" style="display:inline-block;">' + applyBtn.html() + '</a>');
                    // $('#' + btnID).on('mousedown.replaceClick', function () {
                    //     scSubmitOrderCampos('top', 'cmp').then(function () {
                    //         closeButton.click();
                    //     })
                    //     paneContent.find('table').attr('style', 'table-layout: fixed');
                    //     paneContent.find('table td').attr('style', 'height: 1px');
                    //     paneContent.find('table td ul').attr('style', 'height: 100%');
                    //     paneContent.find('select').on('touchstart.preventLeak', function(e){ e.stopPropagation(); return true; });
                    //     paneContent.find('select').on('touchend.preventLeak', function(e){ e.stopPropagation(); return true; });
                    // });
                    paneContent.find('.scAppDivContent table table').attr('style', 'table-layout: fixed');
                    paneContent.find('.scAppDivContent table table tr').attr('style', 'display: flex; position: relative;');
                    paneContent.find('.scAppDivContent table table td').attr('style', 'height: auto; display: flex; flex-direction: column; width: 50%; flex-grow: 1;');
                    paneContent.find('.scAppDivContent table table td ul').attr('style', 'height: 100%; flex-grow: 1; min-height: 162px;');
                    paneContent.find('.scAppDivContent table select').on('touchstart.preventLeak', function(e){ e.stopPropagation(); return true; });
                    paneContent.find('.scAppDivContent table select').on('touchend.preventLeak', function(e){ e.stopPropagation(); return true; });
                }
            },
            beforeReady: function (paneContent, openButton, closeButton) {
                openButton.click();
            },
            appendTo: appendTo,
            bodyClass: bodyClass,
            headerClass: headerClass,
            toolbarClass: toolbarClass,
            toolbarPaddingClass: toolbarPaddingClass,
            toggleHandler: toggleHandler
        });
        rColumns.openInModalPane({
            openingButton: '#selcmp_top',
            paneTitleText: 'Columns',
            onReady: function (paneContent, openButton, closeButton) {
                var btnID = 'applyBtnSelFields';
                if (!$('#' + btnID)[0]) {
                    var applyBtn = paneContent.find('#f_sel_sub');
                    // paneContent.find('#f_sel_sub').attr('style', 'display: none !important');
                    paneContent.find('#Bsair').attr('style', 'display: none !important');
                    // paneContent.find('.scAppDivToolbar').append('<a id="' + btnID + '" class="' + applyBtn.attr('class') + '" title="' + applyBtn.attr('title') + '" style="display:inline-block;">' + applyBtn.html() + '</a>');
                    $('#' + btnID).on('mousedown.replaceClick', function () {
                        scSubmitSelCampos('top').then(function () {
                            closeButton.click();
                        })
                    })
                }
            },
            beforeReady: function (paneContent, openButton, closeButton) {
                openButton.click();
            },
            appendTo: appendTo,
            bodyClass: bodyClass,
            headerClass: headerClass,
            toolbarClass: toolbarClass,
            toolbarPaddingClass: toolbarPaddingClass,
            toggleHandler: toggleHandler
        });
        rSaveSearch.openInModalPane({
            openingButton: '#Ativa_save_top',
            paneTitleText: 'Save Search',
            onReady: function (paneContent, openButton, closeButton) {
                paneContent.find('#Salvar_filters_top').css({
                    'display': 'block'
                });
                paneContent.find('#Cancel_frm_top').remove();
                $(document).off('updatefilter');
                $(document).on('updatefilter', function() {
                    paneContent.find('#Salvar_filters_top').css({
                        'display': 'block'
                    });
                    paneContent.find('#Cancel_frm_top').remove();
                    closeButton.click();
                });
                // if (!$('#' + btnID)[0]) {
                //     var applyBtn = paneContent.find('#f_sel_sub');
                //     // paneContent.find('#f_sel_sub').attr('style', 'display: none !important');
                //     paneContent.find('#Bsair').attr('style', 'display: none !important');
                //     // paneContent.find('.scAppDivToolbar').append('<a id="' + btnID + '" class="' + applyBtn.attr('class') + '" title="' + applyBtn.attr('title') + '" style="display:inline-block;">' + applyBtn.html() + '</a>');
                //     $('#' + btnID).on('mousedown.replaceClick', function () {
                //         scSubmitSelCampos('top').then(function () {
                //             closeButton.click();
                //         })
                //     })
                // }
            },
            appendTo: appendTo,
            bodyClass: bodyClass,
            headerClass: headerClass,
            toolbarClass: toolbarClass,
            toolbarPaddingClass: toolbarPaddingClass,
            toggleHandler: toggleHandler
        });
        rRefinedSearch.openInModalPane({
            openingButton: true,
            paneTitleText: 'Refined Search',
            onReady: function (paneContent, openButton, closeButton) {
                var optClass = 'scGridRefinedSearchCampo';
            },
            appendTo: appendTo,
            bodyClass: bodyClass,
            headerClass: headerClass,
            toolbarClass: toolbarClass,
            toolbarPaddingClass: toolbarPaddingClass,
            toggleHandler: toggleHandler
        });
        rSearch.openInModalPane({
            openingButton: true,
            paneTitleText: 'Summary Search',
            appendTo: appendTo,
            bodyClass: bodyClass,
            headerClass: headerClass,
            toolbarClass: toolbarClass,
            toolbarPaddingClass: toolbarPaddingClass,
            toggleHandler: toggleHandler
        });
        rSearchTr.remove();
        rGridDet.openInModalPane({
            openingButton: true,
            paneTitleText: 'Details',
            appendTo: appendTo,
            bodyClass: bodyClass,
            headerClass: headerClass,
            toolbarClass: toolbarClass,
            toolbarPaddingClass: toolbarPaddingClass,
            toggleHandler: toggleHandler
        });
        if (!$('.scAjaxDiv')[0]) {
            appendNavBar();
        }
        if (app.displayScrollUp) appendScrollButton();
        appendScrollBodyEvents();
        specificStyle();
        toolbarPlacement();
        closeAllModalPanes();
        history.pushState(null, null, ' ');
        moveWithTouch($('.SC_SubMenuButton'));
        // history.go(0);
    } else {
        $('body').addClass('ready');
    }
}

function appendNavBar() {
    //console.log('appendNavBar');
    var btn = '' +
        '<div id="mobile-navbar" class="scGridHeader scGridHeaderFont">' +
            '<input id="mnv-first" />' +
            '<input id="mnv-previous" />' +
            '<input id="mnv-next" />' +
            '<input id="mnv-last" />' +
        '</div>';


    $('#sc_grid_toobar_bot').css({
        padding: '0px',
        display: 'flex',
        'flex-direction': 'row',
        'justify-content': 'center',
        'justify-items': 'center',
        'align-items': 'center',
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%'
    });
    $('#sc_grid_toobar_bot > table').css({
        padding: '0px',
        display: 'flex',
        'flex-direction': 'row',
        'justify-content': 'center',
        'justify-items': 'center',
        'align-items': 'center',
        position: 'relative',
        width: '100%',
        height: '55px'
    });
    $('#sc_grid_toobar_bot > table').find('tr, td, table, tbody').css({
        padding: '0px',
        display: 'block',
        width: '100%',
    });
    $('#sc_grid_toobar_bot').find('.scGridToolbarPadding:first-child, .scGridToolbarPadding:nth-child(3)').remove();
    $('#sc_grid_toobar_bot > table').find('.scGridToolbarPadding').css({
        padding: '0px',
        display: 'flex',
        'flex-direction': 'row',
        'justify-content': 'center',
        'justify-items': 'center',
        'align-items': 'center',
        width: '100%'
    });
}

function appendScrollBodyEvents() {
    $('#sc_grid_body').off('scroll.syncFixedLabels');
    $('#summary_body > td').off('scroll.syncFixedLabels');
    $('#sc_grid_body').on('scroll.syncFixedLabels', scrollBody);
    $('#summary_body > td').on('scroll.syncFixedLabels', scrollBody);
}

function appendScrollButton() {
    //console.log('appendScrollButton');
    var app = getAppData();
    var classPos = (app.scrollUpPosition == 'L') ? 'left' : 'right';
    var classHeight = ($('#sc_grid_toobar_bot')[0]) ? 'high' : 'low';
    switch (app.appType) {
        case 'grid':
            headerClass = 'scGridHeader';
            headerFontClass = 'scGridHeaderFont';
            break;
        case 'search':
            headerClass = 'scFilterHeader';
            headerFontClass = 'scFilterHeaderFont';
            break;
        case 'detail':
        case 'summary':
            headerClass = 'scGridHeader';
            headerFontClass = 'scGridHeaderFont';
            break;
    }
    var btn = '<div id="scrolltop-button" class="' + headerClass + ' ' + headerFontClass + ' ' + classPos + ' ' + classHeight + '"></div>';

    if (!$("#scrolltop-button")[0]) {
        $('body').append(btn);
        $(window).on('scroll.scrlTopBtn', checkScroll);
        $('#scrolltop-button').each(function () {
            $(this).click(function () {
                $('html,body').animate({scrollTop: 0}, 'fast');
                return false;
            });
        });
    } else {
        $("#scrolltop-button").removeClass('active');
    }
}

function checkScroll() {
    //console.log('checkScroll');
    var a = 40;
    var pos = $(window).scrollTop();
    // var app = getAppType();
    // switch (app) {
    //     case 'grid':
    //         a = (parseInt($('#sc_grid_toobar_top').parent().outerHeight()) || 0) + (parseInt($('#sc_grid_head').outerHeight()) || 0);
    //         break;
    //     case 'summary':
    //         a = (parseInt($('.scGridTabelaTd .scGridHeader').outerHeight()) || 0) + (parseInt($('#obj_barra_top').outerHeight()) || 0);
    //         break;
    //     default:
    //         a = 50;
    //         break;
    // }
    if(pos > a) {
        if (!$("#scrolltop-button").hasClass('active')) {
            toggleScrollButton('show');
        }
    } else {
        if ($("#scrolltop-button").hasClass('active')) {
            toggleScrollButton('hide');
        }
    }
}

function toggleScrollButton(state) {
    //console.log('toggleScrollButton');
    if(state === 'show') {
        $("#scrolltop-button").addClass('active');
        // $("#scrolltop-button").css({
        //     right: '20px'
        // });
    } else {
        $("#scrolltop-button").removeClass('active');
        // $("#scrolltop-button").css({
        //     right: ''
        // });
    }
}

function scBtnGrpShowMobile(sGroup) {
    var dT = $('#sc_btgp_div_' + sGroup).prev()[0].getBoundingClientRect().top +  $('#sc_btgp_div_' + sGroup).prev()[0].getBoundingClientRect().height - 5;
    $('#sc_btgp_div_' + sGroup).stop().css('top', dT + 'px').stop().show('fade');
    var submenuOverlay = '<div class="submenuOverlay"></div>';

    $('#sc_btgp_div_' + sGroup).parent().append(submenuOverlay);
    $('body').css('overflow', 'hidden');
    $('#sc_btgp_div_' + sGroup + ' .thickbox').off('click.closeSubMenu');
    $('#sc_btgp_div_' + sGroup + ' .thickbox').on('click.closeSubMenu', function () {
        scBtnGrpHideMobile(sGroup);
        $('.submenuOverlay').off('click.closeSubMenu');
    });
    $('.submenuOverlay').on('click.closeSubMenu', function () {
        scBtnGrpHideMobile(sGroup);
        $('.submenuOverlay').off('click.closeSubMenu');
    });
}

function scBtnGrpHideMobile(sGroup) {
    if (sGroup === undefined) {
        $('.SC_SubMenuButton').stop().hide('fade', function () {
            $('.SC_SubMenuButton').css('margin-top', '0px');
            $('.submenuOverlay').remove();
        });
    } else {
        $('#sc_btgp_div_' + sGroup).stop().hide('fade', function () {
            $('#sc_btgp_div_' + sGroup).css('margin-top', '0px');
            $('.submenuOverlay').remove();
            if (!$('.overlayToolbar')[0]) {
                $('body').css('overflow', '');
            }
        });
    }
}

function scIsHeaderVisibleMobile(gridHeaders) {
    return false;
    // return gridHeaders.offset().top > $(document).scrollTop();
}

function scrollBody() {
    //console.log('scrollBody');
    var appData = getAppData();
    var app = appData.appType;
    switch (app) {
        case 'grid':
            var lft = $('#sc_grid_body').scrollLeft();
            $('#sc-id-fixedheaders-placeholder').css('left',  '-'+ lft +'px');
            if ($('.scGridBlock')[0]) {
                var padL = parseInt($($('.scGridBlock')[0]).css('padding-left')) || 0;
                var padT = parseInt($($('.scGridBlock')[0]).css('padding-top')) || 0;
                var h = parseInt($($('.scGridBlock')[0]).css('height')) || 0;
                if (lft > padL) {
                    $('.scGridBlock').css({
                        'height': h + 'px'
                    });
                    $('.scGridBlock > table').css({
                        'left': '0px',
                        'transform': 'translateY(-50%)',
                        'display': 'block',
                        'width': '100%',
                        'overflow': 'hidden',
                        'text-overflow': 'ellipsis',
                        'position': 'absolute'
                    });
                } else {
                    $('.scGridBlock').css({
                        'height': ''
                    });
                    $('.scGridBlock > table').css({
                        'left': '',
                        'top': '',
                        'transform': '',
                        'display': '',
                        'width': '',
                        'overflow': '',
                        'position': 'static'
                    });
                }
            }
            break;
        case 'summary':
            var lft = $('#summary_body > td').scrollLeft();
            $('#sc-id-summary-fixedheaders-placeholder').css('left',  '-'+ lft +'px');
            break;
    }
}

function toolbarPlacement() {
    //console.log('toolbarPlacement');
    var appData = getAppData();
    if (appData.displayOptionsButton) {
        var app = appData.appType;

        switch (app) {
            case 'grid':
                header = $('#sc_grid_head');
                headerClass = 'scGridHeader';
                headerFontClass = 'scGridHeaderFont';
                break;
            case 'search':
                header = $('.scFilterTableTd > .scFilterHeader:not(.modal-pane-container)').parent().parent();
                headerClass = 'scFilterHeader';
                headerFontClass = 'scFilterHeaderFont';
                break;
            case 'detail':
            case 'summary':
                header = $('.scGridTabelaTd > .scGridHeader').parent().parent();
                headerClass = 'scGridHeader';
                headerFontClass = 'scGridHeaderFont';
                break;
        }

        var optionsButton = '<td style="display: flex; padding: 0; border: 0;"><div class="headerOptions ' + headerClass + '"><div class="optsDots ' + headerFontClass + '"></div></div></td>';

        $('.overlayToolbar').remove();
        $('body').css('overflow', '');
        if (!$('.headerOptions')[0]) {
            header.find('td.scFilterTableTd').css({
                'display': 'flex',
                'width': 'calc(100% - 3.5em)',
                'overflow': 'hidden'
            });
            header.append(optionsButton);
            optionsButton = header.find('.headerOptions');
            optionsButton.on('click.showToolbar', toggleToolbar);
        }

    }
}

function toggleToolbar(e, forceClose) {
    //console.log('toggleToolbar');
    scBtnGrpHideMobile();
    var appData = getAppData();
    if (!appData.displayOptionsButton) return false;
    var overlay = $('.overlayToolbar')[0] ? $('.overlayToolbar') : $('<div class="overlayToolbar"></div>');
    var app = appData.appType;
    var toolBarTop;
    var scToolbar;
    var scHeadOptions;
    var stState = (forceClose === undefined) ? false : forceClose;
    var body = $('body');

    switch (app) {
        case 'grid':
            toolBarTop = $('#sc_grid_toobar_top').parent();
            scToolbar = $('.scGridToolbar');
            scHeadOptions = $('#sc_grid_head').find('.headerOptions');
            break;
        case 'search':
            toolBarTop = $('.scFilterToolbar').parent();
            scToolbar = $('.scFilterToolbar');
            scHeadOptions = $('.scFilterHeader').find('.headerOptions');
            break;
        case 'detail':
        case 'summary':
            toolBarTop = $('.scGridToolbar').parent();
            scToolbar = $('.scGridToolbar');
            scHeadOptions = $('.scGridTabelaTd > .scGridHeader').find('.headerOptions');
            break;
    }

    if (stState) {
        toolBarTop.stop().slideUp();
        overlay.stop().fadeOut(100, function () {
            body.css('overflow', '');
            overlay.remove();
            scToolbar[0].scrollTo(0, 0);
        });
    } else {
        if (!$('.overlayToolbar')[0]) {
            toolBarTop.stop().slideDown();
            body.append(overlay);
            body.css('overflow', 'hidden');
            overlay.stop().fadeIn();
            overlay.on('click.showToolbar', toggleToolbar);
            $('#slide_signal').stop().fadeIn(100);
            var t = setTimeout(function () {
                $('#slide_signal').stop().fadeOut(500);
            }, 4000);
            scToolbar.on('scroll.removeTimeout', function () {
                clearTimeout(t);
                $('#slide_signal').stop().fadeOut(500);
                scHeadOptions.off('click.removeTimeout');
                $(this).off('scroll.removeTimeout');
            });
            scHeadOptions.on('click.removeTimeout', function () {
                clearTimeout(t);
                $('#slide_signal').stop().fadeOut(500);
                scToolbar.off('scroll.removeTimeout');
                $(this).off('click.removeTimeout');
            });
            overlay.on('click.removeTimeout', function () {
                clearTimeout(t);
                $('#slide_signal').stop().fadeOut(500);
                scToolbar.off('scroll.removeTimeout');
                scHeadOptions.off('click.removeTimeout');
                $(this).off('click.removeTimeout');
            });
        } else {
            toolBarTop.stop().slideUp();
            overlay.stop().fadeOut(100, function () {
                body.css('overflow', '');
                overlay.remove();
                scToolbar[0].scrollTo(0, 0);
            });
        }
    }
}
function specificStyle() {
    //console.log('specificStyle');

    var appData = getAppData();
    var app = appData.appType;

    switch (app) {
        case 'grid':
            var hH = $('#sc_grid_head');

            $('#sc_grid_body > table').parents('table, tbody, tr, td').attr('style', 'display:block !important; width: 100% !important;');
            $('#sc_grid_head > td.scGridTabelaTd').not('.headerOptions').attr('style', 'display:block !important; width: 100% !important;');
            $('#sc_grid_head').attr('style', 'position: fixed; top: 0; z-index: 10; display: flex !important; flex-direction: row; width: 100% !important;');
            $('#sc_grid_toobar_top').attr('style', 'display:block !important; width: 100% !important; position: relative;');
            $('#sc-id-fixedheaders-placeholder, #sc-id-fixedheaders-placeholder *').css('opacity',  'inherit');
            $('.scGridTabelaTd').css({
                'padding': '0'
            });
            $('.scGridToolbarPadding').parent().css({
                'padding': 0
            });
            $('.scGridTabelaTd').css({
                'padding': '0'
            });
            $('#sc_grid_sumario, #sc_grid_sumario > td').css({
                'display': 'block'
            });
            if (appData.toolbarOrientation == 'H') {
                $('#sc_grid_toobar_top').append('<div id="slide_signal"><div class="bnc_arrow">&#x2039;</div></div>');

                $('#sc_grid_toobar_top').find('input[type="text"]').not('#quicksearchph_top input[type="text"]').css({
                    'padding': '5px',
                    'width': '35px'
                });
            } else {
                $('#sc_grid_toobar_top').css({
                    'display': 'flex',
                    'flex-direction': 'column',
                    'justify-content': 'center',
                    'justify-items': 'center',
                    'align-items': 'center',
                    'align-content': 'center',
                    'width': '100%',
                    'max-height': '200px',
                    'overflow-x': 'hidden',
                    'overflow-y': 'auto'
                });
                $('#sc_grid_toobar_top').find('.scGridToolbarPadding, tr, td, tbody').not('.SC_SubMenuButton *').attr('width', '');
                $('#sc_grid_toobar_top').find('.scGridToolbarPadding, tr, td, tbody').not('.SC_SubMenuButton *').css({
                    'display': 'flex',
                    'flex-direction': 'column',
                    'justify-content': 'center',
                    'justify-items': 'center',
                    'align-items': 'center',
                    'align-content': 'center',
                    'width': '100%'
                });
                $('#sc_grid_toobar_top').find('a, button, input, select, span').not('.SC_SubMenuButton *').css({
                    'justify-content': 'center',
                    'justify-items': 'center',
                    'align-items': 'center',
                    'align-content': 'center',
                    'text-align': 'center',
                    'margin': '2px 0',
                    'width': '100%'
                });
            }
            if (appData.displayOptionsButton) {
                $('#sc_grid_toobar_top').parent().css({
                    'position': 'fixed',
                    'z-index': '10',
                    'top': (parseInt(hH.outerHeight()) || 0) + 'px',
                    'display' : 'none',
                    'width': '100%'
                });
                $('body').css({
                    'padding-top': (parseInt(hH.outerHeight()) || 0) + 'px',
                });
                $('#sc-id-fixedheaders-placeholder').css({
                    'margin-top': ((parseInt(hH.outerHeight()) || 0) - 1) + '.5px',
                    'z-index': '7'
                });
            } else {
                $('#sc_grid_toobar_top').parent().css({
                    'position': 'fixed',
                    'z-index': '10',
                    'top': (parseInt(hH.outerHeight()) || 0) + 'px',
                    'width': '100%'
                });
                var hT = $('#sc_grid_toobar_top').parent();
                $('body').css({
                    'padding-top': ((parseInt(hH.outerHeight()) || 0) + (parseInt(hT.outerHeight()) || 0)) + 'px',
                });
                $('#sc-id-fixedheaders-placeholder').css({
                    'margin-top': (((parseInt(hH.outerHeight()) || 0) + (parseInt(hT.outerHeight()) || 0)) - 1) + '.5px',
                    'z-index': '7'
                });
                var t = setTimeout(function() { $('#slide_signal').stop().fadeOut(500); }, 4000);
            }
            if ($('#sc_grid_toobar_bot')[0]) {
                $('body').css({
                    'padding-bottom': '55px'
                });
            } else {
                $('body').css({
                    'padding-bottom': ''
                });
            }
            break;
        case 'search':
            var hH = $('.scFilterHeader');
            $('form[name="F1"]').css({
                'overflow-x': 'hidden',
                'width': '100%',
                'border': 'none',
                'padding': '0'
            });
            $('.scFilterBorder').css({
                'border': 'none',
                'padding': '0'
            });
            $('.scFilterBorder').parent().css({
                'border': 'none',
                'padding': '0'
            });
            $('.scFilterHeader:not(#scrolltop-button)').parent().parent().css({
                'margin': '0',
                'border': 'none',
                'width': '100%',
                'position': 'fixed',
                'z-index': '10',
                'top' : '0',
                'left' : '0',
                'display' : 'flex'
            });
            $('.scFilterToolbar').parents('td, tr, tbody, table').not('.scFilterBorder > table').not('.scFilterBorder > table > tbody').css({
                'display': 'block',
                'width': '100%'
            })
            $('.scFilterToolbar').parent().css({
                'overflow-x': 'scroll',
                'overflow-y': 'visible'
            })
            $('.scFilterToolbar').css({
                'border': '0',
                'margin': '0',
                'padding': '0'
            });
            $('.scFilterLabelOdd').closest('.scFilterTable').closest('.scFilterTableTd').css({
                'padding': '20px 0'
            });
            $('.scFilterLabelOdd').closest('.scFilterTable').closest('.scFilterTableTd').find('table, tbody, tr, td').css({
                'display': 'flex',
                'flex-direction': 'column',
                'width': '100%',
                'overflow-x': 'visible',
                'margin': '0',
                'padding': '0',
                'border': '0'
            });
            $('.scFilterLabelOdd').closest('.scFilterTable').closest('.scFilterTableTd').find('.scFilterLabelOdd, .scFilterLabelEven').parent().css({

                'margin-left': 'auto',
                'margin-right': 'auto',
                'width': '90%'
            });
            if (appData.toolbarOrientation == 'H') {
                $('.scFilterToolbar').append('<div id="slide_signal"><div class="bnc_arrow">&#x2039;</div></div>');
            } else {
                'obj_barra_top';
                $('.scFilterToolbarPadding').closest('table').not('.SC_SubMenuButton *').css({
                    'display': 'block',
                    'justify-content': 'center',
                    'justify-items': 'center',
                    'align-items': 'center',
                    'align-content': 'center',
                    'width': '100%',
                    'max-height': '200px',
                    'overflow-x': 'hidden',
                    'overflow-y': 'auto'
                });
                $('.scFilterToolbarPadding').parents('table, tbody, tr, td').not('.SC_SubMenuButton *').attr('width', '');
                $('.scFilterToolbarPadding').closest('tbody').not('.SC_SubMenuButton *').css({
                    'display': 'block',
                    'justify-content': 'center',
                    'justify-items': 'center',
                    'align-items': 'center',
                    'align-content': 'center',
                    'width': '100%'
                });
                $('.scFilterToolbarPadding').closest('tr').not('.SC_SubMenuButton *').css({
                    'display': 'block',
                    'justify-content': 'center',
                    'justify-items': 'center',
                    'align-items': 'center',
                    'align-content': 'center',
                    'width': '100%'
                });
                $('.scFilterToolbarPadding').closest('td').not('.SC_SubMenuButton *').css({
                    'display': 'flex',
                    'flex-direction': 'column',
                    'justify-content': 'center',
                    'justify-items': 'center',
                    'align-items': 'center',
                    'align-content': 'center',
                    'width': '100%'
                });
                $('.scFilterToolbarPadding').find('a, button, input, select, span').not('.SC_SubMenuButton *').css({
                    'justify-content': 'center',
                    'justify-items': 'center',
                    'align-items': 'center',
                    'align-content': 'center',
                    'text-align': 'center',
                    'margin': '2px 0',
                    'width': '100%'
                });
            }


            if (appData.displayOptionsButton) {
                $('.scFilterToolbar').parent().attr('style', 'position: fixed; z-index: 10; top: ' + (parseInt(hH.outerHeight()) || 0) + 'px; display:none !important; width: 100% !important; padding: 0;');
                $('body').css({
                    'padding-top': (parseInt(hH.outerHeight()) || 0) + 'px',
                });
            } else {
                $('.scFilterHeader').parent().css({
                    'display' : 'flex',
                    'width' : '100%'
                });
                $('.scFilterToolbar').parent().attr('style', 'position: fixed; z-index: 10; top: ' + ((parseInt(hH.outerHeight()) || 0) - 1) + 'px; important; width: 100% !important; padding: 0;');
                var hT = $('.scFilterToolbar').parent();
                $('body').css({
                    'padding-top': ((parseInt(hH.outerHeight()) || 0) + (parseInt(hT.outerHeight()) || 0)) + 'px',
                });
                var t = setTimeout(function() { $('#slide_signal').stop().fadeOut(500); }, 4000);
            }

            break;
        case 'detail':
        case 'summary':
            var hH = $('.scGridTabelaTd .scGridHeader');

            if (appData.appType == 'detail') {
                $('.scGridTabela td').css({
                    'white-space': 'normal',
                    'word-break': 'break-all'
                });
                $('.scGridTabela').parent().css({
                    'width': '100%',
                    'display': 'block'
                });
            }

            $('#summary_body').parents('table, tbody, tr, td').attr('style', 'display:block !important; width: 100% !important;');
            $('#summary_body').attr('style', 'display:block !important; width: 100% !important;');
            $('#summary_body > .scGridTabelaTd').attr('style', 'display:block !important; width: 100% !important;');
            $('.scGridTabelaTd').parent('table, tbody, tr, td').attr('style', 'display:block !important; width: 100% !important;');
            $('.scGridToolbarPadding').attr('width', '');
            $('.scGridToolbarPadding').attr('aligh', '');
            $('.scGridToolbarPadding').parents('table, tbody, tr, td').attr('style', 'display:block !important; width: 100% !important; white-space: nowrap;');
            $('.scGridToolbar').attr('style', 'padding: 0;');
            $('.scGridBorder').parent().css('padding', '0');
            $('.scGridTabelaTd .scGridHeader').parent().parent().css({
                position: 'fixed',
                top: 0,
                'z-index': 10,
                display: 'flex',
                'flex-direction': 'row'
            });
            $('.scGridTabelaTd .scGridHeader').parent().css({
                'flex-grow': '1'
            });
            $('.scGridToolbarPadding').parent().css({
                'padding': 0,
                'display': 'table-row'
            });
            $('#res_chart_table').closest('td').css({
                'display': 'block',
                'margin': '0',
                'border': 'none',
                'width': '100%'
            });
            $('#res_chart_table').closest('tr').css({
                'display': 'block',
                'margin': '0',
                'border': 'none',
                'width': '100%'
            });
            $('#res_chart_table').find('table, tbody, tr, td').css({
                'display': 'block',
                'margin': '0',
                'border': 'none',
                'width': '100%'
            });
            $('#res_chart_table').css({
                'display': 'block',
                'margin': '0',
                'border': 'none',
                'width': '100%'
            });

            if (appData.toolbarOrientation == 'H') {
                $('.scGridToolbar').append('<div id="slide_signal"><div class="bnc_arrow">&#x2039;</div></div>');
            } else {
                'obj_barra_top';
                $('.scGridToolbarPadding').closest('table').not('.SC_SubMenuButton *').css({
                    'display': 'block',
                    'justify-content': 'center',
                    'justify-items': 'center',
                    'align-items': 'center',
                    'align-content': 'center',
                    'width': '100%',
                    'max-height': '200px',
                    'overflow-x': 'hidden',
                    'overflow-y': 'auto'
                });
                $('.scGridToolbarPadding').parents('table, tbody, tr, td').not('.SC_SubMenuButton *').attr('width', '');
                $('.scGridToolbarPadding').closest('tbody').not('.SC_SubMenuButton *').css({
                    'display': 'block',
                    'justify-content': 'center',
                    'justify-items': 'center',
                    'align-items': 'center',
                    'align-content': 'center',
                    'width': '100%'
                });
                $('.scGridToolbarPadding').closest('tr').not('.SC_SubMenuButton *').css({
                    'display': 'block',
                    'justify-content': 'center',
                    'justify-items': 'center',
                    'align-items': 'center',
                    'align-content': 'center',
                    'width': '100%'
                });
                $('.scGridToolbarPadding').closest('td').not('.SC_SubMenuButton *').css({
                    'display': 'flex',
                    'flex-direction': 'column',
                    'justify-content': 'center',
                    'justify-items': 'center',
                    'align-items': 'center',
                    'align-content': 'center',
                    'width': '100%'
                });
                $('.scGridToolbarPadding').find('a, button, input, select, span').not('.SC_SubMenuButton *').css({
                    'justify-content': 'center',
                    'justify-items': 'center',
                    'align-items': 'center',
                    'align-content': 'center',
                    'text-align': 'center',
                    'margin': '2px 0',
                    'width': '100%'
                });
            }

            if (appData.displayOptionsButton) {
                $('.scGridToolbar').parent().attr('style', 'position: fixed; z-index: 10; top: ' + (parseInt(hH.outerHeight()) || 0) + 'px; display:none !important; width: 100% !important; padding: 0;');
                $('body').css({
                    'padding-top': (parseInt(hH.outerHeight()) || 0) + 'px',
                });
            } else {

                $('.scGridToolbar').parent().attr('style', 'position: fixed; z-index: 10; top: ' + ((parseInt(hH.outerHeight()) || 0) - 1) + 'px; important; width: 100% !important; padding: 0;');
                var hT = $('.scGridToolbar').parent();
                $('body').css({
                    'padding-top': ((parseInt(hH.outerHeight()) || 0) + (parseInt(hT.outerHeight()) || 0)) + 'px',
                });
                var t = setTimeout(function() { $('#slide_signal').stop().fadeOut(500); }, 4000);
            }
            break;
    }
    setTimeout(function(){
        checkScroll();
        scrollBody();
        $('body').addClass('ready');
    }, 1000);
}

window.addEventListener('popstate', function(e) {
    closeAllModalPanes();
    if (e.state !== null && e.state !== '') {
        $('#' + e.state).toggleModalPane(undefined, true);
    }
});

function getAppData() {
    //console.log('getAppData');
    var app = {};
    if ($('#sc-mobile-app-data')[0]) {
        app = JSON.parse($('#sc-mobile-app-data').val());
    }
    return app;
}

function moveWithTouch(el, vertical, horizontal) {
    $(el).on("touchstart", function(e) {
        var wH = window.innerHeight;
        var sP = $(this).outerHeight() + $(this)[0].getBoundingClientRect().y;
        var margin = parseInt($(this).css('margin-top'));
        var sY = e.changedTouches[0].pageY;

        $(this).on("touchmove", function (ee) {
            var mY = ee.changedTouches[0].pageY;
            var pY = mY - sY;
            var mR = (pY + margin);
            var fH;

            fH = (mR + $(this).outerHeight() + 130);
            if (fH <= wH) {
                margin = parseInt($(this).css('margin-top'));
                mR = mR - (fH - wH);
                sY = mY;
            }
            if (mR >= 0) {
                mR = 0;
                margin = 0;
                sY = mY;
            }
            ee.preventDefault();
            $(this).css('margin-top', mR + 'px');
        });

        $(this).on("touchend", function (ee) {
            $(this).off("touchcancel");
            $(this).off("touchmove");
            $(this).off("touchend");
        });

        $(this).on("touchcancel", function (ee) {
            $(this).off("touchcancel");
            $(this).off("touchmove");
            $(this).off("touchend");
        });
    });
}