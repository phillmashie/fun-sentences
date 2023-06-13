import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getWordTypes(): Observable<WordType[]> {
    const url = `${this.baseUrl}/word-types`;
    return this.http.get<WordType[]>(url);
  }

  getWordsByType(wordType: string): Observable<string[]> {
    const url = `${this.baseUrl}/words?type=${wordType}`;
    return this.http.get<string[]>(url);
  }

  submitSentence(sentence: string): Observable<any> {
    const url = `${this.baseUrl}/sentences`;
    return this.http.post(url, { sentence });
  }
}

interface WordType {
  id: number;
  name: string;
}
