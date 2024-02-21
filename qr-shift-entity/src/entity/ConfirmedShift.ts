import z from "zod";

const ConfirmedShiftParser = z.object({
  userID: z.string(),
  startTime: z.date(),
  endTime: z.date(),
});

export type ConfirmedShift = z.infer<typeof ConfirmedShiftParser>;

export const parseAsConfirmedShift = (data: any): ConfirmedShift | Error => {
  const validationResponse = ConfirmedShiftParser.safeParse(data);
  return validationResponse.success
    ? validationResponse.data
    : validationResponse.error;
};
