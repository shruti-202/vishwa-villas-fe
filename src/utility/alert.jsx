import { enqueueSnackbar } from "notistack";

export const successAlert = (message) => {
  enqueueSnackbar(message, {
    variant: "success",
    anchorOrigin:{ vertical: "top", horizontal: "right" },
  });
};
export const errorAlert = (message) => {
  enqueueSnackbar(message, {
    variant: "error",
    anchorOrigin: { vertical: "top", horizontal: "right" },
  });
};
export const warningAlert = (message) => {
  enqueueSnackbar(message, {
    variant: "warning",
    anchorOrigin: { vertical: "top", horizontal: "right" },
  });
};
export const infoAlert = (message) => {
  enqueueSnackbar(message, {
    variant: "info",
    anchorOrigin: { vertical: "top", horizontal: "right" },
  });
};
export const defaultAlert = (message) => {
  enqueueSnackbar(message, {
    variant: "default",
    anchorOrigin: { vertical: "top", horizontal: "right" },
  });
};
