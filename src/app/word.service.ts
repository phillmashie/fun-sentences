import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Sentence {
  id: number;
  sentence: string;
}

interface WordType {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class WordService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getWordTypes(): Observable<WordType[]> {
    const url = `${this.baseUrl}/sentences/word-types`;
    return this.http.get<WordType[]>(url);
  }

  getWordsByType(wordType: string): Observable<string[]> {
    const url = `${this.baseUrl}/sentences/words?type=${wordType}`;
    return this.http.get<string[]>(url);
  }

  submitSentence(sentence: string): Observable<any> {
    const url = `${this.baseUrl}/sentences/sentences`;
    return this.http.post(url, { sentence });
  }
  getSentences(): Observable<string[]> {
    const url = `${this.baseUrl}/sentences/sentences`;
    return this.http
      .get<Sentence[]>(url)
      .pipe(
        map((sentences: Sentence[]) =>
          sentences.map((sentence) => sentence.sentence)
        )
      );
  }
}
