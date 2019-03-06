let protocol = location.protocol + "//" + location.host;

export var APP_CONFIG = {
    ADMIN_ICON: getConfigs()["ADMIN_ICON"],
    DATA_ENTRY_ICON: getConfigs()["DATA_ENTRY_ICON"],
    REPORT_GENERATE_ICON: getConfigs()["REPORT_GEN_ICON"]
};

export var URL_CONFIG = {
    BASE_URL: getConfigs()["BASE_URL"],
    INSERT_SUBJECT_DETAILS: "/insertclassdetails",
    GET_SESSION_CLASS_SUBJECTS: "/getsubjectdetails",
    GET_STUDENT_DETAILS: "/getstudentdetails",
    INSERT_STUDENT_MARKS: "/insertmarks",
    GET_STUDENT_MARKS: "/getmarks",
    GENERATE_REPORT: "/generatereport"
};

export function getConfigs() {
    if (protocol == "http://localhost:4200") {
        return {
            BASE_URL: "http://192.168.0.3:8080",
            ADMIN_ICON: "../assets/admin.png",
            DATA_ENTRY_ICON: "../assets/data-entry.png",
            REPORT_GEN_ICON: "../assets/generate-report.png"
        };
    } else {
        return {
            BASE_URL: protocol + "/progressreport",
            ADMIN_ICON: "../assets/admin.png",
            DATA_ENTRY_ICON: "../assets/data-entry.png",
            REPORT_GEN_ICON: "../assets/generate-report.png"
        };
    }
}