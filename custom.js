/*!
 * Tabs Custom Library
 * Rewrite of tabs.js found here,
 * http://github.com/seven1m/onebody/blob/6193cdf62657af8bf48390f608df5455eb0ef643/public/javascripts/tabs.js
 * from Tim Morgan, for use with jQuery.
 *
 * Copyright (c) 2009 Justin Richter
 *
 * MIT License
 *
 * Date: 2009-05-19
 */

$.extend({
   Tabs: {
     TAB_HEADINGS: 'h2',
     TAB_CLASS: 'tab',
     SECTION_CLASS: 'section',
     QUERY_SECTION_ARG: 'section',
     TAB_SELECTED_CLASS: 'selected',
     TAB_NOT_SELECTED_CLASS: 'not-selected',
     LOADING_ELM_ID: 'loading',

      find_elements:function() {
       $(this.TAB_HEADINGS + '.' + this.TAB_CLASS).css({"font-style":"italic"});
     }

   }

});