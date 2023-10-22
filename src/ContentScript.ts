import { SemestreFactory } from "./LogicLayer/Factories/SemestreFactory";
import { GradeParser } from "./LogicLayer/Parsing/GradeParser";
import { Semestre } from "./Model/Types/Grades/Elements/Semestre";

let semester: Semestre = SemestreFactory.Instance.GetSemester();
console.log(semester);

let avg = [
    semester.UEList[0].Average.toFixed(2),
    semester.UEList[1].Average.toFixed(2),
    semester.UEList[2].Average.toFixed(2),
    semester.UEList[3].Average.toFixed(2),
    semester.UEList[4].Average.toFixed(2),
    semester.UEList[5].Average.toFixed(2)
];
avg.forEach(c => console.log(c));

// console.log((avg[0] == '14.22') ? true : avg[0]);
// console.log((avg[1] == '15.49') ? true : avg[1]);
// console.log((avg[2] == '13.27') ? true : avg[2]);
// console.log((avg[3] == '13.54') ? true : avg[3]);
// console.log((avg[4] == '13.74') ? true : avg[4]);
// console.log((avg[5] == '13.28') ? true : avg[5]);