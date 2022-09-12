// ==UserScript==
// @name         Claim-Coins
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://claimfreecoins.io/*/**
// @match        https://tronfaucet.net/
// @require      file:///Users/abpadmanabhan/seelf/jok/jquery-3.5.1.slim.min.js
// @grant        none
// ==/UserScript==

(function ($, undefined) {
    const fSubmission = () => {
        $("body").append(
            $("<style/>", {
                text: `
                [class*=-ads], [id*=ads] { visibility: hidden !important; }
    
                #adcopy-response-cell input {
                    font-size: 16px !important;
                    color: #000 !important;
                }
                
                input[type=submit] { height: 180px; }
    
                .modal-content { background-color: #eee !important; }
                `,
            })
        );

        const $address = $("input[name=address]");
        const $submit = $("input[type=submit][value=Login], button:contains(Login)");
        if ($address.val() && $submit.length) {
            $submit[0].click();
        }

        const $continue = $("button:contains('Continue'), button:contains('Login')");
        if ($continue.length) {
            $continue[0].click();
            // Solvemedia
            const params = new URLSearchParams(window.location.search);
            if (params.get("captcha") != "solvemedia") {
                const urlParams = new URLSearchParams(window.location.search);
                urlParams.set("captcha", "solvemedia");
                window.location.search = urlParams;
            }
            const $links = $(".antibotlinks, #captchaModal .ml-4, #captchaModal .mr-4");
            const $toAttach = $links.first().parent();
            const $wrapper = $("<div/>");
            $wrapper.css("display", "flex").css("justify-content", "center");
            $links.prop("style", "margin: 5px 3px !important", 1).detach().appendTo($wrapper);
            $wrapper.prependTo($toAttach);
            $("#captcha-adspace").hide();
            $("#antibotlinks_reset").show();
            setTimeout(() => $("#adcopy-response-cell input").focus(), 500);
        }
    };

    const fRefresh = () => {
        let shouldRefresh = $("#faucet:contains('sent to your')").length > 0;
        shouldRefresh =
            shouldRefresh ||
            $('#claim_again:contains("00:01")').length > 0 ||
            $('#claim_again:contains("Refresh")').length > 0;
        shouldRefresh ? window.location.reload() : setTimeout(fRefresh, 500);
    };

    $(function () {
        "use strict";
        $(document).ready(fSubmission);
        $(document).ready(fRefresh);
        setInterval(() => {
            window.location.href.indexOf("cointraffic.io") != -1 && window.close();
        }, 100);
    });
})(window.jQuery.noConflict());
