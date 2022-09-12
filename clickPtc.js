// ==UserScript==
// @name         Claim-Coins
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://faucetpay.io/ptc/
// @grant        none
// ==/UserScript==

(function ($, undefined) {
    $.expr[':'].icontains = $.expr.createPseudo(function(text) {
        return function(e) {
            return $(e).text().toUpperCase().indexOf(text.toUpperCase()) >= 0;
        };
    });

    if ($("button:icontains('visit ad for')").length) {
        $("button:icontains('visit ad for')").first().click();
    }
})(window.jQuery.noConflict());
