// Types for the weather alert data

export interface BaseWeatherAlert {
    severity: string;
    alert: string;
    region: string;
    start_date: string;
    end_date: string;
}

export interface MetOfficeAlert extends BaseWeatherAlert {
    counties: string;
}

