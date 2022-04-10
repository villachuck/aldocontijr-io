
$(document).ready(function(){
    barProgress();
});

window.onhashchange = function (){
    barProgress();
}

$(window).on('orderFormUpdated.vtex', function () {
    barProgress();
});

function barProgress(){
  
    $("#barProgress li").each(function(){
        $(this).removeClass("active")
        if (location.hash == '#/payment'){
            if($(this).hasClass("item-payment")){
                $(this).addClass("active")
            }
        }
        if (location.hash == '#/email'){
            if($(this).hasClass("item-shipping")){
                $(this).addClass("active")
            }
        }
        if (location.hash == '#/profile'){
            if($(this).hasClass("item-shipping")){
                $(this).addClass("active")
            }
        }
        if (location.hash == '#/shipping'){
            if($(this).hasClass("item-payment")){
                $(this).addClass("active")
            }
        }
        if (location.hash == '#/cart'){
            if($(this).hasClass("item-cart")){
                $(this).addClass("active")
            }
        }
    });
}

$(function(){
    
  
  $('.slide-trigger').on('click', function(e){
          if($(window).innerWidth() <= 1024){
              e.preventDefault()
              // Remove class active from siblings
              $(this).parent().siblings().find('.slide-trigger--active').removeClass('slide-trigger--active');
              // .slide-trigger
              $(this).addClass('slide-trigger--active');
              $(this).next().slideToggle('fast');
              // <ul.genres-categories>
              $(this).parent().siblings().find('.slide-collapse').slideUp();
              return false;
          }
      });

  if('body .body-cart'){
    var principalDataVitrine = '';
    
    $('<div class="title-wrapper" id="cart-slider">'+
      '<h2>Complementa tu compra</h2>'+
      '<ul class="nav nav-tabs">'+
        '<li class="active" hidden><a data-toggle="tab" href="#guantes"></a></li>'+
      '</ul>'+
      '<div class="tab-content">'+
        '<div id="guantes" class="tab-pane box-guantes fade in active">'+
          '<div id="sliderguantes" class="box-content"></div>'+
        '</div>'+
    '</div>').insertAfter('.extensions-checkout-buttons-container');

    $('<div class="prateleira-slider" >'+
      '<ul id="list-vitrine-cart-box-a" ></ul>'+
      '</div>').insertAfter('#sliderguantes');

    $.ajax({
      url: "https://aldocontijr.myvtex.com/api/catalog_system/pub/products/search/?fq=H:137",
      type: 'GET',
      dataType: 'json', 
      success: function(data) {
        for(var i = 0; i< data.length; i++){
      
          var principalDataVitrine = data[i];
          $.ajax({                    
            url: "https://aldocontijr.myvtex.com/api/catalog_system/pub/products/variations/" + data[i].productId,
            type: 'GET',
            dataType: 'json',
            success: function(data){
              for(var j = 0; j< data.skus.length; j++){
                console.log(data);
                 if(data.available != false){
                   console.log(data.skus[j].listPrice)
                   if(data.skus[j].listPrice != 0){
                     var vitrinesCheckout2 = '<li layout="1f9103de-287a-49e7-9a13-cd71b9e83ab3" class="hombre unwraped"><a rel="4712" style="text-decoration:none;"><figure class="shelf-img shelf-front"><img src="' + data.skus[j].image + '" width="200" height="250" alt="' + data.skus[j].skuname +'" id=""><span class="hover-img-product hide hidden"><img src="' + data.skus[j].image + '" width="190" height="230" alt="'+ data.skus[j].skuname +'" id=""></span></figure><div class="item-name"><span>'+ data.name+'</span></div><div class="price"><div class="preciolista"><span class="list-price" style="font-size:15px;">' + data.skus[j].listPriceFormated + '</span></div></div></a><div class="div-for-btn"><button type="button" class="btn btn-addinside"><span class="action-oncart" alt="'+ data.skus[j].sku +'" >Añadir al carrito</span></button></div></li>'
               
               }
                   else {
                     var vitrinesCheckout2 = '<li layout="1f9103de-287a-49e7-9a13-cd71b9e83ab3" class="hombre unwraped"><a rel="4712" style="text-decoration:none;"><figure class="shelf-img shelf-front"><img src="' + data.skus[j].image + '" width="200" height="250" alt="' + data.skus[j].skuname +'" id=""><span class="hover-img-product hide hidden"><img src="' + data.skus[j].image + '" width="190" height="230" alt="'+ data.skus[j].skuname +'" id=""></span></figure><div class="item-name"><span>'+ data.name+'</span></div><div class="price"><div class="preciolista"><span class="list-price" style="font-size:15px;"></span></div></div></a><div class="div-for-btn"><button type="button" class="btn btn-addinside"><span class="action-oncart" alt="'+ data.skus[j].sku +'" >Añadir al carrito</span></button></div></li>'
                   }
                }
                else {
                  var vitrinesCheckout2 = '<li layout="1f9103de-287a-49e7-9a13-cd71b9e83ab3" class="hombre unwraped" style="display: none !important"><a rel="4712" style="text-decoration:none;"><figure class="shelf-img shelf-front"><img src="' + data.skus[j].image + '" width="200" height="250" alt="' + data.skus[j].skuname +'" id=""><span class="hover-img-product hide hidden"><img src="' + data.skus[j].image + '" width="190" height="230" alt="'+ data.skus[j].skuname +'" id=""></span></figure><div class="item-name"><span>'+ data.name+'</span></div><div class="price"><span class="list-price" style="font-weight:bold; font-size:15px;">' + data.skus[j].listPriceFormated + '</span></div></a><div class="div-for-btn"><button type="button" class="btn btn-addinside"><span class="action-oncart" alt="'+ data.skus[j].sku +'" >Añadir al carrito</span></button></div></li>'
                }

                $('#list-vitrine-cart-box-a').append(vitrinesCheckout2);
                $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'https://aldocontijr.myvtex.com/arquivos/slick.css') );  
                
                setTimeout(function(){
                  $.getScript('https://aldocontijr.myvtex.com/arquivos/slick.js', function(){
                    $('.tab-pane #list-vitrine-cart-box-a').not('.slick-initialized').slick({
                      slidesToShow: 3,
                      slidesToScroll: 1,
                      infinite: true,
                      responsive: [{
                        breakpoint: 768,
                        settings: {
                          arrows: true,
                          slidesToShow: 2
                        }
                      }],
                      dots: false,
                      arrows: true,
                      autoplay: false,
                      prevArrow:"<a class='slick-prev pull-left' style=' left:0px;'><img src='https://whirlpoolgtm.vteximg.com.br/arquivos/leftarrow.png'></a>",
                      nextArrow:"<a class='slick-next pull-right' style='transform: rotate(180deg); right:0;'><img src='https://whirlpoolgtm.vteximg.com.br/arquivos/leftarrow.png'></a>"
                    });
                  });
                }, 0);
              }

              $('.btn-addinside').click(function(){
                var p = $('span', this).attr('alt');
                console.log(p);
                $('span', this).text('Agregado');
                var qtd_skuspecial = 1; 
                $(".campo-qtd").val();
                vtexjs.checkout.getOrderForm().done(function(orderForm) {
                  var itemxy = {
                    id: p,
                    quantity: qtd_skuspecial,
                    seller: '1'
                  };

                  vtexjs.checkout.addToCart([itemxy], null, 1).done(function(orderForm) {
                    $('span', this).text('&#10004;Agregado');
                    $('span', this).addClass('bought');
                    alert("Producto agregado al carrito");
                  });
                });
              });
            }
          })
        }
      }
    });
  }

});