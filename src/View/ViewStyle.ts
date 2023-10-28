export class ViewStyle
{
    private static readonly CAN_BE_ORANGE = true;
    public static GetGradeColor(grade: number): string
    {
        let color: string = "Green";
        if (grade < 10){
            if (this.CAN_BE_ORANGE && grade >= 8) color = "Orange";
            else color = "Red";
        }

        return color;
    }
}