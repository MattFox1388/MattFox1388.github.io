$(document).ready(function(){
    findSection();
});
function findSection(){
    $("li a").click(function(e){
        var sectionID = e.currentTarget.id + "Section";
        $("html, body").animate({
            scrollTop:$("#"+sectionID).offset().top
            },1000);
    });
}
