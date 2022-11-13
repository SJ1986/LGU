// dom ready
$(function () {
    moment.locale('ko');
    sideMenu();
    uiJSCommon();
});

var $win = $(window);
var $doc = $(document);

//pop event
function popEvent(obj){
    $('.pop-overlay').hide();
    $(obj).click(function(){
        let thisId = $('#' + $(this).data('id'));
        let thisClose = thisId.find('.pop-close');
        thisId.show().addClass('is-open');
        $('.pop-overlay').show();

        $(thisClose).click(function(){
            thisId.hide().removeClass('is-open');
            $('.pop-overlay').hide();
        })
    });
};
let popFn = new popEvent('.popOpen');

//sideMenu event
function sideMenu(){
    $('.btn-sideMenu--open').click(function(){
        $('.pop-overlay').show();
        $('.sideMenu').addClass('is-open');
    });
    $('.btn-sideMenu--close').click(function(){
        $('.pop-overlay').hide();
        $('.sideMenu').removeClass('is-open');
    });
}

// datepicker
function datepicker($root) {
    if (!$root) {
        $root = $doc;
    }
    $root.find('.js-datepicker-range').each(function () {
        var $this = $(this);
        var $min = $this.find('.js-datepicker-range__min');
        var $max = $this.find('.js-datepicker-range__max');
        $min.datetimepicker({
            locale: 'ko',
            format: 'YYYY-MM-DD',
            dayViewHeaderFormat: 'YYYY년 MMMM',
        });
        $max.datetimepicker({
            locale: 'ko',
            format: 'YYYY-MM-DD',
            dayViewHeaderFormat: 'YYYY년 MMMM',
            useCurrent: false,
        });
        $min.off('dp.change.uiJSDatepickerRange').on('dp.change.uiJSDatepickerRange', function (e) {
            $max.data('DateTimePicker').minDate(e.date);
        });
        $max.off('dp.change.uiJSDatepickerRange').on('dp.change.uiJSDatepickerRange', function (e) {
            $min.data('DateTimePicker').maxDate(e.date);
        });
    });
    $root.find('.js-datepicker').datetimepicker({
        locale: 'ko',
        format: 'YYYY-MM-DD',
        dayViewHeaderFormat: 'YYYY년 MMMM'
    });
    $root.find('.js-monthpicker').datetimepicker({
        locale: 'ko',
        viewMode: 'years',
        format: 'YYYY년 M월'
    });
}
function setTimeSelectRange($min, $max, min, max) {
    $min
        .find('option')
        .prop('selected', false)
        .removeAttr('selected')
        .filter('[data-option="' + min + '"]')
        .prop('selected', true)
        .attr('selected', '');
    $max
        .find('option')
        .prop('selected', false)
        .removeAttr('selected')
        .filter('[data-option="' + max + '"]')
        .prop('selected', true)
        .attr('selected', '');
}
$doc.on('click.uiDatepicker', '[data-datepicker-range]', function () {
    var $this = $(this);
    var $wrap = $this.closest('.js-datepicker-range');
    var $min = $wrap.find('.js-datepicker-range__min');
    var $max = $wrap.find('.js-datepicker-range__max');
    var $hourMin = $wrap.find('.js-datepicker-range__hour-select-min');
    var $hourMax = $wrap.find('.js-datepicker-range__hour-select-max');
    var $minuteMin = $wrap.find('.js-datepicker-range__minute-select-min');
    var $minuteMax = $wrap.find('.js-datepicker-range__minute-select-max');
    var range = $this.attr('data-datepicker-range');
    var val = Number(range.replace(/(-*[0-9]+) *((year|month|day)(s*))/g, '$1'));
    var unit = range.replace(/(-*[0-9]+) *((year|month|day)(s*))/g, '$2');
    var minDateTimePicker = $min.length ? $min.data('DateTimePicker') : null;
    var maxDateTimePicker = $max.length ? $max.data('DateTimePicker') : null;
    var now = moment();
    var to = moment().add(val, unit);
    var nowHour = now.hour();
    var nowMinute = now.minute();
    var isHour = $hourMin.length && $hourMax.length;

    if (minDateTimePicker && maxDateTimePicker) {
        if (val < 0) {
            if (!isHour) {
                to.add(1, 'day');
            }
            minDateTimePicker.date(to.format());
            maxDateTimePicker.date(now.format());
        } else if (0 < val) {
            if (!isHour) {
                to.add(-1, 'day');
            }
            minDateTimePicker.date(now.format());
            maxDateTimePicker.date(to.format());
        }
    }
    if (isHour) {
        setTimeSelectRange($hourMin, $hourMax, nowHour, nowHour);
    }
    if ($minuteMin.length && $minuteMax.length) {
        setTimeSelectRange($minuteMin, $minuteMax, nowMinute, nowMinute);
    }
});

//simplebar
var SimpleBarItem = new SimpleBar(document.querySelector('.ui-scroller'));    
var SimpleBarItem = $('.ui-scroller').each( function(index,element){
    new SimpleBar(element);
});
option = {
autoHide: true,
forceVisible: false,
classNames: {
    resizeWrapper: 'simplebar-resize-wrapper',
    content: 'simplebar-content',
    offset: 'simplebar-offset',
    mask: 'simplebar-mask',
    wrapper: 'simplebar-wrapper',
    placeholder: 'simplebar-placeholder',
    scrollbar: 'simplebar-scrollbar',
    track: 'simplebar-track',
    heightAutoObserverWrapperEl: 'simplebar-height-auto-observer-wrapper',
    heightAutoObserverEl: 'simplebar-height-auto-observer',
    visible: 'simplebar-visible',
    horizontal: 'simplebar-horizontal',
    vertical: 'simplebar-vertical',
    hover: 'simplebar-hover',
    dragging: 'simplebar-dragging'
},
scrollbarMinSize: 25,
scrollbarMaxSize: 0,
direction: 'ltr',
timeout: 1000
}     
new SimpleBar(document.querySelector('.ui-scroller'), option)

function uiJSCommon($root){
    if (!$root) {
        $root = $doc;
    }

    datepicker($root);
}
window.uiJSCommon = uiJSCommon;