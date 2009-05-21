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
       headings = [];
       tabs = [];
       $(this.TAB_HEADINGS + '.' + this.TAB_CLASS).each(function (i) {
         headings[i] = this;
         var div = document.createElement("div");
         div.innerHTML = this.innerHTML;
         div.setAttribute('origId', this.id);
         div.setAttribute('origClass', this.className);
         tabs.push(div);
       });
       $(this.TAB_HEADINGS + '.' + this.TAB_CLASS).css("display","none");
      },
      
      combine_elements:function() {
       if(headings.length == 0)return;
       var h2 = document.createElement("h2");
       h2.setAttribute('class', headings[0].className + ' ' + "tabholder");
       headings[0].parentNode.insertBefore(h2,headings[0]);
       for(var i=0; i<headings.length; i++) {
         h2.appendChild(tabs[i]);
         headings[i].setAttribute('origId', headings[i].id);
         headings[i].id = null;
       };
     },
     
     restore_elements:function() {
       $(this.TAB_HEADINGS + '.' + this.TAB_CLASS).css("display","block");
       $("h2.tabholder").remove();
     },
     
     turn_tabs_on:function() {
       this.find_elements();
       this.combine_elements();
     },
     
     turn_tabs_off:function() {
       this.restore_elements();
     }

   }

});