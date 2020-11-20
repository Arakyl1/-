let carts = $(".proguct-cart");
let col = $(".col");
let buttonSey = $(".additional-info a");



$(carts).click(function () { 
  if ($(this).parents().hasClass("not-on-sale")) {
    $(this).parents(".col").toggleClass("soldOut");
  } else  if ($(this).parents().hasClass("active")) {
    $(this).parents(".col").removeClass("active");
    $(this).removeClass ("active");
  } 
  else {
    $(this).parents(".col").addClass("active");
    $(this).addClass("active");
  }
});



$(buttonSey).click(function () { 
  if ($(this).parents().hasClass("not-on-sale")) {
    $(this).parents(".col").toggleClass("soldOut");
  }
else{
  $(this).parents(".col").addClass("active");
  $(carts).addClass("active");
}
});



$(col).on('mouseover', function(){
  if ($(this).hasClass("active")) {
    if ($(this).children(carts).hasClass("active")) {
      $(".business-name", this).replaceWith("<p class='business-name'>Сказочное заморское яство</p>");
    }
  }
});
$(col).on('mouseout', function(){
  if ($(this).hasClass("active")) {
    if ($(this).children(carts).hasClass("active")) {
      $(".business-name", this).replaceWith("<p class='business-name' style=' color: #d91667;'>Котэ не одобряет?</p>");
      
    }
  }
});
