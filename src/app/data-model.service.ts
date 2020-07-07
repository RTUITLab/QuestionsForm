import { Injectable, ChangeDetectorRef } from "@angular/core";
import { FileTransferService } from "./file-transfer.service";
import { Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { ModalManagerService } from "./modal-manager.service";

const protoStatus = {
  loading: false,
  fileLoaded: false,
  lastOpeningMode: "",
  filePath: "",
};

const protoData = {
  raw: "",
  parsed: {},
};

const protoImages = {
  images: [],
};

const protoOpenedTest = {
  isOpened: false,
  category: '',
  type: '',
  id: 0
}

const protoTestItem = {
  text: 'Новый вопрос',
  img: '',
  weight: 1,
  answers: []
}

const protoAnswer = {
  is_correct: false,
  text: '',
  img: ''
}

@Injectable({
  providedIn: "root",
})
export class DataModelService {
  public status: BehaviorSubject<any> = new BehaviorSubject<any>(protoStatus);
  public data: BehaviorSubject<any> = new BehaviorSubject<any>(protoData);
  public images: BehaviorSubject<any> = new BehaviorSubject<any>(protoImages);
  public tempFolder: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public openedTest: BehaviorSubject<any> = new BehaviorSubject<any>(protoOpenedTest);

  constructor(
    private ft: FileTransferService,
    private router: Router,
    private mm: ModalManagerService
  ) {}

  updateDataRaw(newData = null) {
    if(!newData) {
      newData = this.data.getValue().raw;
    }
    this.data.next({raw: newData, parsed: JSON.parse(newData)});
    this.updateDataInTemp();
  }
  updateDataParsed(newData = null) {
    if(!newData) {
      newData = this.data.getValue().parsed;
    }
    this.data.next({raw: JSON.stringify(newData, null, 2), parsed: newData});
    this.updateDataInTemp();
  }

  updateDataInTemp() {
    return this.ft.UpdateJSONInTemp(this.data.getValue().raw);
  }

  loadSingleJSON() {
    const newStatus = Object.create(protoStatus);
    newStatus.loading = true;
    this.status.next(newStatus);

    this.ft.getTempAddr().then((tempFolder) => {
      this.tempFolder.next(tempFolder);
      this.ft.eraseTemp().then(() => {
        this.ft.openDialog("single").then((path) => {
          if (path === undefined) {
            this.status.next(Object.create(protoStatus));
            return;
          }
          this.ft.copyJSONToTemp(path).then((path) => {
            this.ft.getJSONFile(path).then((data) => {
              this.images.next({ images: [] });
              this.router.navigate(["main"]);
              this.updateDataRaw(data);
              const newStatus = Object.create(protoStatus);
              newStatus.fileLoaded = true;
              newStatus.filePath = path;
              newStatus.loading = false;
              newStatus.lastOpeningMode = "single";
              this.status.next(newStatus);
            });
          });
        });
      });
    });
  }

  loadZip() {
    const newStatus = Object.create(protoStatus);
    newStatus.loading = true;
    this.status.next(newStatus);

    this.ft.getTempAddr().then((tempFolder) => {
      this.tempFolder.next(tempFolder);
      this.ft.eraseTemp().then(() => {
        this.ft.openDialog("zip").then((path) => {
          if (path === undefined) {
            this.status.next(Object.create(protoStatus));
            return;
          }
          this.ft.copyZipFileToTemp(path).then(() => {
            this.ft.getJSONFile("\\index.json").then((data) => {
              this.ft.getImageList().then((items) => {
                this.images.next({ images: items });
                this.router.navigate(["main"]);
                this.updateDataRaw(data);
                const newStatus = Object.create(protoStatus);
                newStatus.fileLoaded = true;
                newStatus.filePath = path;
                newStatus.loading = false;
                newStatus.lastOpeningMode = "single";
                this.status.next(newStatus);
              });
            });
          });
        });
      });
    });
  }

  addImage() {
    const newStatus = Object.create(this.status.getValue());
    newStatus.loading = true;
    this.status.next(newStatus);

    this.ft.openDialog("image").then((path) => {
      if (path === undefined) {
        const newStatus = Object.create(this.status.getValue());
        newStatus.loading = false;
        this.status.next(newStatus);
        return;
      }
      this.ft.copySingleFileToTempSafely(path).then((path) => {
        this.ft.getImageList().then((items) => {
          this.images.next({ images: items });
          const newStatus = Object.create(this.status.getValue());
          newStatus.loading = false;
          this.status.next(newStatus);
        });
      });
    });
  }

  updateImageList() {
    this.ft.getImageList().then((items) => {
      this.images.next({ images: items });
    });
  }

  removeImage(path) {
    this.ft.removeFileFromTemp(path).then(() => {
      this.updateImageList();
    });
  }

  removeAllImages() {
    this.ft.removeImagesFromTemp().then(() => {
      this.updateImageList();
    });
  }

  getTestCategory(category) {
    if(category == 'schoolboy'){
        return this.data.getValue().parsed.tests.schoolboy;
    } else {
        return this.data.getValue().parsed.tests.student;
    }
  }

  getTestType(category, type) {
    if(type == 'A') {
      return this.getTestCategory(category).A;
    } else {
      return this.getTestCategory(category).B;
    }
  }

  getTestItem(id, category, type) {
    return this.getTestType(category, type)[id];
  }

  getAnotherCategory(category) {
    return category == 'schoolboy' ? 'student' : 'schoolboy';
  }

  getAnotherType(type) {
    return type == 'A' ? 'B' : 'A';
  }

  getLastTestId(category, type) {
    return this.getTestType(category, type).length - 1;
  }

  addTestItem(category, type) {
    this.getTestType(category, type).push(JSON.parse(JSON.stringify(protoTestItem)));
    this.updateDataParsed();
  }

  removeTestItem(id, category, type, isOpened = false) {
    let callback: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    callback.subscribe((result) => {
      if (result == 1) {
        this.getTestType(category, type).splice(id, 1);
        if(isOpened) {
          this.closeTest();
        }
        this.updateDataParsed();
      }
    });

    this.mm.pushModal({
      prompt: true,
      type: "red",
      title: "Удаление вопроса",
      text: "Данное действие необратимо. Вы точно хотите удалить вопрос?",
      done: callback,
      buttons: [
        { id: 0, text: "Нет" },
        { id: 1, text: "Да" },
      ],
    });
  }

  removeTestItemsOfCategory(category) {
    let callback: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    callback.subscribe((result) => {
      if (result == 1) {
        this.getTestCategory(category).A = [];
        this.getTestCategory(category).B = [];
        if(this.openedTest.getValue().category == category) {
          this.closeTest();
        }
        this.updateDataParsed();
      }
    });

    this.mm.pushModal({
      prompt: true,
      type: "red",
      title: "Очистка категории",
      text: "Данное действие необратимо. Вы точно хотите удалить все вопросы категории?",
      done: callback,
      buttons: [
        { id: 0, text: "Нет" },
        { id: 1, text: "Да" },
      ],
    });
  }

  toggleTestItemType(id, category, type, isOpened = false) {
    this.getTestType(category, this.getAnotherType(type)).push(this.getTestType(category, type)[id]);
    this.getTestType(category, type).splice(id, 1);
    if(isOpened) {
      this.openTest(category, this.getAnotherType(type), this.getLastTestId(category, this.getAnotherType(type)));
    }
    this.updateDataParsed();
  }

  close() {
    let callback: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    callback.subscribe((result) => {
      if (result == 1) {
        this.ft.eraseTemp().then(() => {
          this.router.navigate([""]);
          this.status.next(protoStatus);
          this.data.next(protoData);
        });
      }
    });

    this.mm.pushModal({
      prompt: true,
      type: "red",
      title: "Закрытие файла",
      text: "Изменения не были сохранены. Вы точно хотите закрыть файл?",
      done: callback,
      buttons: [
        { id: 0, text: "Нет" },
        { id: 1, text: "Да" },
      ],
    });
  }

  openTest(category, type, id) {
    this.openedTest.next({
      isOpened: true,
      category,
      type,
      id
    });
  }

  closeTest() {
    this.openedTest.next(Object.create(protoOpenedTest));
  }

  addAnswer(category, type, testId) {
    this.getTestType(category, type)[testId].answers.push(JSON.parse(JSON.stringify(protoAnswer)));
    this.updateDataParsed();
  }

  removeAnswer(category, type, testId, answerId) {
    this.getTestType(category, type)[testId].answers.splice(answerId, 1);
    this.updateDataParsed();
  }

  removeAllAnswers(category, type, testId) {
    this.getTestType(category, type)[testId].answers = [];
    this.updateDataParsed();
  }

  exportZip() {
    const newStatus = Object.create(this.status.getValue());
    newStatus.loading = true;
    this.status.next(newStatus);

    this.ft.saveDialog("zip").then((path) => {
      if (path === undefined) {
        const newStatus = Object.create(this.status.getValue());
        newStatus.loading = false;
        this.status.next(newStatus);
        return;
      }
      this.ft.ExportTempToZip(path).then(() => {
        const newStatus = Object.create(this.status.getValue());
        newStatus.loading = false;
        this.status.next(newStatus);
      });
    });

  }

}
