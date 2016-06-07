jQuery.extend({

	calcSizeForText: function calcSizeForText(text){
		var  calcTextLineSize = function (text, fontsize){
			test = document.getElementById("testtextsize");
			if (test == null){
				$_test = "<div id='testtextsize' style='display:inline-block;visibility:hidden;z-index:-1;position:absolute;'></div>";
				$( "body" ).append($_test);
				test = document.getElementById("testtextsize");
			}
			test.style.fontSize = fontsize;
			test.innerHTML=text;
			height = (test.clientHeight + 1) ;
			width = (test.clientWidth + 1) ;
			return {width:width,height:height};
		}
		size= calcTextLineSize(text,"13pt");
		console.log("=>width:"+size.width+", height:"+size.height);

		u = Math.sqrt(size.width*size.height*9/16);
		return {
			width:u*16/9,
			height:u
		}
	}
});
jQuery.extend({

	popup: function(msg, options) { 
		
		// move div to horizonal/vertical center
		var center = function (node){
			//$("#popup").css("left", "0px");

			h1 = node.outerHeight();
			console.log("window.screen.height="+window.screen.height);
			console.log("window.innerHeight="+window.innerHeight);
			// h2 = window.screen.height;
			h2 = window.innerHeight;

			//alert("h1:"+h1+", h2:"+h2);
			node.css("top", (h2-h1)/2+"px");

			console.log("window.screen.wdith="+window.screen.width);
			console.log("window.innerWidth="+window.innerWidth);

			// w2 = window.screen.width;
			w2 = window.innerWidth;
			//$("#popup").css("max-width", w2-20+"px");
			w1 = node.outerWidth();

			_left = (w2-w1)/2;
			console.log("w1:"+w1+", w2:"+w2+", _left="+_left);
			node.css("left", _left+"px");

			w3 = parseInt(node.css("border-left-width"))+parseInt(node.css("border-right-width"))+parseInt(node.css("padding-left"))+parseInt(node.css("padding-right"));
			console.log("w3:"+w3+ ", w1:"+w1);
			//node.css("width", (w1-w3)+"px");
			node.width(w1-w3);
			//alert(99);
			console.log(node.outerWidth()+","+node.css("left"));
		}
		var show_popup = 	function (node, pos){
				pos = pos || true;

				node.css("display", "block");
				if (pos == true) {// auto-position
					center(node)
				}else{
					node.css("left", pos.x+"px");
					node.css("top", pos.y+"px");
				}
				console.log("popup done");
				return node;
			}
		var settings = $.extend( {
			'styles': '',
			'classes': '', // delimited by space
			'popupid': "popup",
			'pos': true // auto position=>true, or given {left, top}
	    }, options);
		pos = settings.pos;
		nodeid = settings.popupid;
		node = $("#"+nodeid);
		if (node.length == 0){ // create dive with default id
			nodeid = "popup";
			style = "opacity:0.3;background-color:black;position:absolute;\
			z-index:800;color:white;font-size:13pt;text-align:center;padding:28px;\
			border-radius: 10px;-moz-border-radius: 10px; -webkit-border-radius: 10px;\
			font-family: Arial,Helvetica,sans-serif;\
			min-width:200PX;min-height:72PX;word-wrap: break-word;word-break: normal;"+settings.styles;
			$_node = "<div id='popup' class='"+classes+"' style='"+style+"'>";
			$( "body" ).append($_node);
			node = $("#popup");
			node.click(function(){
				node.css("display", "none");
			});
		}
		
		node = show_popup(node, pos);
		console.log("pos:"+pos);
		if (pos == true){
			node.css("display", "table"); //for vertical align center	
			$("#popup").html("<p>"+msg+"</p>");
		}
		else

		node.html(msg);

		pnode = node.children("p");
		console.log("pnode:"+pnode.length);
		pnode.css("display", "table-cell"); 
		pnode.css("vertical-align", "middle"); 		
		pnode.css("text-align", "center"); 

		// auto-resize to 16:9 according the text content
		size = $.calcSizeForText(msg);
		console.log("size:"+size.width+","+size.height);
		
		if (size !=null && size.width && size.height){
			if (pos){
				pnode.width(size.width);
				pnode.height(size.height);
			}
			node.width(size.width);
			node.height(size.height);
			console.log("size changed to "+size.width+","+size.height);
		}
		
		
	
	
	} //	popup: function(msg, options) { 
	
});


/* basic
(function( $ ) { // prevent from overridden by other lib
    $.fn.popup = function() {

        // plugin real content
        // 没有必要再作 $(this) ，因为"this"已经是 jQuery 对象了
        // $(this) 与 $($('#element')) 是相同的

        //this.fadeIn('normal', function(){
            // 在这里 this 关键字指向 DOM 元素
        //});                
     
	    // Create some defaults, extending them with any options that were provided
	    var settings = $.extend( {
	      'location'         : 'top', // default options
	      'background-color' : 'blue'
	    }, options);
	
		return this.each(function() { // return this to keep chainability

		      var $this = $(this);

		      if ( !type || type == 'width' ) {
		        $this.width( $this.width() );
		      }

		      if ( !type || type == 'height' ) {
		        $this.height( $this.height() );
		      }

		    });
	
    };// $.fn.popup = function() {
})( jQuery );
*/
/** multi method 
(function( $ ){

  var methods = {
    init : function( options ) { 
      // 这 
    },
    show : function( ) {
      // 很
    },
    hide : function( ) { 
      // 好
    },
    update : function( content ) { 
      // !!! 
    }
  };

  $.fn.tooltip = function( method ) {

    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    

  };

})( jQuery );

// 调用  init 方法
$('div').tooltip(); 

// 调用  init 方法
$('div').tooltip({
  foo : 'bar'
});

--
// 调用 hide 方法
$('div').tooltip('hide'); 

--
// 调用 update 方法
$('div').tooltip('update', 'This is the new tooltip content!');
*/

/** bing event
(function( $ ){

  var methods = {
     init : function( options ) {

       return this.each(function(){
         $(window).bind('resize.tooltip', methods.reposition);
       });

     },
     destroy : function( ) {

       return this.each(function(){
         $(window).unbind('.tooltip');
       })

     },
     reposition : function( ) { 
       // ... 
     },
     show : function( ) { 
       // ... 
     },
     hide : function( ) {
       // ... 
     },
     update : function( content ) { 
       // ...
     }
  };

  $.fn.tooltip = function( method ) {

    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    

  };

})( jQuery );


--
$('#fun').tooltip();
// Some time later...
$('#fun').tooltip('destroy');
*/


/** store data in node 
(function( $ ){

  var methods = {
     init : function( options ) {

       return this.each(function(){

         var $this = $(this),
             data = $this.data('tooltip'),
             tooltip = $('<div />', {
               text : $this.attr('title')
             });

         // If the plugin hasn't been initialized yet
         if ( ! data ) {

           
           //  Do more setup stuff here


           $(this).data('tooltip', {
               target : $this,
               tooltip : tooltip
           });

         }
       });
     },
     destroy : function( ) {

       return this.each(function(){

         var $this = $(this),
             data = $this.data('tooltip');

         // Namespacing FTW
         $(window).unbind('.tooltip');
         data.tooltip.remove();
         $this.removeData('tooltip');

       })

     },
     reposition : function( ) { // ... },
     show : function( ) { // ... },
     hide : function( ) { // ... },
     update : function( content ) { // ...}
  };

  $.fn.tooltip = function( method ) {

    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    

  };

})( jQuery );
*/