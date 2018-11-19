(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.pager_p3k = factory(root);
    }
})(this, function (root) {
    'use strict';

    var pager_p3k = {};
    var page_options = {
        pagination_element: '.pagination',
        previous: 'Previous',
        next: 'Next',
        num_pages: 10,
        current_page: 1,
        show_page_links: 5,
        call_as_url: true,
        to_call: window.location.href + '?page='
    };

    pager_p3k.paginate = function( options ) {
        page_options = $.extend(page_options, options);
        pager_p3k.validateFixOptions();
        pager_p3k.clearPagination();
        pager_p3k.render();
    }

    pager_p3k.validateFixOptions = function() {
        if (isNaN(page_options.show_page_links)) page_options.show_page_links = 5;
        if (page_options.show_page_links > 19) page_options.show_page_links = 19;
        if (page_options.show_page_links < 5) page_options.show_page_links = 5;
        if (isNaN(page_options.num_pages)) page_options.num_pages = 0;
        if (isNaN(page_options.current_page)) page_options.current_page = 1;
        if (page_options.current_page < 1) page_options.current_page = 1;
        if (page_options.current_page > page_options.num_pages) page_options.current_page = page_options.num_pages;
    }

    pager_p3k.clearPagination = function() {
        $(page_options.pagination_element).empty();
    }

    pager_p3k.render = function() {
        var id = page_options.pagination_element;
        var pages = parseInt(page_options.num_pages);
        if (pages == 0) {
            pager_p3k.addPaginateItem(id, page_options.previous,'' ,'disabled', null);
            pager_p3k.addPaginateItem(id, page_options.next,'' ,'disabled', null);
            return;
        }

        var current = parseInt(page_options.current_page);
        var to_call = page_options.to_call;
        var show = parseInt(page_options.show_page_links);
        if (parseInt(page_options.num_pages) > show) show -= 2;
        if (!(show % 2)) show++;
        if (current < (show + 1)) show += 2;
        var mid_show = Math.floor(show / 2), start = 1, itm_cnt = 0;
        (current > mid_show) ? start = current - mid_show : start = 1;
        if ((pages-current) < mid_show) { start = (current - ((show - 1) - (pages - current))) > 0 ? current - ((show - 1) - (pages - current)) : 1; }
        pager_p3k.addPaginateItem(id, page_options.previous, (current - 1), (current != 1) ? '' : 'disabled', (current != 1) ? to_call : null);
        if ((start + show + 1) > pages) start = pages - show - 1;
        if (start < 1) start = 1;
        if ((start > 1) && (parseInt(page_options.show_page_links) == show)) { (start == 2) ? show-- : show -= 2; }
        for (var i = start; i <= (start + show); i++) {
            if ((current > mid_show) && (itm_cnt == 0) && (start != 1)) pager_p3k.addPaginateItem(id, 1, 1, '', to_call);
            if ((current > mid_show) && (start > 2) && (itm_cnt == 0))
                (i == 3) ? pager_p3k.addPaginateItem(id, 2, 2, '', to_call) : pager_p3k.addPaginateItem(id, '...', '', 'disabled', null);
            (i == current) ? pager_p3k.addPaginateItem(id, i, '', 'active', null) : pager_p3k.addPaginateItem(id, i, i, '', to_call);
            itm_cnt++;
            if (i == pages) break;
            if ((itm_cnt == show) && (i < (pages - 1)))
                (i == (pages -  2))
                    ? pager_p3k.addPaginateItem(id, (pages - 1), (pages - 1), ((pages - 1) == current) ? 'active' : '', to_call)
                    : pager_p3k.addPaginateItem(id, '...', '', 'disabled', null);
            if (itm_cnt == show) {pager_p3k.addPaginateItem(id, pages, pages, (pages == current) ? 'active' : '', to_call); break;}
        }
        
        pager_p3k.addPaginateItem(id, page_options.next, (current + 1), (current != pages) ? '' : 'disabled', (current != pages) ? to_call : null);
    }

    pager_p3k.addPaginateItem = function(id, text_display, page_number, active_class, function_call) {
        var change_page = '', href = '#';
        if (function_call !== null) { (page_options.call_as_url) ? href = function_call + page_number : change_page = 'onclick="' + function_call + '(' + page_number + ')"'; }
        $(id).append( '<li class="page-item ' + active_class + '"><a class="page-link" href="' + href + '" ' + change_page + '>' + text_display + '</a></li>' );
    }

    return pager_p3k;

});
