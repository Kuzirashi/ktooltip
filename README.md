# kTooltip

Simple tooltip library written in 6 hours.

[![Demo kTooltip](https://j.gifs.com/o2lVKz.gif)](https://youtu.be/Sc6vRhDxnhM)

## Requirements

Link CSS and JS in your HTML file:

~~~ HTML
<link rel="stylesheet" href="../ktooltip.css"/>

<script src="jquery-2.1.4.min.js" type="text/javascript"></script>
<script src="../ktooltip.js" type="text/javascript"></script>
~~~

## Usage

### Simple
Add attributes `data-tooltip` and `data-tooltip-content` to desired element for tooltip to work.

~~~ HTML
<span data-tooltip="text" data-tooltip-content="Content of tooltip.">This is span.</span>
~~~

### Focus

Just switch `data-tooltip` from `text` to `focus`.

~~~ HTML
<input data-tooltip="focus" data-tooltip-content="This is tooltip."/>
~~~

### AJAX

Switch `data-tooltip` to `ajax` and use `data-tooltip-api` to provide URL instead of `data-tooltip-content`.

~~~ HTML
<span data-tooltip="ajax" data-tooltip-api="api1.html">AJAX request will be fired on hover</span>
~~~

## License

The MIT License (MIT)
Copyright (c) 2016 Daniel Kmak
