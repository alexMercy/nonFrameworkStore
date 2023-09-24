export const useParams = () => {
    window.location.pathname
        .split('/')
        .forEach(route => console.log(route));
    return 1;

}