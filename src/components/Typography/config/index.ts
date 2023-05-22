import type { TypographyPresets } from "../types";

const typographyPresets: TypographyPresets = [
  {
    key: "heading",
    props: {
      variant: "h1",
      color: "text-black",
      size: "text-[1.625rem]", // 26px
      textAlign: "text-left",
      className: "font-bold", // 700
      lineHeight: "leading-[1.555rem]", // 24.88px
    },
  },
  {
    key: "heading2",
    props: {
      variant: "h2",
      color: "text-black",
      size: "text-xl", // 20px
      textAlign: "text-left",
      className: "font-semibold", // 600
      lineHeight: "leading-[1.196rem]", //19.14px
    },
  },
  {
    key: "heading3",
    props: {
      variant: "h3",
      color: "text-black",
      size: "text-lg", // 18px
      textAlign: "text-left",
      className: "font-medium", // 500
      lineHeight: "leading-[1.077rem]", //17.23px
    },
  },
  {
    key: "subheading",
    props: {
      variant: "h4",
      color: "text-black",
      size: "text-base", // 16px
      textAlign: "text-left",
      className: "font-bold", // 700
      lineHeight: "leading-[0.957rem]", //15.31px
    },
  },
  {
    key: "subheading2",
    props: {
      variant: "h5",
      color: "text-black",
      size: "text-sm", // 14px
      textAlign: "text-left",
      className: "font-medium", // 500
      lineHeight: "leading-[0.9rem]", //14.40px
    },
  },
  {
    key: "paragraph",
    props: {
      variant: "h6",
      color: "text-black",
      size: "text-sm", // 14px
      textAlign: "text-left",
      className: "font-normal", // 400
      lineHeight: "leading-[0.968rem]", //15.48px
    },
  },
  {
    key: "regular",
    props: {
      variant: "p",
      color: "text-black",
      size: "text-base", // 16px
      textAlign: "text-left",
      className: "font-normal", // 400
      lineHeight: "leading-[0.957rem]", //15.31px
    },
  },
];

export { typographyPresets };
