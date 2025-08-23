export type FragmentsStore = {
    preparedSlide?: number;
    fragments: { node?: HTMLDivElement; timeout: number | undefined | null }[];
};
