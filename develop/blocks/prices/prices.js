;(function() {
    
    if (window.matchMedia("(max-width: 768px)").matches) {
        var $mainTable = $('.prices__table-data');

        $mainTable.each(function () {
            var $header = $(this).find('.prices__table-header');
            var $body = $(this).find('.prices__table-body');
            var $firstHeaderCell = $header.find('th:first-child');
            var $firstbodyCell = $body.find('.prices__table-cell:first-child');

            $body.on('scroll', function (e) {
                var scrollTop = $body.scrollTop();

                if (scrollTop > 0) {
                    $body.css('margin-top', '0')
                } else {
                    $body.css('margin-top', '-2px');
                }

                var scrollLeft = $body.scrollLeft();

                if (scrollLeft > 0) {
                    $header.css("transform", "translateX(" + (-scrollLeft) + "px)");
                    $firstbodyCell.css("transform", "translateX(" + (scrollLeft) + "px)");
                    $firstHeaderCell.css("transform", "translateX(" + (scrollLeft) + "px)");
                } else {
                    $header.css("transform", "translateX(0)");
                    $firstbodyCell.css("transform", "translateX(0)");
                    $firstHeaderCell.css("transform", "translateX(0)");
                }

            });
        })
    }

    var $innerTable = $('.prices__inner-table');

    $innerTable.each(function () {
        var _this = $(this);

        var parentCell = _this.parent();
        var parentCellHeight = parentCell.outerHeight();
        var innerCells = _this.find('td');

        innerCells.each(function () {
            $(this).css('height', parentCellHeight / innerCells.length)
        })
    })
    
})();