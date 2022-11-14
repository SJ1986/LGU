$(function () {

});

var $checkMedical = $('.check_all');
$checkMedical.change(function () {
    var $this = $(this);
    var checked = $this.prop('checked'); // checked 문자열 참조(true, false)
    $('input[name="check_child"]').prop('checked', checked);
});
var boxes = $('input[name="check_child"]');
boxes.change(function () {
    var boxLength = boxes.length;
    // 체크된 체크박스 갯수를 확인하기 위해 :checked 필터를 사용하여 체크박스만 선택한 후 length 프로퍼티를 확인
    var checkedLength = $('input[name="check_child"]:checked').length;
    var selectAll = (boxLength == checkedLength);
    $checkMedical.prop('checked', selectAll);
});