export class Document {
    DocumentId: number;
    DocumentName: string;
    DocumentContent: string;
    ContentType: string;
    UserId?: number;
  }

  export class DocumentList {
    constructor(
      public DocumentList: Document[],
    ) { }
  }