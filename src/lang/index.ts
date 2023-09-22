export const t = (input: string) => {
    const lang = localStorage.getItem('lang')!;

    // @ts-ignore
    return  lang === 'en' || !translateData[input]?.length ? input : translateData[input][0]
}

export const translateData = {
    "Toggle theme": [
        "Переключить тему"
    ],
}