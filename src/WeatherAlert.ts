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