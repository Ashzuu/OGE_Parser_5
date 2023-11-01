/**
 * Manipule les éléments du DOM
 */
export class DOMManipulator
{
    /**
     * Ajoute le contenu d'une cellule à une autre
     * @param cell cellule à modifier
     * @param result cellule contenant le résultat
     */
    public static AddResultInCell(cell: HTMLTableCellElement, result: HTMLTableCellElement): void
    {
        cell.outerHTML = result.outerHTML;
        cell.innerHTML = result.innerHTML;
    }
}