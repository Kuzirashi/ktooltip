// Inspired by http://stackoverflow.com/a/15302051/2166409
function htmlDimensions(html, font) {
  if (!htmlDimensions.dummyEl) {
    htmlDimensions.dummyEl = $('<div>').hide().appendTo(document.body);
  }
  htmlDimensions.dummyEl.html(html).css('font', font);
  return {
    height: htmlDimensions.dummyEl.height(),
    width: htmlDimensions.dummyEl.width()
  };
}

$(function() {
  $('body').append('<div class="ktooltip"><div class="ktooltip-content"></div></div>');

  var $tooltip = $('.ktooltip');
  var $tooltipInner = $('.ktooltip-content');
  $tooltip.css({
    opacity: 0,
    'z-index': 999999,
    width: 'auto',
    display: 'block',
    position: 'absolute'
  });

  var cache = {};

  $('[data-tooltip]').each(function(index, element) {
    var $element = $(element);
    var tooltipType = $element.attr('data-tooltip');

    var text = $element.attr('data-tooltip-content');
    var textWidth = htmlDimensions(text, $tooltipInner.css('font')).width + 10;

    function showTooltip(kind) {
      var leftPosition = $element.offset().left + $element.width() / 2 - textWidth / 2;
      if (leftPosition < 0) {
        leftPosition = 0;
      }

      $tooltip.css({
        top: $element.offset().top + 20 + 'px',
        left: leftPosition + 'px',
        display: 'block'
      }).stop(true, true).fadeTo(100, 1);

      if (kind === 'ajax') {
        var url = $element.attr('data-tooltip-api');
        var cached = cache[url];

        if (cached) {
          var dimensions = htmlDimensions(cached);
          $tooltipInner.html(cached).css({
            width: dimensions.width + 10,
            height: dimensions.height
          });
        } else {
          $.get(url, function(data) {
            var dimensions = htmlDimensions(data);
            $tooltipInner.html(data).css({
              width: dimensions.width + 10,
              height: dimensions.height
            });
            cache[url] = data;
          });
        }
      } else {
        $tooltipInner.text(text).css({
          width: textWidth + 'px',
          height: 'auto'
        });
      }
    }

    function hideTooltip() {
      $tooltip.stop(true, true).fadeOut(400);
    }

    switch (tooltipType) {
      case 'ajax':
        $element.hover(function() {
          showTooltip('ajax');
        }, hideTooltip);
        break;
      case 'focus':
        $element.focus(showTooltip).focusout(hideTooltip);
        break;
      default:
        $element.hover(showTooltip, hideTooltip);
    }
  });
});
