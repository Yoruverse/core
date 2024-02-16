type CountryCode = "JP" | "CN" | "KR" | "ES" | "US" | "UK" | "FR" | "DE" | "IT" | "RU" | "BR" | "MX" | "CA" | "AU" | "NZ" | "NL" | "BE" | "SE" | "NO" | "DK" | "FI" | "IS" | "IE" | "PT" | "CH" | "AT" | "CZ" | "HU" | "PL" | "SK" | "SI" | "HR" | "RS" | "BA" | "BG" | "RO" | "GR" | "TR" | "IL" | "EG" | "SA" | "AE" | "IN" | "ID" | "MY" | "PH" | "SG" | "TH" | "VN" | "LK" | "PK" | "BD" | "NP" | "MM" | "KH" | "LA" | "MN" | "TW" | "HK" | "MO" | "PH" | "SG" | "TH" | "VN" | "LK" | "PK" | "BD" | "NP" | "MM" | "KH" | "LA" | "MN" | "TW" | "HK" | "MO" | "PH" | "SG" | "TH" | "VN" | "LK" | "PK" | "BD" | "NP" | "MM" | "KH" | "LA" | "MN" | "TW" | "HK" | "MO" | "PH" | "SG" | "TH" | "VN" | "LK" | "PK" | "BD" | "NP" | "MM" | "KH" | "LA" | "MN" | "TW" | "HK" | "MO" | "PH" | "SG" | "TH" | "VN" | "LK" | "PK" | "BD" | "NP" | "MM" | "KH" | "LA" | "MN" | "TW" | "HK" | "MO" | "PH" | "SG" | "TH" | "VN" | "LK" | "PK" | "BD" | "NP" | "MM" | "KH";

export type GetCountriesOptions = CountryCode;

export interface CountryOfOrigin {
    code: CountryCode;
    es_name?: string;
    en_name?: string;
    jp_name?: string;
}