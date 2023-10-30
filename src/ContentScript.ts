import { SemestreFactory } from "./Model/LogicLayer/Factories/SemestreFactory";
import { PageParser } from "./Model/LogicLayer/Parsing/PageParser";
import { SemesterNames } from "./Model/LogicLayer/Parsing/SemesterNames";
import { Semestre } from "./Model/Types/Grades/Elements/Semestre";
import { MainPageView } from "./View/MainPageView";
import { Storage } from "./Data/Storage/Storage";
import { StoredSemester } from "./Model/Types/Storage/StoredSemester";

let semester: Semestre = SemestreFactory.Instance.GetSemester();
// chrome.storage.local.clear();

Storage.Save(semester);

Storage.Load().then((savedSemesters) => {
    console.log(savedSemesters);
    let currentSemestre: StoredSemester = savedSemesters[SemesterNames.CurrentSemestre];
    let correspondingSemestre: StoredSemester = savedSemesters[SemesterNames.CorrespondingSemester];
    for (let i = 0; i < currentSemestre.Averages.length; i++){
        console.log((currentSemestre.Averages[i] + correspondingSemestre.Averages[i]) / 2);
    }
});

// if (!PageParser.Instance.AreGradesShown)
// {
//     MainPageView.Instance.AddGradeResultsToPage(semester);
// }