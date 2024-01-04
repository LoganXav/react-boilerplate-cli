import { createTheme, responsiveFontSizes, alpha } from "@mui/material/styles";
import { DateFormatEnum } from "constants/DateContants";

export const defaultTheme = customizeTheme();

export const lightTheme = responsiveFontSizes(
  customizeTheme({
    palette: {
      primary: {
        lightAlt: "#EFF6FC",
        lighter: alpha("#0078D4", 0.2),
        main: "#0078D4",
        darker: "#004578",
        // darkAlt: "#106EBE",
      },
      primaryGradient: {
        main: "#1E00D4",
        contrastText: "#FFFFFF",
      },
      success: {
        ...defaultTheme.palette.success,
        lighter: alpha(defaultTheme.palette.success.main, 0.2),
      },
      warning: {
        ...defaultTheme.palette.warning,
        lighter: alpha(defaultTheme.palette.warning.main, 0.2),
      },
      error: {
        ...defaultTheme.palette.error,
        lighter: alpha(defaultTheme.palette.error.main, 0.2),
      },
      info: {
        ...defaultTheme.palette.info,
        lighter: alpha(defaultTheme.palette.info.main, 0.2),
      },
      background: {
        ...defaultTheme.palette.background,
        default: "#FAF9F8",
      },
    },
  })
);
export const darkTheme = responsiveFontSizes(
  customizeTheme({ palette: { mode: "dark" } })
);

/**
 *
 * @param {import("@mui/material").Theme} theme
 */
export function customizeTheme(theme) {
  return createTheme({
    ...theme,
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
      },
    },
    typography: {
      fontFamily: [
        "Segoe UI",
        "-apple-system",
        "BlinkMacSystemFont",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Fira Sans",
        "Droid Sans",
        "Helvetica Neue",
        "sans-serif",
      ].join(),
      fontSize: 12,
      color: "#000051",
      body1: {
        fontWeight: 600,
      },
      body2: {
        fontWeight: 600,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
      caption: {
        fontWeight: 600,
      },
      overline: {
        fontWeight: 600,
      },
    },
    components: {
      MuiIcon: {
        defaultProps: {
          baseClassName: "material-symbols-outlined",
        },
      },
      MuiDatePicker: {
        defaultProps: {
          inputFormat: DateFormatEnum.FORMAT,
        },
      },
      MuiDesktopDatePicker: {
        defaultProps: {
          inputFormat: DateFormatEnum.FORMAT,
        },
      },
      MuiMobileDatePicker: {
        defaultProps: {
          inputFormat: DateFormatEnum.FORMAT,
        },
      },
      MuiTabs: {
        defaultProps: {
          variant: "scrollable",
          scrollButtons: "auto",
          allowScrollButtonsMobile: true,
        },
      },
      MuiLoadingButton: {
        defaultProps: {
          variant: "contained",
        },
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true,
          variant: "contained",
          color: "primaryGradient",
          rounded: "default",
        },
        variants: [
          {
            props: { variant: "contained", color: "primaryGradient" },
            style: () => ({
              background: "linear-gradient(180deg, #2B88D8 0%, #1E00D4 100%)",
              ":disabled": {
                opacity: ".5",
                color: "white",
              },
            }),
          },
          {
            props: { rounded: "default" },
            style: () => ({ borderRadius: 16 }),
          },
          {
            props: { rounded: "square" },
            style: () => ({ borderRadius: 0 }),
          },
          {
            props: { rounded: "circular" },
            style: () => ({ borderRadius: 24 }),
          },
          {
            props: { size: "large" },
            style: () => ({ padding: "14px 22px" }),
          },
          {
            props: { size: "medium" },
            style: () => ({ padding: "10px 16px" }),
          },
        ],
        styleOverrides: {
          root: ({ theme, ownerState }) => {
            return {
              ...(!isNaN(Number(ownerState.rounded))
                ? { borderRadius: Number(ownerState.rounded) }
                : {}),
              ...(ownerState.variant === "soft"
                ? {
                    color:
                      theme.palette[ownerState.color]?.main ||
                      theme.palette.grey[500],
                    backgroundColor: alpha(
                      theme.palette[ownerState.color]?.main ||
                        theme.palette.grey[500],
                      0.2
                    ),
                    "&:hover": {
                      backgroundColor: alpha(
                        theme.palette[ownerState.color]?.main ||
                          theme.palette.grey[500],
                        0.3
                      ),
                    },
                  }
                : {}),
            };
          },
        },
      },
      MuiChip: {
        defaultProps: { variant: "soft" },
        styleOverrides: {
          root: ({ theme, ownerState }) => {
            if (ownerState.variant !== "soft") return {};
            return {
              color:
                theme.palette[ownerState.color]?.main ||
                theme.palette.grey[500],
              backgroundColor: alpha(
                theme.palette[ownerState.color]?.main ||
                  theme.palette.grey[500],
                0.2
              ),
            };
          },
        },
      },
      MuiIconButton: {
        defaultProps: {},
        styleOverrides: {
          root: ({ theme, ownerState }) => {
            return {
              ...(!isNaN(Number(ownerState.rounded))
                ? { borderRadius: Number(ownerState.rounded) }
                : {
                    borderRadius: { square: 0, default: 8 }[ownerState.rounded],
                  }),
              ...(ownerState.variant === "contained"
                ? {
                    color:
                      theme.palette[ownerState.color]?.contrastText ||
                      theme.palette.text.primary,
                    backgroundColor:
                      theme.palette[ownerState.color]?.main ||
                      theme.palette.grey[500],
                    "&:hover": {
                      backgroundColor:
                        theme.palette[ownerState.color]?.dark ||
                        theme.palette.grey[700],
                    },
                  }
                : {}),
              ...(ownerState.variant === "soft"
                ? {
                    color:
                      theme.palette[ownerState.color]?.main ||
                      theme.palette.grey[500],
                    backgroundColor: alpha(
                      theme.palette[ownerState.color]?.main ||
                        theme.palette.grey[500],
                      0.2
                    ),
                    "&:hover": {
                      backgroundColor: alpha(
                        theme.palette[ownerState.color]?.main ||
                          theme.palette.grey[500],
                        0.3
                      ),
                    },
                  }
                : {}),
              ...(ownerState.variant === "outlined"
                ? {
                    border: `1px solid ${
                      theme.palette[ownerState.color]?.main ||
                      theme.palette.divider
                    }`,
                  }
                : {}),
            };
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          classes: { asterisk: "text-error-main" },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: () => ({
            "&.MuiInputBase-formControl": {},
          }),
        },
      },
      MuiFilledInput: {
        defaultProps: { disableUnderline: true },
      },
      MuiOutlinedInput: {
        // defaultProps: { notched: false },
      },
      MuiTextField: {
        defaultProps: { variant: "filled" },
        styleOverrides: {
          root: ({ theme, ownerState }) => {
            return {
              "& .MuiFilledInput-input": {
                borderRadius: 16,
              },
              "& .MuiFormLabel-root": {
                color: theme.palette.text.primary,
              },

              "&:focus-within": {
                "& .MuiFormLabel-root": {
                  color: theme.palette.text.primary,
                },
              },

              ...(ownerState.variant === "outlined"
                ? {
                    // "& .MuiInputLabel-shrink": {
                    //   transform: "translate(14px, 4px) scale(0.75)",
                    // },

                    "& .MuiInputBase-root": {
                      backgroundColor: "rgba(0, 0, 0, 0.06)",
                      borderRadius: 8,

                      "& > fieldset": {
                        border: "none",
                      },

                      "& + .MuiFormHelperText-root": {
                        // marginLeft: 0,
                      },
                    },
                  }
                : {}),

              ...(ownerState.variant === "filled"
                ? {
                    "& .MuiInputBase-root": {
                      "& .MuiInputBase-input": {
                        borderRadius: 16,
                      },
                      borderRadius: 16,

                      // "& .MuiInputBase-input": {
                      //   ...(!ownerState.label
                      //     ? { paddingTop: 12.5, paddingBottom: 12.5 }
                      //     : {}),
                      // },

                      "& + .MuiFormHelperText-root": {
                        // marginLeft: 0,
                      },
                    },
                  }
                : {}),
            };
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
          borderRadius: "circular",
        },
        variants: [
          {
            props: { borderRadius: "default" },
            style: () => ({}),
          },
          {
            props: { borderRadius: "square" },
            style: () => ({ borderRadius: 0 }),
          },
          {
            props: { borderRadius: "circular" },
            style: () => ({ borderRadius: 24 }),
          },
        ],
      },
      MuiDialog: {
        defaultProps: {
          maxWidth: "sm",
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: ({ theme }) => ({
            ...theme.typography.h5,
            fontWeight: "bold",
          }),
        },
      },
    },
  });
}
