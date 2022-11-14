// So, for anyone who is searching on Google for why BoM's feed 403s and how to fix it, here's the answer.
// BoM basically got a massive budget cut sometime between 2010 and 2020, and they decided to cut the budget for their website and their feed.
// They eventually banned web scraping, and now they 403 you if you try to access their feed.
// So, to fix this, you have to use ``https://reg.bom.gov.au/`` instead of ``https://www.bom.gov.au/``.
// I'm not sure if this is a permanent fix, but it works for now.
// Kudos to everyone on the forum link below for figuring this out.
// https://forums.whirlpool.net.au/archive/3jww2w69
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// I'll leave my attempts in comments below if this ever breaks again.
const Parser = require('rss-parser');
const parser = new Parser({
// headers: {
//     "User-Agent": "UniversalFeedParser/3.3 +http://feedparser.org/", // I know this isn't ethical or whatever, but it's literally the only way to get the feed to work.,
//     "Host": "www.bom.gov.au",
//     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//     "Connection": "keep-alive",
//     "Cache-Control": "no-cache",
//     "Content-Type": "application/xml",
//     "Accept-Encoding": "gzip, deflate",
//     "Accept-Language": "en-GB,en;q=0.9,es-ES;q=0.8,es;q=0.7,en-US;q=0.6",
//     "DNT": "1",
//     "Upgrade-Insecure-Requests": "1" 
// },
// defaultRSS: 1.0,
});
module.exports.getAlerts = function getAlerts(state) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if the state is valid.
        if (!state)
            throw new Error("No state provided. Please provide a state and try again.");
        if (typeof state !== "string")
            throw new Error("Invalid state provided. Please provide a valid state and try again.");
        state = state.toLowerCase();
        if (state !== "vic" && state !== "nsw" && state !== "qld" && state !== "wa" && state !== "sa" && state !== "tas" && state !== "nt" && state !== "act")
            throw new Error("Invalid state provided. Please provide a valid state and try again.");
        // Because the BoM has a weird way of doing things, we need to prefix the state with an id, then .warnings_, then the state again.
        // List of states and their ids:
        // NSW & ACT: 00054
        // VIC: 00059
        // QLD: 00056
        // WA: 00060
        // SA: 00057
        // TAS: 00058
        // NT: 00055
        let id = "";
        if (state === "nsw" || state === "act")
            id = "00054";
        if (state === "vic")
            id = "00059";
        if (state === "qld")
            id = "00056";
        if (state === "wa")
            id = "00060";
        if (state === "sa")
            id = "00057";
        if (state === "tas")
            id = "00058";
        if (state === "nt")
            id = "00055";
        // Also if the state is ACT, we need to change the state to NSW.
        if (state === "act")
            state = "nsw";
        const feed = yield parser.parseURL(`https://reg.bom.gov.au/fwo/IDZ${id}.warnings_${state}.xml`);
        const alerts = [];
        feed.items.forEach(item => {
            // Gotta admit, BoM's feed is worse than MetService's. It's missing a lot of data. But this time I can't do much about it.
            // Also its 2022 and you're a government agency and you don't support HTTPS? What the hell is wrong with you?
            // As the title is inconsistent, the severity will be set to "Unknown" and will be in the alert.
            let severity = "Unknown";
            // Grab the alert by everything from the after the "ST" (in the timezone) to the "for".
            let alert = item.title.substring(item.title.indexOf("ST") + 3, item.title.indexOf("for"));
            // As Australia has like 5 timezones, we need to also check for "DT" (Daylight Time)
            // I'm meant to be moving to Australia in 2026, come on aussie gov.
            if (item.title.includes("DT")) {
                alert = item.title.substring(item.title.indexOf("DT") + 3, item.title.indexOf("for"));
            }
            // Snip snip.
            alert = alert.trim();
            // Grab the regions by grabbing everything after the "for" to the end of the title.
            let regions = item.title.substring(item.title.indexOf("for") + 4);
            // Snip snip.
            regions = regions.trim();
            const alertObj = {
                severity: severity,
                alert: alert,
                region: regions,
                start_date: item.pubDate,
                end_date: item.pubDate,
                link: item.link,
                description: item.description,
                issueDate: new Date(item.pubDate),
            };
            alerts.push(alertObj);
        });
        return alerts;
    });
};
