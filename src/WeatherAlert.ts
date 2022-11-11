// Types for the weather alert data

export interface BaseWeatherAlert {
    severity: string;
    alert: string;
    region: string;
    start_date: string;
    end_date: string;
    link: string;
}

export interface MetOfficeAlert extends BaseWeatherAlert {
    counties: string;
}

export interface NWSAlert extends BaseWeatherAlert {
    description: string;
    issueDate: Date;
    urgency: string;
    certainty: string;
    status: string;
    msgType: string;
    author: string;
}

export interface MetServiceAlert extends BaseWeatherAlert {
    headline: string;
    description: string;
    instruction: string;
    color: string;
    area: string;
    responseType: string;
    certainty: string;
    urgency: string;
    issueDate: Date;
}

export interface MetEireannAlert extends BaseWeatherAlert {
    description: string;
    certainty: string;
    level: string;
    regions: Array<string>;
    issued: string;
    updated: string;
    headline: string;
    capId: string;
    id: string;
}

export interface MeteoAlarmAlert extends BaseWeatherAlert { // Covers all EU member states.
    description: string;
    raw: string;
    published: string;
}

export interface BoMAlert extends BaseWeatherAlert {
    pubDate: Date;
}