$(function() {
  $(document).on('click', ".close1", function() 
    {
      $(this).parent().hide("slide","slow");
      var i = $(this).parent().attr('task_number');
      localStorage.removeItem("todo_"+i+"_title");    
      localStorage.removeItem("todo_"+i+"_date");
      localStorage.removeItem("todo_"+i+"_desc");
      localStorage.removeItem("todo_"+i+"_status");
      return false;
    });
  $(document).ready(function() {
    for(var i=1;i<=localStorage.todo_counter;i++)
    {
       var tasks ='<div class="task_box" status="'+localStorage.getItem("todo_"+i+"_status")+'" task_number="'+i+'"><button type="button" class="close1 btn btn-default btn-xs"><span class="glyphicon glyphicon-trash"></span></button><span class="tt">'+localStorage.getItem("todo_"+i+"_title")+'</span><span class="tt date">'+localStorage.getItem("todo_"+i+"_date")+'</span><p class="tt tbody">'+localStorage.getItem("todo_"+i+"_desc")+'</p></div>';
       switch(localStorage.getItem("todo_"+i+"_status"))
       {
        case "pending" : $(".task_container1").prepend(tasks);break;
        case "inprogress" : $(".task_container2").prepend(tasks); break;
        case "completed" : $(".task_container3").prepend(tasks); break;
       }
     }
     $(".task_box").draggable({
      appendTo: "body" ,
      revert: "invalid", 
      containment: "document",
      helper: "clone",
      cursor: "move"
    });
    $(".task_container2").droppable({
      accept: ".task_box",
      activeClass: "ui-state-highlight",
      drop: function( event, ui ) {
        $(".task_container2").prepend(ui.draggable);
        $(ui.draggable).attr('status','inprogress');
        var number= $(ui.draggable).attr('task_number');
        localStorage.setItem("todo_"+number+"_status","inprogress");
      }
    });
    $(".task_container3").droppable({
      accept: ".task_box",
      activeClass: "ui-state-highlight",
      drop: function( event, ui ) {
        $(".task_container3").prepend(ui.draggable);
        $(ui.draggable).attr('status','completed'); 
        var number= $(ui.draggable).attr('task_number');
        localStorage.setItem("todo_"+number+"_status","completed");     
      }
    });
  });
  $( "#todo_date" ).datepicker({ showAnim: "slideDown" });
  var $form = $('#todo_form');
  $form.submit(function() {
  var $todo_date = $('#todo_date').val(), 
  $todo_title = $("#todo_title").val(), 
  $todo_desc = $('#todo_desc').val();
  if(localStorage.todo_counter)
    {
    localStorage.todo_counter=Number(localStorage.todo_counter)+1;
    }
  else
    {
    localStorage.todo_counter=1;
    }
    var i=Number(localStorage.todo_counter);
    localStorage.setItem("todo_"+i+"_title",$todo_title);
    localStorage.setItem("todo_"+i+"_date",$todo_date);
    localStorage.setItem("todo_"+i+"_desc",$todo_desc);
    localStorage.setItem("todo_"+i+"_status","pending");
    var tasks ='<div class="task_box" status="pending" task_number="'+i+'"><button type="button" class="btn btn-default btn-xs close1"><span class="glyphicon glyphicon-trash"></span></button><span class="tt">'+localStorage.getItem("todo_"+i+"_title")+'</span><span class="tt date">'+localStorage.getItem("todo_"+i+"_date")+'</span><p class="tt tbody">'+localStorage.getItem("todo_"+i+"_desc")+'</p></div>';
    $(".task_container1").prepend(tasks);
    $(".task_box").draggable({
      appendTo: "body" ,
      revert: "invalid", 
      containment: "document",
      helper: "clone",
      cursor: "move"
    });
    $(".task_container2").droppable({
      accept: ".task_box",
      activeClass: "ui-state-highlight",
      drop: function( event, ui ) {
        $(".task_container2").prepend(ui.draggable);
        $(ui.draggable).attr('status','inprogress');
        var number= $(ui.draggable).attr('task_number');
        localStorage.setItem("todo_"+number+"_status","inprogress");
      }
    });
    $(".task_container3").droppable({
      accept: ".task_box",
      activeClass: "ui-state-highlight",
      drop: function( event, ui ) {
        $(".task_container3").prepend(ui.draggable);
        $(ui.draggable).attr('status','completed'); 
        var number= $(ui.draggable).attr('task_number');
        localStorage.setItem("todo_"+number+"_status","completed");     
      }
    });
    $(".task_container1").droppable({
      accept: ".task_box",
      activeClass: "ui-state-highlight",
      drop: function( event, ui ) {
        $(".task_container1").prepend(ui.draggable);
        $(ui.draggable).attr('status','pending'); 
        var number= $(ui.draggable).attr('task_number');
        localStorage.setItem("todo_"+number+"_status","pending");     
      }
    });
    return false;	
  });
});
