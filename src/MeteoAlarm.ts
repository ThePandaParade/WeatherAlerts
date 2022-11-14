// Handles all EU member states.
// Doesn't mean my sanity is intact.

const Parser = require('rss-parser');
const parser = new Parser({
    customFields: {
        item: [
            ['description', 'description', {includeSnippet: true}]
        ]
    },
    headers: {
        "content-type": "application/rss+xml; charset=utf-8",
        "cache-control": "max-age=0, private, must-revalidate",
        "Accept": "*/*"
    }
});

import { MeteoAlarmAlert } from "./WeatherAlert";

// List of known alert images.
const alertImages = {
    "Red Rain_Flood": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t13.png",
    "Red Flash_Flood": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t12.png",
    "Red Flood": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t11.png",
    "Red Rain": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t10.png",
    "Red Avalanche": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t9.png",
    "Red Forest_Fire": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t8.png",
    "Red Coastal_Event": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t7.png",
    "Red Low_Trempreature": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t6.png",
    "Red Excessive_Heat": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t5.png",
    "Red Fog": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t4.png",
    "Red Thunderstorm": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t3.png",
    "Red Snow/Ice": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t2.png",
    "Red Wind": "https://feeds.meteoalarm.org/images/rss/wflag-l4-t1.png",
    "Amber Rain_Flood": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t13.png",
    "Amber Flash_Flood": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t12.png",
    "Amber Flood": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t11.png",
    "Amber Rain": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t10.png",
    "Amber Avalanche": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t9.png",
    "Amber Forest_Fire": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t8.png",
    "Amber Coastal_Event": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t7.png",
    "Amber Low_Trempreature": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t6.png",
    "Amber Excessive_Heat": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t5.png",
    "Amber Fog": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t4.png",
    "Amber Thunderstorm": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t3.png",
    "Amber Snow/Ice": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t2.png",
    "Amber Wind": "https://feeds.meteoalarm.org/images/rss/wflag-l3-t1.png",
    "Yellow Rain_Flood": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t13.png",
    "Yellow Flash_Flood": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t12.png",
    "Yellow Flood": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t11.png",
    "Yellow Rain": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t10.png",
    "Yellow Avalanche": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t9.png",
    "Yellow Forest_Fire": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t8.png",
    "Yellow Coastal_Event": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t7.png",
    "Yellow Low_Trempreature": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t6.png",
    "Yellow Excessive_Heat": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t5.png",
    "Yellow Fog": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t4.png",
    "Yellow Thunderstorm": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t3.png",
    "Yellow Snow/Ice": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t2.png",
    "Yellow Wind": "https://feeds.meteoalarm.org/images/rss/wflag-l2-t1.png",
}

module.exports.getAlerts = async function getAlerts(country) {
    const feed = await parser.parseURL(`https://feeds.meteoalarm.org/feeds/meteoalarm-legacy-rss-europe`);
    const alerts = [];
    feed.items.forEach(item => {
        // Check the country by checking if the country is in the title
        if (item.title.includes(country)) {
            // We need to "loop" through all alerts for this country.
            // Do this by counting the number of <img> tags in the description.
            const description = item.description;
            const imgTags = description.match(/<img/g);
            if (imgTags) {
                for (let i = 0; i < imgTags.length; i++) {
                    // Now, whoever wrote this feed and decided to use RAW HTML in the description, I hate you. So fucking much.

                    // Grab the alert by searching for images in the description, then comparing the image to a list of known images.
                    // As there are multiple alerts, try and find the image that is correct for this loop.
                    // Do this by seeing how many alerts we've found so far, then find the next image that matches that number.
                    // Bare in mind, img tags will have a src attribute after a border attribute, so we need to split on that.
                    const img = description.split('border="1" src="')[i + 1].split('"')[0];
                    
                    // Then set the alert by comparing the image to the list of known images.
                    // The link will be the value of the image, and the key will be the alert.
                    let alert = Object.keys(alertImages).find(key => alertImages[key] === img);

                    // Replace the _ with a space
                    alert = alert.replace(/_/g, " ");

                    // For start and end dates, we need to use the contentSnippet attribute. We can tell which one to use as each date is on a new line.
                    // We can just check how many alerts we've gone through already (add 1 for the "Today" line), and use that to determine which date to use.
                    // We can then seperate by splitting "From: " and "Until: " and then grabbing the date.
                    // First, we need to check if the line isn't a date, just check if it has a "from" or "until" in it.
                    let startDate = undefined
                    let endDate = undefined
                    try {
                        if (item.contentSnippet.split("\n")[i + 1].includes("From: ") || item.contentSnippet.split("\n")[i + 1].includes("Until: ")) {
                            startDate = item.contentSnippet.split("\n")[alerts.length + 1].split("From: ")[1].split("Until: ")[0];
                            endDate = item.contentSnippet.split("\n")[alerts.length + 1].split("Until: ")[1];
                        }
                        else {
                            // If it isn't a date, then add 3 to the index and skip the "Tomorrow" line.
                            startDate = item.contentSnippet.split("\n")[alerts.length + 3].split("From: ")[1].split("Until: ")[0];
                            endDate = item.contentSnippet.split("\n")[alerts.length + 3].split("Until: ")[1];
                        }
 
                        // And then snippy snip both.
                        startDate = startDate.trim();
                        endDate = endDate.trim();
                    } catch (error) {
                        // If we get an error, then it's probably because there is no date, so just set it to undefined.
                        startDate = undefined;
                        endDate = undefined;
                    }


                    // Add the alert to the array
                    // Cuz this is a legacy feed, we don't have the "level" of the alert, so we just set it to 0
                    // Grab the severity from everything before the first space in the alert
                    const alertObject : MeteoAlarmAlert = {
                        region: item.title,
                        alert: alert,
                        start_date: startDate,
                        end_date: endDate,
                        description: `${alert} alert for ${item.title} from ${startDate} until ${endDate}`, // As MeteoAlarm doesn't provide a description, we just make one up
                        severity: alert.substring(0, alert.indexOf(" ")),
                        link: item.link,
                        published: item.pubDate,
                        raw: item.description
                    }

                    // Last check, if the alert has expired, then don't add it.
                    if (new Date(endDate) > new Date()) {
                        alerts.push(alertObject);
                    }
                }}
        }
    });
    return alerts;
}
