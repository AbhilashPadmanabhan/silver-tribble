// ==UserScript==
// @name         Claim-Coins
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://faucetcrypto.com/ptc/**
// @match        https://faucetcrypto.com/task/**
// @grant        none
// ==/UserScript==

(function ($, undefined) {
    const focFun = () => {
        if (
            window.location.pathname.startsWith("/task/ptc-advertisement") ||
            window.location.pathname.startsWith("/ptc/view")
        ) {
            document.hasFocus = () => true;
            return;
        }
        setTimeout(focFun, 1000);
    };

    const rewFun = () => {
        if (window.location.pathname.startsWith("/task/ptc-advertisement")) {
            if ($("button:contains(Get Reward)").length) {
                $("button:contains(Get Reward)").first()[0].click();
                return;
            }
        } else if (window.location.pathname.startsWith("/ptc/view")) {
            if ($("a:contains(Continue)").length) {
                $("a:contains(Continue)").first()[0].click();
                return;
            }
        }
        setTimeout(rewFun, 1000);
    };

    $(document).ready(() => {
        if ($("a[href*=ptc-advertisement]").length) {
            $("a[href*=ptc-advertisement]").first()[0].click();
        }
        focFun();
        rewFun();
    });
})(window.jQuery.noConflict());
