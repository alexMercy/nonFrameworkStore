import {getConvertedRoutes} from "../app/app.ts";

export const useParams = () => {
    const convRoutes = getConvertedRoutes();
    const path = window.location.pathname;
    let params = {}

     convRoutes.forEach(route => {
        const re =
            `^${(route.path)
                .replace(/(\/?)\*/g, "($1.*)?")
                .replace(/\/$/, "")
                .replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/$3]+)$2$3")
                .replace(/\.\(/g, "\\.(")}/*$`
        params = path.match(new RegExp(re))?.groups || {}
    })

    return params

}