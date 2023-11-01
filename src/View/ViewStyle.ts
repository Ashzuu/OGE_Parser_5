/** Classe donnant les styles de la vue */
export class ViewStyle
{
    //Si les notes peuvent etre oranges (entre 8 inclu et 10 exclu)
    private static readonly CAN_BE_ORANGE = true;
    /**
     * Retourne la couleur de la note
     * @param grade Note
     * @returns Couleur de la note
     */
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