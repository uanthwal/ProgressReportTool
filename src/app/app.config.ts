let protocol = location.protocol + "//" + location.host;

export var APP_CONFIG = {
    ADMIN_ICON: getConfigs()["ADMIN_ICON"],
    DATA_ENTRY_ICON: getConfigs()["DATA_ENTRY_ICON"],
    REPORT_GENERATE_ICON: getConfigs()["REPORT_GEN_ICON"],
    ADD_STUDENT_ICON: getConfigs()["ADD_STUDENT_ICON"]
};

export var URL_CONFIG = {
    BASE_URL: getConfigs()["BASE_URL"],
    INSERT_SUBJECT_DETAILS: "/insertclassdetails",
    GET_SESSION_CLASS_SUBJECTS: "/getsubjectdetails",
    GET_STUDENT_DETAILS: "/getstudentdetails",
    INSERT_STUDENT_MARKS: "/insertmarks",
    GET_STUDENT_MARKS: "/getmarks",
    GENERATE_REPORT: "/generatereport",
    ADD_STUDENT_INFO: "/insertstudentdetails"
};

export function getConfigs() {
    if (protocol == "http://localhost:4200") {
        return {
            BASE_URL: "http://localhost:8080",
            ADMIN_ICON: "../assets/admin.png",
            DATA_ENTRY_ICON: "../assets/data-entry.png",
            REPORT_GEN_ICON: "../assets/generate-report.png",
            ADD_STUDENT_ICON: "../assets/add-student.png"
        };
    } else {
        return {
            BASE_URL: protocol,
            ADMIN_ICON: "../assets/admin.png",
            DATA_ENTRY_ICON: "../assets/data-entry.png",
            REPORT_GEN_ICON: "../assets/generate-report.png",
            ADD_STUDENT_ICON: "../assets/add-student.png",
        };
    }
}
