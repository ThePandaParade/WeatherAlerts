const Parser = require('rss-parser');
const parser = new Parser();

var request = require('request');

import { MetEireannAlert } from "./WeatherAlert";

/* module.exports.getAlerts = async function getAlerts() {
    const feed = await parser.parseURL("https://met.ie/warningsxml/rss.xml")
    const alerts = [];

    feed.items.forEach(item => {
        // I can't be arsed to grab the full data from the URL as that requires something similar to the MetService code.
        // So I'll do it later.

        // Grab the region by grabbing everything after "for" in the title
        let region = item.title.substring(item.title.indexOf("for") + 4);
        // Remove any trailing whitespace
        region = region.trim();

        const alertObj: MetEireannAlert = {
            severity: "Unknown",
            alert: item.title,
            description: item.description,
            region: region,
            start_date: "Unknown",
            end_date: "Unknown",
            link: item.link,
            author: item.author,
            category: item.category
        }
    });
    return alerts;
} */

// Yeah so uhh.. Turns out MetEireann is the only one that has a JSON feed aswell as an RSS feed.
// So I'm going to use that instead.
module.exports.getAlerts = async function getAlerts() {
    // Use request to get the JSON feed
    request('https://www.met.ie/Open_Data/json/warning_IRELAND.json', { json: true }, async (err, res, body) => {
        if (err) { throw err }
        const alerts = [];
        body.forEach(item => {
            // To be honest, we barely need to do anything here.
            // The JSON feed is already in the format we need.

            // Prefix the severity with the Irish's public wording system.. thing
            let severity = item.severity;
            if (severity == "Moderate") {
                severity = "Status Yellow (Moderate)";
            }
            else if (severity == "Severe") {
                severity = "Status Orange (Severe)";
            }
            else if (severity == "Extreme") {
                severity = "Status Red (Extreme)";
            }
            console.log(item)

            const alertObj: MetEireannAlert = {
                severity: severity,
                certainty: item.certainty,
                level: item.level,
                alert: item.type,
                description: item.description,
                regions: item.regions,
                issued: item.issued,
                updated: item.updated,
                start_date: item.onset,
                end_date: item.expiry,
                headline: item.headline,
                region: item.regions, // Alias for regions
                link: "Unknown",
                capId: item.capId,
                id: item.id
            }
            
            alerts.push(alertObj);
        });
    //console.log(alerts);
    return alerts;
});}