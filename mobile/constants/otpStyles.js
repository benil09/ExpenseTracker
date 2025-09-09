import { COLORS } from "./colors";
export const OTP_STYLES = {
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    width: 50,
    height: 60,
    margin:4,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    color: COLORS.text,
    backgroundColor: COLORS.card,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
};