export default () => {
    //console.log('*****userAgent; ',navigator.userAgent);

    let name = "Unknown OS";
    if (navigator.userAgent.includes("win") != -1)  {
        name = "Windows";
    }
    else if (navigator.userAgent.includes("Mac") != -1) {
        name = "Mac";
    }
    else if (navigator.userAgent.includes("Linux") != -1) {
        name = "Linux";
    }
    else if (navigator.userAgent.includes("Android") != -1) {
        name = "Android OS";
    }
    else if (navigator.userAgent.includes("like Mac") != -1)  {
        name = "iOS";
    }
    else {
        name;
    }

    return name
}