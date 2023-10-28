export class DOMManipulator
{
    public static AddResultInCell(cell: HTMLTableCellElement, result: HTMLTableCellElement): void
    {
        cell.outerHTML = result.outerHTML;
        cell.innerHTML = result.innerHTML;
    }
}