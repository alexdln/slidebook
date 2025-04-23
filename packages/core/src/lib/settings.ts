export const SLIDE_WIDTH =
    !process.env.NEXT_PUBLIC_SLIDE_WIDTH || Number.isNaN(+process.env.NEXT_PUBLIC_SLIDE_WIDTH)
        ? 1200
        : Number(process.env.NEXT_PUBLIC_SLIDE_WIDTH);

export const SLIDE_HEIGHT =
    !process.env.NEXT_PUBLIC_SLIDE_HEIGHT || Number.isNaN(+process.env.NEXT_PUBLIC_SLIDE_HEIGHT)
        ? 680
        : Number(process.env.NEXT_PUBLIC_SLIDE_HEIGHT);
