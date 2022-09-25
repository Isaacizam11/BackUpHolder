import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DocumentList } from './models/Document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  BaseUrl: string = 'https://localhost:44318/api/Access/';

  constructor(private http: HttpClient) {

  }

  UploadDocument(DocumentList: DocumentList) {
    return this.http.post<any>(this.BaseUrl + 'DocumentUpload', DocumentList);
  }
}