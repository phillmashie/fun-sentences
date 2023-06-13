import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WordService } from '../word.service';

interface WordType {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  wordTypes: WordType[] = [];
  selectedWords: { [key: string]: string } = {};
  sentence: string = '';

  constructor(private wordService: WordService) {}

  ngOnInit() {
    this.fetchWordTypes();
  }

  fetchWordTypes() {
    this.wordService.getWordTypes().subscribe((wordTypes: WordType[]) => {
      this.wordTypes = wordTypes;
    });
  }

  getWordsByType(wordType: string): Observable<string[]> {
    return this.wordService.getWordsByType(wordType);
  }

  getPreviewSentence(): string {
    const sentenceParts = Object.keys(this.selectedWords)
      .filter((wordType) => this.selectedWords[wordType])
      .map((wordType) => this.selectedWords[wordType]);
    return sentenceParts.join(' ');
  }

  selectWord(wordType: string) {
    this.getWordsByType(wordType).subscribe((wordsByType: string[]) => {
      const randomIndex = Math.floor(Math.random() * wordsByType.length);
      const selectedWord = wordsByType[randomIndex];
      this.selectedWords[wordType] = selectedWord;
    });
  }

  addWordToSentence() {
    const previewSentence = this.getPreviewSentence();
    if (previewSentence) {
      this.sentence = previewSentence;
    }
  }

  submitSentence() {
    // Implement the method to submit the sentence to the backend
    console.log(this.sentence);
    // Reset the selectedWords and sentence
    this.selectedWords = {};
    this.sentence = '';
  }
}
