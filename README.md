# @p3kb/paginate

[![npm (scoped)](https://img.shields.io/npm/v/@p3kb/paginate.svg)](https://github.com/p3kb/paginate/blob/master/README.md) [![GitHub license](https://img.shields.io/github/license/p3kb/paginate.svg)](https://github.com/p3kb/paginate/blob/master/LICENSE) [![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@p3kb/paginate.svg)](https://github.com/p3kb/paginate/blob/master/src/paginate.min.js)

Lightweight pagination for jquery

## Install

```
npm i @p3kb/paginate
```

## Usage

```js
window.pager = require('@p3kb/paginate');

//Basic
pager.paginate();

//Default options
pager.paginate(
    {
        pagination_element: '.pagination',
        previous: 'Previous',
        next: 'Next',
        num_pages: 10,
        current_page: 1,
        show_page_links: 5,
        call_as_url: true,
        to_call: window.location.href + '?page='
    }
);

//URL to change page
pager.paginate(
    {
        call_as_url: true,
        to_call: window.location.href + '?page='
    }
);
    
//Call a function to change page
function change_page(page) {
    //
}

pager.paginate(
    {
        call_as_url: false,
        to_call: 'change_page'
    }
);
```
