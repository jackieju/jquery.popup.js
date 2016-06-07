# jquery.popup.js


example:
```javascript
<html>
<body>
	<script src="/javascripts/jquery-1.3.2.js" type="text/javascript" charset="utf-8"></script>
	<script src="/javascripts/jquery.popup.js" type="text/javascript" charset="utf-8"></script>
<script>
$.popup("hello world\n");
</script>
</body>
</html>
```

##Arguments:
```
var settings = $.extend( {
	'styles': '',	// you can append your style for popup div
	'classes': '', // classes you like to add for popup div, delimited by space
	'popupid': "popup",	// if you already have div in page,  you can popup it
	'pos': true // auto position=>true, or given {left, top}
}, options);
```

example:
```
$.popup("hello world\n", {
	pos: {left: 0, top, 0}
});

```