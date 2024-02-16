import z from "zod";

const ShiftParser = z.object({
  userID: z.string(),
  startTime: z.date(),
  endTime: z.date(),
});

export type Shift = z.infer<typeof ShiftParser>;

export const parseAsShift = (data: any): Shift | Error => {
  const validationResponse = ShiftParser.safeParse(data);
  return validationResponse.success
    ? validationResponse.data
    : validationResponse.error;
};
