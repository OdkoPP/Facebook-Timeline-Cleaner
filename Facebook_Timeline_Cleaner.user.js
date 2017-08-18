// ==UserScript==
// @name        Facebook Timeline Cleaner
// @namespace   FB_OdkoPP
// @description Removes Recommended, Suggestions, ... Posts
// @include     https://www.facebook.com/
// @version     1
// @grant       none
// @noframes
// ==/UserScript==

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};

let feed_selector = 'div[role="feed"]';
let spam_selector = 'a._3e_2._m8c, div._5g-l, .uiStreamSponsoredLink';
let post_selector = 'div[data-testid="fbfeed_story"]';

let timer;
let last_scroll = 0;

document.addEventListener('scroll',function () {
    if(Date.now() - last_scroll < 200) {
        return 0;
    }
    last_scroll = Date.now();

    clearTimeout(timer);
    timer = setTimeout( function () {
        let sponsored_posts = document.querySelector(feed_selector).querySelectorAll(spam_selector);
        for (let i = 0; i < sponsored_posts.length; i++) {
            sponsored_posts[i].closest(post_selector).remove();
        }
    }, 500);
});