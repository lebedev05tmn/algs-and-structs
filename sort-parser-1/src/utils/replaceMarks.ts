const regex = /[^а-яА-ЯёЁ]/g;

export const replaceMarks = (value: string) => {
    return value.replace(regex, "");
};
