import { responsiveFontSize } from "../helpers/font-size";

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
};

export const RADIUS = {
  SM: 4,
  MD: 8,
  LG: 16,
  XL: 24,
  FULL: 999,
};

export const LINE_WIDTH = {
  SM: 1,
  MD: 2,
  LG: 3,
};

export const TEXT = {
  XS: responsiveFontSize(12),
  SM: responsiveFontSize(14),
  MD: responsiveFontSize(16),
  LG: responsiveFontSize(18),
  XL: responsiveFontSize(20),
};
type WEIGHT_TYPE = {
  XS: "400";
  SM: "500";
  MD: "600";
  LG: "700";
  XL: "800";
};
export const WEIGHT: WEIGHT_TYPE = {
  XS: "400",
  SM: "500",
  MD: "600",
  LG: "700",
  XL: "800",
};

export const VARIANT = {
  DISPLAY: {
    fontSize: TEXT.XL,
    weight: WEIGHT.XL,
  },
  TITLE: {
    fontSize: TEXT.LG,
    weight: WEIGHT.LG,
  },
  SUBTITLE: {
    fontSize: TEXT.MD,
    weight: WEIGHT.MD,
  },
  BODY: {
    fontSize: TEXT.MD,
    weight: WEIGHT.SM,
  },
  LABEL: {
    fontSize: TEXT.SM,
    weight: WEIGHT.SM,
  },
};
