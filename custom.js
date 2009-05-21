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
     
     lastSection: -1,
     checkHash:function() {
       var section = $.Tabs.get_selected();
       if(section != this.lastSection) {
         $.Tabs.show_section(section);
         this.lastSection = section;
       }
     },
     find_elements:function() {
       headings = [];
       tabs = [];
       sections = [];
       $(this.TAB_HEADINGS + '.' + this.TAB_CLASS).each(function (i) {
         headings[i] = this;
         var div = document.createElement("div");
         div.innerHTML = this.innerHTML;
         div.setAttribute('origId', this.id);
         div.setAttribute('origClass', this.className);
         div.setAttribute('class', "section_" + this.id);
         tabs.push(div);
       });
       $(this.TAB_HEADINGS + '.' + this.TAB_CLASS).css("display","none");
       $("div." + this.SECTION_CLASS).each(function(i){
         sections[i] = this;
       });
      },
      
     combine_elements:function() {
       if(headings.length == 0)return;
       var h2 = document.createElement("h2");
       h2.setAttribute('class', headings[0].className + ' ' + "tabholder");
       headings[0].parentNode.insertBefore(h2,headings[0]);
       for(var i=0; i<headings.length; i++) {
         h2.appendChild(tabs[i]);
         headings[i].setAttribute('origId', headings[i].id);
       };
     },
     
     hide_all:function() {
       $("div." + this.SECTION_CLASS).css("display","none");
       for(var i=0; i<tabs.length; i++) {
         tabs[i].setAttribute('class', this.TAB_NOT_SELECTED_CLASS);
       };
     },
     
     show_section:function(index) {
       $.Tabs.hide_all();
       var section = sections[index];
       if(!section) var section = sections[index=0];
       $("#" + section.id).css("display","block");
       tabs[index].className = this.TAB_SELECTED_CLASS;

       this.lastSection = index;
     },
     
     tab_click:function(e) {
       var target = e && e.target || e.srcElement;
       for(var i=0; i<tabs.length; i++) {
         if(target == tabs[i] || target.parentNode == tabs[i]){
           $.Tabs.show_section(i);
         }
       }  
     },
     
     set_handlers:function() {
       for(var i=0; i<tabs.length; i++) {
         tabs[i].onclick = this.tab_click;
       };
     },
     
     get_selected:function(){
       var selected = 0;
       if(location.hash) {
         selected = location.hash.substring(1);
       } else if(location.search) {
         var args = location.search.substring(1).split('&');
         for(var i=0; i<args.length; i++) {
           var name = args[i].split('=')[0];
           var value = args[i].split('=')[1];
           if(name == QUERY_SECTION_ARG){
               selected = value;
               break;
           }
         }
       }
       if(isNaN(selected)){
         for(var i=0; i<sections.length; i++){
           if(sections[i].getAttribute('id') == selected || headings[i].getAttribute('origId') == selected){
             selected = i;
             break;
           }
         }
       }
       return selected;
    },
  
     restore_elements:function() {
       clearInterval(interval);
       $("div." + this.SECTION_CLASS).css("display","block");
       $(this.TAB_HEADINGS + '.' + this.TAB_CLASS).css("display","block");
       $("h2.tabholder").remove();
     },
     
     turn_tabs_on:function() {
       this.find_elements();
       this.combine_elements();
       var selected = this.get_selected();
       this.show_section(selected);       
       this.set_handlers();
       interval = setInterval(this.checkHash, 100);
     },
     
     turn_tabs_off:function() {
       this.restore_elements();
     },
     
     reset_tabs:function() {
       this.turn_tabs_off();
       this.turn_tabs_on();
     }
      
   }

});