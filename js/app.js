$(document).ready(function(){
    findSection();
});

function findSection(){
    $("a").click(function(e){
        console.log("pressed");
        var sectionID = e.currentTarget.id + "Section";
        $("html, body").animate({
            scrollTop:$("#"+sectionID).offset().top
            },1000);
    });
}