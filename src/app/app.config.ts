let protocol = location.protocol + "//" + location.host;

export var APP_CONFIG = {
    ADMIN_ICON: getConfigs()["ADMIN_ICON"],
    DATA_ENTRY_ICON: getConfigs()["DATA_ENTRY_ICON"]
};

export var APP_URLS = {
    BASE_URL: getConfigs()["BASE_URL"],
    INSERT_SUBJECT_DETAILS: "/insertclassdetails",
    GET_SESSION_CLASS_SUBJECTS: "/subjectdetails"
};

export function getConfigs() {
    if (protocol == "http://localhost:4200") {
        return {
            BASE_URL: protocol,
            ADMIN_ICON: "../assets/admin.png",
            DATA_ENTRY_ICON: "../assets/data-entry.png"
        };
    } else {
        return {
            BASE_URL: protocol + "/progressreport",
            ADMIN_ICON: "../assets/admin.png",
            DATA_ENTRY_ICON: "../assets/data-entry.png"
        };
    }
}
